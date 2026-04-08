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

export const updateRawMaterial = async (
  material_name,
  pack_unit,
  base_unit,
  units_per_pack,
  price_per_pack,
  createdBy,
  id,
) => {
  const query = `UPDATE raw_materials
                  SET material_name = $1, pack_unit = $2, base_unit = $3,
                  units_per_pack = $4, price_per_pack = $5
                  WHERE created_by = $6 AND raw_material_id = $7 RETURNING *`;

  const values = [
    material_name,
    pack_unit,
    base_unit,
    units_per_pack,
    price_per_pack,
    createdBy,
    id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getRawMaterials = async (
  createdBy,
  searchTerm = "",
  selectedUnit = "",
  limit = 8,
  offset = 0,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT raw_material_id, material_name, pack_unit, base_unit,
                units_per_pack, price_per_pack, cost_per_unit
                FROM raw_materials
                WHERE created_by = $1 
                AND is_active = true 
                AND material_name ILIKE $2`;

  let values = [createdBy, searchValue];
  if (selectedUnit) {
    query += ` AND pack_unit = $3`;
    values.push(selectedUnit);
  }

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const { rows } = await pool.query(query, values);

  return rows;
};

export const getRawMaterialsCount = async (
  createdBy,
  searchTerm = "",
  selectedUnit = "",
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";
  let query = `SELECT COUNT(*) AS total
                FROM raw_materials
                WHERE created_by = $1
                AND is_active = true
                AND material_name ILIKE $2`;

  let values = [createdBy, searchValue];

  if (selectedUnit) {
    query += ` AND pack_unit = $3`;
    values.push(selectedUnit);
  }

  const { rows } = await pool.query(query, values);
  return Number(rows[0].total);
};

export const getRawMaterialsTotalCount = async (createdBy) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*) AS total FROM raw_materials WHERE created_by = $1 AND is_active = true`,
    [createdBy],
  );
  return Number(rows[0].total);
};

export const getRawMaterialsById = async (createdBy, id) => {
  const query = `SELECT material_name, pack_unit, base_unit, units_per_pack, price_per_pack, cost_per_unit 
                  FROM raw_materials 
                  WHERE created_by = $1 AND raw_material_id = $2 AND is_active = true`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deleteRawMaterials = async (id) => {
  const query = `UPDATE raw_materials SET is_active = false WHERE raw_material_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getMostExpensiveMaterial = async (createdBy) => {
  const query = `SELECT * 
                  FROM raw_materials 
                  WHERE created_by = $1
                  AND is_active = true 
                  ORDER BY cost_per_unit DESC 
                  LIMIT 1`;
  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};

export const getLeastExpensiveMaterial = async (createdBy) => {
  const query = `SELECT * 
                  FROM raw_materials 
                  WHERE created_by = $1 
                  AND is_active = true
                  ORDER BY cost_per_unit ASC 
                  LIMIT 1`;
  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};

export const getMostUsedMaterial = async (createdBy) => {
  const query = `SELECT rm.raw_material_id, rm.material_name, 
                  COUNT(pi.product_id) 
                  AS usage_count
                  FROM raw_materials rm
                  JOIN product_ingredients pi ON rm.raw_material_id = pi.material_id
                  WHERE rm.created_by = $1
                  AND rm.is_active = true
                  GROUP BY rm.raw_material_id, rm.material_name
                  ORDER BY usage_count DESC
                  LIMIT 1`;

  const result = await pool.query(query, [createdBy]);
  return result.rows[0] || null;
};
