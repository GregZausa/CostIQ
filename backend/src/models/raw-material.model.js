import pool from "../config/db.js";

export const insertRawMaterial = async ({
  material_name,
  pack_unit,
  base_unit,
  units_per_pack,
  price_per_pack,
  created_by,
}) => {
  const query = `INSERT INTO raw_materials
    (material_name, pack_unit, base_unit, units_per_pack, price_per_pack, created_by) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
    created_by,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getRawMaterials = async (createdBy) => {
  const query = `SELECT raw_material_id, material_name, pack_unit, base_unit, units_per_pack, price_per_pack, cost_per_unit FROM raw_materials 
                  WHERE created_by = $1 AND material_name ILIKE = $2 LIMIT $3 OFfSET $4`;
  const result = await pool.query(query, [createdBy]);
  return {
    headers: result.fields.map((field) => field.name),
    rows: result.rows,
  };
};

export const getRawMaterialsById = async (createdBy, id) => {
  const query = `SELECT material_name, pack_unit, base_unit, units_per_pack, price_per_pack cost_per_unit FROM raw_materials WHERE created_by = $1 AND raw_material_id = $2`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deleteRawMaterials = async (id) => {
  const query = `DELETE FROM raw_materials WHERE raw_material_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
