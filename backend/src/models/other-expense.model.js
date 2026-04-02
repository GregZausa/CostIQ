import pool from "../config/db.js";

export const insertOtherExpense = async ({
  category_name,
  cost,
  expense_type,
  created_by,
}) => {
  const query = `INSERT INTO other_expenses (category_name, expense_cost, expense_type, created_by) VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [category_name, cost, expense_type, created_by];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const updateOtherExpense = async (
  category_name,
  cost,
  expense_type,
  createdBy,
  id,
) => {
  const query = `UPDATE other_expenses SET category_name = $1, expense_cost = $2, expense_type = $3
                  WHERE created_by = $4
                  AND other_expense_id = $5 RETURNING *`;

  const values = [category_name, cost, expense_type, createdBy, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getOtherExpenses = async (
  createdBy,
  searchTerm = "",
  limit = 8,
  offset = 0,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT other_expense_id, category_name, expense_cost, expense_type 
                  FROM other_expenses
                  WHERE created_by = $1
                  AND is_active = true
                  AND category_name ILIKE $2`;

  let values = [createdBy, searchValue];

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);
  return rows;
};

export const getOtherExpensesCount = async (createdBy, searchTerm = "") => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT COUNT(*) as total
                FROM other_expenses
                WHERE created_by = $1
                AND is_active = true
                AND category_name ILIKE $2`;

  let values = [createdBy, searchValue];

  const { rows } = await pool.query(query, values);

  return Number(rows[0].total);
};

export const getOtherExpensesTotalCount = async (createdBy) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total from other_expenses WHERE created_by = $1 AND is_active = true`,
    [createdBy],
  );
  return Number(rows[0].total);
};

export const getmostUsedExepnse = async (createdBy) => {
  const query = `SELECT oe.other_expense_id, oe.category_name, 
                  COUNT(poe.product_id)
                  AS usage_count
                  FROM other_expenses oe
                  JOIN product_other_expenses poe ON oe.other_expense_id = poe.other_expense_id
                  WHERE oe.created_by = $1
                  AND oe.is_active = true
                  GROUP BY oe.other_expense_id, oe.category_name
                  ORDER BY usage_count DESC
                  LIMIT 1`

  const result = await pool.query(query, [createdBy])
  return result.rows[0] || null;
}

export const getOtherExpensesById = async (createdBy, id) => {
  const query = `SELECT category_name, expense_cost 
                  FROM other_expenses 
                  WHERE created_by = $1 AND other_expense_id = $2`;

  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};
export const deleteOtherExpense = async (id) => {
  const query = `UPDATE other_expenses SET is_active = false WHERE other_expense_id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
