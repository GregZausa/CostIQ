import pool from "../config/db.js";

export const insertOtherExpense = async ({
  category_name,
  quantity,
  cost,
  created_by,
}) => {
  const query = `INSERT INTO other_expenses (category_name, quantity, expense_cost, created_by) VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [category_name, quantity, cost, created_by];

  const { rows } = await pool.query(query, values);
  return rows[0];
};
