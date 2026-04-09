import pool from "../config/db.js";
import { productCompute } from "../services/product.services.js";

export const insertProduct = async (
  client,
  {
    product_name,
    batch_per_day,
    product_image,
    total_input,
    units_per_product,
    total_sellable_units,
    profit_margin,
    discount,
    sales_tax,
    created_by,
  },
) => {
  const query = `INSERT INTO products 
                (product_name, batch_per_day, product_image, total_input, units_per_product, total_sellable_units, profit_margin, discount, sales_tax, created_by)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

  const values = [
    product_name,
    batch_per_day,
    product_image,
    total_input,
    units_per_product,
    total_sellable_units,
    profit_margin,
    discount,
    sales_tax,
    created_by,
  ];
  const { rows } = await client.query(query, values);
  return rows[0];
};

export const insertProductIngredients = async (
  client,
  productId,
  directMaterials,
) => {
  for (const material of directMaterials) {
    const query = `INSERT INTO product_ingredients 
                    (product_id, material_id, units_needed)
                    VALUES($1, $2, $3)`;

    const values = [productId, material.raw_material_id, material.units_needed];
    await client.query(query, values);
  }
};

export const insertProductEmployees = async (client, productId, employees) => {
  for (const employee of employees) {
    const query = `INSERT INTO product_employees 
                        (product_id, employee_id, prep_time_hrs)
                        VALUES($1, $2, $3)`;

    const values = [productId, employee.employee_id, employee.prep_time];

    await client.query(query, values);
  }
};

export const insertProductOtherExpenses = async (
  client,
  productId,
  otherExpenses,
) => {
  for (const expense of otherExpenses) {
    const query = `INSERT INTO product_other_expenses 
                        (product_id, other_expense_id, quantity)
                        VALUES($1, $2, $3)`;

    const values = [productId, expense.other_expense_id, expense.quantity];

    await client.query(query, values);
  }
};

export const getProduct = async (createdBy) => {
  const query = `SELECT * FROM products WHERE created_by = $1 AND is_active = true ORDER BY created_at DESC`;

  const { rows } = await pool.query(query, [createdBy]);
  return rows;
};

export const getMaterialsCostPerBatch = async (id, createdBy) => {
  const query = `SELECT SUM(rm.cost_per_unit * pi.units_needed) AS total_material_cpp
                  FROM product_ingredients pi
                  JOIN raw_materials rm
                  ON rm.raw_material_id = pi.material_id
                  JOIN products p 
                  ON p.product_id =  pi.product_id
                  WHERE pi.product_id = $1
                  AND p.created_by = $2`;

  const result = await pool.query(query, [id, createdBy]);
  return parseFloat(result.rows[0]?.total_material_cpp) || 0;
};

export const getLaborCostPerBatch = async (id, createdBy) => {
  const query = `WITH employee_product_counts AS (
                  SELECT pe.employee_id, COUNT(*) AS product_count
                  FROM product_employees pe
                  JOIN products p ON p.product_id = pe.product_id
                  WHERE p.is_active = true
                  GROUP BY pe.employee_id
                )

                SELECT SUM(
                  CASE
                    WHEN pe.multi_product_handling = true THEN
                      e.rate_per_hr * pe.prep_time_hrs / NULLIF(epc.product_count, 0)
                    ELSE
                      e.rate_per_hr * pe.prep_time_hrs
                  END
                ) AS total_labor_cpp

                FROM product_employees pe
                JOIN employees e ON e.employee_id = pe.employee_id
                JOIN products p ON p.product_id = pe.product_id
                LEFT JOIN employee_product_counts epc 
                  ON epc.employee_id = e.employee_id
                WHERE pe.product_id = $1
                AND p.created_by = $2
                AND p.is_active = true`;

  const result = await pool.query(query, [id, createdBy]);
  return parseFloat(result.rows[0]?.total_labor_cpp) || 0;
};

export const getOtherExpenseCostPerBatch = async (id, createdBy) => {
  const query = `WITH expense_product_counts AS (
                  SELECT poe.other_expense_id, COUNT(*) AS product_count
                  FROM product_other_expenses poe
                  JOIN products p ON p.product_id = poe.product_id
                  WHERE p.is_active = true
                  GROUP BY poe.other_expense_id
                )

                SELECT SUM(
                  CASE 
                    WHEN oe.expense_type = 'per_unit'
                      THEN (oe.expense_cost * poe.quantity) 
                          / NULLIF(p.total_sellable_units, 0)

                    WHEN oe.expense_type = 'one_time'
                      THEN oe.expense_cost 
                          / COALESCE(epc.product_count, 1)
                          / NULLIF(p.batch_per_day * 365, 0)

                    WHEN oe.expense_type = 'one_month'
                      THEN oe.expense_cost 
                          / COALESCE(epc.product_count, 1)
                          / NULLIF(p.batch_per_day * 30, 0)

                    WHEN oe.expense_type = 'per_batch'
                      THEN oe.expense_cost * poe.quantity

                    ELSE 0
                  END
                ) AS total_other_expense_cpp

                FROM product_other_expenses poe
                JOIN other_expenses oe 
                  ON oe.other_expense_id = poe.other_expense_id
                JOIN products p 
                  ON p.product_id = poe.product_id
                LEFT JOIN expense_product_counts epc 
                  ON epc.other_expense_id = oe.other_expense_id

                WHERE poe.product_id = $1
                AND p.created_by = $2
                AND p.is_active = true
                AND oe.is_active = true`;

  const result = await pool.query(query, [id, createdBy]);
  return parseFloat(result.rows[0]?.total_other_expense_cpp) || 0;
};

export const getProductsWithProfit = async (createdBy) => {
  const query = `SELECT p.product_id, p.product_name, p.profit_margin, p.total_sellable_units, p.discount, p.sales_tax,
                  COALESCE(ing.ingredients_cost, 0) AS ingredients_cost,
                  COALESCE(emp.labor_cost, 0) AS labor_cost,
                  COALESCE(exp.expense_cost, 0) AS expense_cost
                  FROM products p
                  LEFT JOIN (SELECT pi.product_id, SUM(rm.cost_per_unit * pi.units_needed) AS ingredients_cost
                  FROM product_ingredients pi
                  JOIN raw_materials rm ON rm.raw_material_id = pi.material_id
                  GROUP BY pi.product_id) ing ON ing.product_id = p.product_id
                  LEFT JOIN (SELECT pe.product_id, SUM(e.rate_per_hr * pe.prep_time_hrs) AS labor_cost
                  FROM product_employees pe
                  JOIN employees e ON e.employee_id = pe.employee_id
                  GROUP BY pe.product_id) emp ON emp.product_id = p.product_id
                  LEFT JOIN (SELECT poe.product_id, SUM(oe.expense_cost * poe.quantity) AS expense_cost
                  FROM product_other_expenses poe
                  JOIN other_expenses oe ON oe.other_expense_id = poe.other_expense_id
                  GROUP BY poe.product_id) exp ON exp.product_id = p.product_id
                  WHERE p.created_by = $1 AND p.is_active = true`;
  const { rows } = await pool.query(query, [createdBy]);
  return rows.map((p) => ({
    ...p,
    ...productCompute(p, {
      materialCPB: Number(p.ingredients_cost),
      employeeCPB: Number(p.labor_cost),
      otherExpenseCPB: Number(p.expense_cost),
    }),
  }));
};

export const getPaginatedProducts = async (
  createdBy,
  searchTerm = "",
  limit = 8,
  offset = 0,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT 
                p.product_id,
                p.product_name,
                p.total_input,
                p.units_per_product,
                p.total_sellable_units,
                p.profit_margin,
                p.discount,
                p.sales_tax,
                p.batch_per_day,
                (
                  SELECT jsonb_agg(jsonb_build_object(
                    'material_name', rm.material_name,
                    'pack_unit', rm.pack_unit,
                    'base_unit', rm.base_unit,
                    'units_per_pack', rm.units_per_pack,
                    'price_per_pack', rm.price_per_pack,
                    'cost_per_unit', rm.cost_per_unit,
                    'units_needed', pi.units_needed
                  ))
                  FROM product_ingredients pi
                  JOIN raw_materials rm ON pi.material_id = rm.raw_material_id
                  WHERE pi.product_id = p.product_id
                ) AS ingredients,
                (
                  SELECT jsonb_agg(jsonb_build_object(
                    'first_name', e.first_name,
                    'last_name', e.last_name,
                    'rate_per_hr', e.rate_per_hr,
                    'prep_time_hrs', pe.prep_time_hrs
                  ))
                  FROM product_employees pe
                  JOIN employees e ON pe.employee_id = e.employee_id
                  WHERE pe.product_id = p.product_id
                ) AS employees,
                (
                  SELECT jsonb_agg(jsonb_build_object(
                    'category_name', oe.category_name,
                    'expense_cost', oe.expense_cost,
                    'quantity', poe.quantity
                  ))
                  FROM product_other_expenses poe
                  JOIN other_expenses oe ON poe.other_expense_id = oe.other_expense_id
                  WHERE poe.product_id = p.product_id
                ) AS other_expenses
              FROM products p
              WHERE p.created_by = $1 
                AND p.is_active = true
                AND p.product_name ILIKE $2`;

  let values = [createdBy, searchValue];

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

  values.push(limit, offset);

  const { rows } = await pool.query(query, values);

  return rows;
};

export const getProductsCount = async (createdBy, searchTerm = "") => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT COUNT(*) AS total
                FROM products
                WHERE created_by = $1
                AND is_active = true
                AND product_name ILIKE $2`;

  let values = [createdBy, searchValue];
  const { rows } = await pool.query(query, values);
  return Number(rows[0].total);
};

export const getProductsTotalCount = async (createdBy) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total FROM products WHERE created_by = $1 AND is_active = true`,
    [createdBy],
  );
  return Number(rows[0].total);
};

export const deleteProducts = async (id) => {
  const query = `UPDATE products SET is_active = false WHERE product_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}