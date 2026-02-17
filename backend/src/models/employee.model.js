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
  const query = `SELECT employee_id, last_name, first_name, rate_per_hr FROM employees 
                  WHERE created_by = $1 AND first_name = $2 OR last_name = $2 
                  LIMIT $3 OFFSET $4`;

  const values = [createdBy, `${searchTerm}`, limit, offset]
  const result = await pool.query(query, values);
  return {
    headers: result.fields.map((field) => field.name),
    rows: result.rows,
  };
};

export const deleteEmployee = async (id) => {
  const query = `DELETE FROM employees WHERE employee_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
