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

export const updatePositions = async (
  position_name,
  default_rate_per_hr,
  created_by,
  id,
) => {
  const query = `UPDATE positions SET position_name = $1, default_rate_per_hr = $2
                  WHERE created_by = $3 
                  AND position_id = $4`;

  const values = [position_name, default_rate_per_hr, created_by, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getPositions = async (createdBy) => {
  const optionsQuery =
    "SELECT * FROM positions WHERE created_by = $1 AND is_active = true";
  const result = await pool.query(optionsQuery, [createdBy]);

  return {
    headers: result.fields
      .map((field) => field.name)
      .filter(
        (name) =>
          name !== "is_active" &&
          name !== "position_id" &&
          name !== "created_by" &&
          name !== "created_at" &&
          name !== "updated_at",
      ),
    rows: result.rows,
    positionOptions: result.rows,
  };
};

export const getPositionsById = async (createdBy, id) => {
  const query = `SELECT position_name, default_rate_per_hr FROM positions WHERE created_by = $1 AND position_id = $2`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deletePositions = async (id) => {
  const query = `UPDATE positions
                  SET is_active = false
                  WHERE position_id = $1 RETURNING *`;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
