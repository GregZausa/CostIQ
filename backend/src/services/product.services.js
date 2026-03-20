import pool from "../config/db.js";
import {
  getHighestROIProduct,
  getLaborCostPerBatch,
  getLowestProfitableProduct,
  getMaterialsCostPerBatch,
  getMostExpensiveProduct,
  getMostProfitableProduct,
  getOtherExpenseCostPerBatch,
  getProduct,
  insertProduct,
  insertProductEmployees,
  insertProductIngredients,
  insertProductOtherExpenses,
} from "../models/product.model.js";
import { uploadImage } from "../utils/uploadImage.js";

export const createProductService = async ({ file, userId, body }) => {
  const client = await pool.connect();
  try {
    const imageUrl = file ? await uploadImage(file) : null;

    const {
      product_name,
      total_input,
      units_per_product,
      total_sellable_units,
      profit_margin,
      discount,
      sales_tax,
    } = body;

    const direct_materials = JSON.parse(body.direct_materials);
    const employees = JSON.parse(body.employees);
    const other_expenses = JSON.parse(body.other_expenses);
    await client.query("BEGIN");

    const product = await insertProduct(client, {
      product_name,
      product_image: imageUrl,
      total_input,
      units_per_product,
      total_sellable_units,
      profit_margin,
      discount: discount || 0,
      sales_tax: sales_tax || 0,
      created_by: userId,
    });

    const productId = product.product_id;
    await insertProductIngredients(client, productId, direct_materials);
    await insertProductEmployees(client, productId, employees);
    await insertProductOtherExpenses(client, productId, other_expenses);
    await client.query("COMMIT");
    return product;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const fetchProductsService = async ({ userId }) => {
  const [products, mostExpensiveProduct, lowestProfitableProduct, mostProfitableProduct, highestROIProduct] = await Promise.all([
    getProduct(userId),
    getMostExpensiveProduct(userId),
    getLowestProfitableProduct(userId),
    getMostProfitableProduct(userId),
    getHighestROIProduct(userId),
  ]);
  return { products, mostExpensiveProduct, lowestProfitableProduct, mostProfitableProduct, highestROIProduct };
};

export const fetchProductCPBService = async ({ id, userId }) => {
  const [materialCPB, employeeCPB, otherExpenseCPB] = await Promise.all([
    getMaterialsCostPerBatch(id, userId),
    getLaborCostPerBatch(id, userId),
    getOtherExpenseCostPerBatch(id, userId),
  ]);
  return { materialCPB, employeeCPB, otherExpenseCPB };
};

export const productCompute = (product, cost) => {
  const { materialCPB, employeeCPB, otherExpenseCPB } = cost;

  const totalSellableUnits = Number(product?.total_sellable_units || 0);
  const profitMargin = Number(product?.profit_margin || 0);
  const discountPercent = Number(product?.discount || 0);
  const taxPercent = Number(product?.sales_tax || 0);
  const safeDivide = (value) =>
    totalSellableUnits > 0 ? value / totalSellableUnits : 0;

  const materialCPP = safeDivide(materialCPB);
  const employeeCPP = safeDivide(employeeCPB);
  const otherExpenseCPP = safeDivide(otherExpenseCPB);

  const totalCPB = materialCPB + employeeCPB + otherExpenseCPB;
  const totalCPP = materialCPP + employeeCPP + otherExpenseCPP;

  const sellingPrice = totalCPP / (1 - Number(profitMargin) / 100);
  const discountCost = sellingPrice * (discountPercent / 100);
  const discountedPrice = sellingPrice - discountCost;
  const tax = discountedPrice * (taxPercent / 100);
  const profit = discountedPrice - totalCPP;
  const finalPrice = discountedPrice + tax;

  const contributionMargin = profit;

  const breakEvenUnits =
    contributionMargin > 0 ? Math.ceil(totalCPB / contributionMargin) : null;

  const breakEvenRevenue = breakEvenUnits
    ? breakEvenUnits * discountedPrice
    : null;
  const netProfitPerUnit = profit;
  const netProfit = netProfitPerUnit * totalSellableUnits;

  const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;

  return {
    ...product,
    sellingPrice,
    finalPrice,
    profit,
    discountCost,
    tax,
    materialCPB,
    employeeCPB,
    otherExpenseCPB,
    totalCPB,
    materialCPP,
    employeeCPP,
    otherExpenseCPP,
    totalCPP,
    breakEvenUnits,
    breakEvenRevenue,
    netProfitPerUnit,
    netProfit,
    roi,
  };
};

export const fetchProductService = async ({ id, userId }) => {
  const { products } = await fetchProductsService({ userId });
  const product = products.find((p) => p.product_id === id);

  const cost = await fetchProductCPBService({ id, userId });
  const computedProduct = await productCompute(product, cost);

  return { computedProduct };
};
