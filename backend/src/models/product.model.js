import pool from "../config/db.js";

export const insertProduct = async (
  client,
  {
    product_name,
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
                (product_name, product_image, total_input, units_per_product, total_sellable_units, profit_margin, discount, sales_tax, created_by)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

  const values = [
    product_name,
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
  const query = `SELECT p.product_id, p.product_name, p.product_image, p.total_input, p.units_per_product, p.total_sellable_units, p.profit_margin, p.discount, p.sales_tax, 
                  jsonb_agg(DISTINCT jsonb_build_object(
                  'material_name', rm.material_name,
                  'pack_unit', rm.pack_unit,
                  'base_unit', rm.base_unit,
                  'units_per_pack', rm.units_per_pack,
                  'price_per_pack', rm.price_per_pack,
                  'cost_per_units', rm.cost_per_unit,
                  'units_needed', pi.units_needed
                  )) AS ingredients,
                  jsonb_agg(DISTINCT jsonb_build_object(
                  'first_name', e.first_name,
                  'last_name', e.last_name,
                  'rate_per_hr', e.rate_per_hr,
                  'prep_time_hrs', pe.prep_time_hrs
                  )) AS employees,
                  jsonb_agg(DISTINCT jsonb_build_object(
                  'category_name', oe.category_name,
                  'expense_cost', oe.expense_cost,
                  'quantity', poe.quantity
                  )) AS other_expenses
                  FROM products as p 
                  JOIN product_ingredients AS pi ON p.product_id = pi.product_id
                  JOIN raw_materials AS rm ON pi.material_id = rm.raw_material_id
                  JOIN product_employees AS pe ON p.product_id = pe.product_id
                  JOIN employees AS e ON pe.employee_id = e.employee_id
                  JOIN product_other_expenses AS poe ON p.product_id = poe.product_id
                  JOIN other_expenses AS oe ON poe.other_expense_id = oe.other_expense_id
                  WHERE p.created_by = $1 AND p.is_active = true
                  GROUP BY p.product_id`;

  const { rows } = await pool.query(query, [createdBy]);
  return rows;
};

export const getMaterialsCostPerProduct = async (id, createdBy) => {
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

export const getLaborCostPerProduct = async (id, createdBy) => {
  const query = `SELECT SUM (e.rate_per_hr * pe.prep_time_hrs) AS total_labor_cpp
                  FROM product_employees pe
                  JOIN employees e
                  ON e.employee_id = pe.employee_id
                  JOIN products p
                  ON p.product_id = pe.product_id
                  WHERE pe.product_id = $1
                  AND p.created_by = $2`;

  const result = await pool.query(query, [id, createdBy]);
  return parseFloat(result.rows[0]?.total_labor_cpp) || 0;
}

export const getOtherExpenseCostPerProduct = async (id, createdBy) => {
  const query = `SELECT SUM (oe.expense_cost * poe.quantity) AS total_other_expense_cpp
                FROM product_other_expenses poe
                JOIN other_expenses oe
                ON oe.other_expense_id = poe.other_expense_id
                JOIN products p
                ON p.product_id = poe.product_id
                WHERE poe.product_id = $1
                AND p.created_by = $2`;

  const result = await pool.query(query, [id, createdBy]);
  return parseFloat(result.rows[0]?.total_other_expense_cpp) || 0;
}
