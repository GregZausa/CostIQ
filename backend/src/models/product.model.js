import pool from "../config/db.js";

export const insertProduct = async (client ,{
  product_name,
  product_image,
  total_input,
  units_per_product,
  total_sellable_units,
  profit_margin,
  discount,
  sales_tax,
  created_by,
}) => {
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

export const insertProductIngredients = async (client, productId, directMaterials) => {
  for (const material of directMaterials) {
    const query = `INSERT INTO product_ingredients 
                    (product_id, material_id, units_needed)
                    VALUES($1, $2, $3)`;

    const values = [
      productId,
      material.raw_material_id,
      material.units_needed,
    ];
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

export const insertProductOtherExpenses = async (client, productId, otherExpenses) => {
  for (const expense of otherExpenses) {
    const query = `INSERT INTO product_other_expenses 
                        (product_id, other_expense_id, quantity)
                        VALUES($1, $2, $3)`;

    const values = [productId, expense.other_expense_id, expense.quantity];

    await client.query(query, values);
  }
};
