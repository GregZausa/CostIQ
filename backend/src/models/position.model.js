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

export const deletePositions = async (id) => {
  const query = `UPDATE positions
                  SET is_active = false
                  WHERE position_id = $1`;

  const { rows } = await query.pool(query, [id]);
  return rows[0];
};
