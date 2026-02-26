import pool from "../config/db.js";

export const insertEmployee = async ({
  last_name,
  first_name,
  position,
  rate_per_hr,
  created_by,
}) => {
  const query = `INSERT INTO employees(last_name, first_name, position_id, rate_per_hr, created_by)
    VALUES($1, $2, $3, $4, $5) RETURNING *`;

  const values = [last_name, first_name, position,  rate_per_hr, created_by];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const updateEmployee = async (
  last_name,
  first_name,
  position,
  rate_per_hr,
  createdBy,
  id,
) => {
  const query = `UPDATE employees 
                  SET last_name = $1, first_name = $2, position_id = $3, rate_per_hr = $4 
                  WHERE created_by = $5 AND employee_id = $6 RETURNING *`;

  const values = [last_name, first_name, position, rate_per_hr, createdBy, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getEmployees = async (
  createdBy,
  searchTerm = "",
  limit = 8,
  offset = 0,
  page = 1,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";

  const countQuery = `SELECT COUNT(*) AS total
                      FROM employees
                      WHERE created_by = $1
                      AND (first_name ILIKE $2 OR last_name ILIKE $2)`;

  const countResult = await pool.query(countQuery, [createdBy, searchValue]);
  const totalRows = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalRows / limit);
  const query = `SELECT e.employee_id, e.last_name, e.first_name, e.rate_per_hr , p.position_name 
                  FROM employees e
                  JOIN positions p ON e.position_id = p.position_id
                  WHERE e.created_by = $1 AND (e.first_name ILIKE $2 OR e.last_name ILIKE $2) 
                  ORDER BY e.first_name ASC, e.last_name ASC
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

export const getEmployeesById = async (createdBy, id) => {
  const query = `SELECT e.last_name, e.first_name, e.rate_per_hr, e.position_id, p.position_name 
                FROM employees e
                JOIN positions p ON e.position_id = p.position_id
                WHERE e.created_by = $1 AND e.employee_id = $2`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deleteEmployee = async (id) => {
  const query = `DELETE FROM employees WHERE employee_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
