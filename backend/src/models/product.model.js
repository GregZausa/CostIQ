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

export const getOtherExpenseCostPerBatch = async (id, createdBy) => {
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
