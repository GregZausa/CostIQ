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

  const values = [last_name, first_name, position, rate_per_hr, created_by];

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
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";

  const query = `SELECT e.employee_id, e.last_name, e.first_name, e.rate_per_hr , p.position_name 
                  FROM employees e
                  JOIN positions p ON e.position_id = p.position_id
                  WHERE e.created_by = $1 
                  AND (e.first_name ILIKE $2 OR e.last_name ILIKE $2)
                  AND e.is_active = true
                  ORDER BY e.first_name ASC, e.last_name ASC
                  LIMIT $3 OFFSET $4`;

  const { rows } = await pool.query(query, [
    createdBy,
    searchValue,
    limit,
    offset,
  ]);
  return rows;
};

export const getEmployeesCount = async (createdBy, searchTerm = "") => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";

  const query = `SELECT COUNT(*) AS total
                  FROM employees e
                  JOIN positions p ON e.position_id = p.position_id
                  WHERE e.created_by = $1
                  AND(e.first_name ILIKE $2 OR e.last_name ILIKE $2)
                  AND e.is_active = true`;

  const { rows } = await pool.query(query, [createdBy, searchValue]);
  return Number(rows[0].total);
};
export const getEmployeesTotalCount = async (createdBy) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total FROM employees WHERE created_by = $1 AND is_active = true`,
    [createdBy],
  );
  return Number(rows[0].total);
};
export const getMostUsedPosition = async (createdBy) => {
  const query = `SELECT p.position_id, p.position_name, 
                  COUNT(e.employee_id) 
                  AS usage_count
                  FROM positions p
                  JOIN employees e ON p.position_id = e.position_id
                  WHERE e.created_by = $1
                  AND e.is_active = true
                  GROUP BY p.position_id, p.position_name
                  ORDER BY usage_count DESC
                  LIMIT 1`;

  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};
export const getMostPaidEmployee = async (createdBy) => {
  const query = `SELECT CONCAT(first_name, ' ', last_name) AS employee_name, rate_per_hr 
                  FROM employees 
                  WHERE created_by = $1
                  AND is_active = true 
                  ORDER BY rate_per_hr DESC 
                  LIMIT 1`;
  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};
export const getMostUsedEmployee = async (createdBy) => {
  const query = `SELECT e.employee_id, CONCAT(first_name, ' ', last_name) AS employee_name, 
                  COUNT(pe.product_id) 
                  AS usage_count
                  FROM employees e
                  JOIN product_employees pe ON e.employee_id = pe.employee_id
                  WHERE e.created_by = $1
                  AND e.is_active = true
                  GROUP BY e.employee_id, e.first_name, e.last_name
                  ORDER BY usage_count DESC
                  LIMIT 1`;

  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};


export const getEmployeesById = async (createdBy, id) => {
  const query = `SELECT e.last_name, e.first_name, e.rate_per_hr, e.position_id, p.position_name 
                FROM employees e
                JOIN positions p ON e.position_id = p.position_id
                WHERE e.created_by = $1 AND e.employee_id = $2
                AND e.is_active = true`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deleteEmployee = async (id) => {
  const query = `UPDATE employees SET is_active = false WHERE employee_id = $1 RETUNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
