import pool from "../config/db.js";

export const insertEmployee = async ({
  last_name,
  first_name,
  rate_per_hr,
  created_by,
}) => {
  const query = `INSERT INTO employees(last_name, first_name, rate_per_hr, created_by)
    VALUES($1, $2, $3, $4) RETURNING *`;

  const values = [last_name, first_name, rate_per_hr, created_by];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getEmployees = async (createdBy) => {
  const query = `SELECT last_name, first_name, rate_per_hr FROM employees WHERE created_by = $1`;
  const result = await pool.query(query, [createdBy]);
  return {
    headers: result.fields.map((field) => field.name),
    rows: result.rows,
  };
};
