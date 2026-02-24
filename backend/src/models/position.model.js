import pool from "../config/db.js";

export const insertPosition = async ({
  position_name,
  default_rate_per_hr,
  created_by,
}) => {
  const query = `INSERT INTO positions
                    (position_name, default_rate_per_hr, created_by)
                    VALUES($1, $2, $3) RETURNING *`;

  const values = [position_name, default_rate_per_hr, created_by];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getPositions = async (createdBy) => {
  const query = "SELECT * FROM positions WHERE created_by = $1";
  const { rows } = await pool.query(query, [createdBy]);

  return rows || null;
};
