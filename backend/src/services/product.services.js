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
  getProductsWithProfit,
  insertProduct,
  insertProductEmployees,
  insertProductIngredients,
  insertProductOtherExpenses,
} from "../models/product.model.js";
import { uploadImage } from "../utils/uploadImage.js";

const computeCPP = (cost, totalSellableUnits) => {
  const safeDivide = (value) =>
    totalSellableUnits > 0 ? value / totalSellableUnits : 0;

  const totalCPB =
    cost.materialCPB + cost.employeeCPB + cost.otherExpenseCPB;

  return {
    materialCPP: safeDivide(cost.materialCPB),
    employeeCPP: safeDivide(cost.employeeCPB),
    otherExpenseCPP: safeDivide(cost.otherExpenseCPB),
    totalCPB,
    totalCPP: safeDivide(totalCPB),
  };
};

const computePricing = (totalCPP, profitMargin, discount, salesTax) => {
  const sellingPrice = totalCPP / (1 - profitMargin / 100);
  const discountCost = sellingPrice * (discount / 100);
  const discountedPrice = sellingPrice - discountCost;
  const tax = discountedPrice * (salesTax / 100);
  const finalPrice = discountedPrice + tax;

  return { sellingPrice, discountCost, discountedPrice, tax, finalPrice };
};

const computeProfitability = (
  totalCPB,
  totalCPP,
  discountedPrice,
  totalSellableUnits
) => {
  const profit = discountedPrice - totalCPP;
  const netProfit = profit * totalSellableUnits;
  const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;
  const breakEvenUnits =
    profit > 0 ? Math.ceil(totalCPB / profit) : null;
  const breakEvenRevenue = breakEvenUnits
    ? breakEvenUnits * discountedPrice
    : null;

  return { profit, netProfit, netProfitPerUnit: profit, roi, breakEvenUnits, breakEvenRevenue };
};

export const productCompute = (product, cost) => {
  const totalSellableUnits = Number(product?.total_sellable_units || 0);
  const profitMargin = Number(product?.profit_margin || 0);
  const discount = Number(product?.discount || 0);
  const salesTax = Number(product?.sales_tax || 0);

  const cpp = computeCPP(cost, totalSellableUnits);
  const pricing = computePricing(cpp.totalCPP, profitMargin, discount, salesTax);
  const profitability = computeProfitability(
    cpp.totalCPB,
    cpp.totalCPP,
    pricing.discountedPrice,
    totalSellableUnits
  );

  return {
    ...product,
    ...cost,
    ...cpp,
    ...pricing,
    ...profitability,
  };
};

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
  const [
    products,
    mostExpensiveProduct,
    lowestProfitableProduct,
    mostProfitableProduct,
    highestROIProduct,
  ] = await Promise.all([
    getProduct(userId),
    getMostExpensiveProduct(userId),
    getLowestProfitableProduct(userId),
    getMostProfitableProduct(userId),
    getHighestROIProduct(userId),
  ]);

  return {
    products,
    mostExpensiveProduct,
    lowestProfitableProduct,
    mostProfitableProduct,
    highestROIProduct,
  };
};

export const fetchAllComputedProductsService = async ({ userId }) => {
  const products = await getProductsWithProfit(userId);
  return products;
};

export const fetchProductCPBService = async ({ id, userId }) => {
  const [materialCPB, employeeCPB, otherExpenseCPB] = await Promise.all([
    getMaterialsCostPerBatch(id, userId),
    getLaborCostPerBatch(id, userId),
    getOtherExpenseCostPerBatch(id, userId),
  ]);
  return { materialCPB, employeeCPB, otherExpenseCPB };
};

export const fetchProductService = async ({ id, userId }) => {
  const { products } = await fetchProductsService({ userId });
  const product = products.find((p) => p.product_id === id);
  const cost = await fetchProductCPBService({ id, userId });
  const computedProduct = productCompute(product, cost);
  return { computedProduct };
};