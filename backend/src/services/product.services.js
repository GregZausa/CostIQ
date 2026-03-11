import pool from "../config/db.js";
import {
  getLaborCostPerProduct,
  getMaterialsCostPerProduct,
  getOtherExpenseCostPerProduct,
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

export const fetchProductService = async ({ id, userId }) => {
  //const products = await getProduct({ id, userId });

  const [materialsCPP, employeesCPP, otherExpenseCPP] = await Promise.all([
    getMaterialsCostPerProduct(id, userId),
    getLaborCostPerProduct(id, userId),
    getOtherExpenseCostPerProduct(id, userId),
  ]);

  const totalCPP = materialsCPP + employeesCPP + otherExpenseCPP;

  return { materialsCPP, employeesCPP, otherExpenseCPP, totalCPP };
};
