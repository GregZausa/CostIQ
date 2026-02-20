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

export const getOtherExpenses = async (
  createdBy,
  searchTerm = "",
  limit = 8,
  offset = 0,
  page = 1,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";

  const countQuery = `SELECT COUNT(*) AS total
                      FROM other_expenses
                      WHERE created_by = $1
                      AND category_name ILIKE $2`;

  const countResult = await pool.query(countQuery, [createdBy, searchValue]);
  const totalRows = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalRows / limit);

  const query = `SELECT other_expense_id, category_name, quantity, expense_cost 
                  FROM other_expenses
                  WHERE created_by = $1
                  AND category_name ILIKE $2
                  LIMIT $3 OFFSET $4`;

  const values = [createdBy, searchValue, limit, offset];
  const result = await pool.query(query, values);
  return {
    headers: result.fields.map((field) => field.name),
    rows: result.rows,
    page,
    totalPages,
    totalRows,
  };
};

export const deleteOtherExpense = async (id) => {
  const query = `DELETE FROM other_expenses WHERE other_expense_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
