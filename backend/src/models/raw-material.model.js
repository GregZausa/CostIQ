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
  const {rows } = await pool.query(query, values);  
  return rows[0];
};

export const getRawMaterials = async (
  createdBy,
  searchTerm = "",
  selectedUnit = "",
  limit = 8,
  offset = 0,
  page = 1,
) => {
  const searchValue = searchTerm ? `%${searchTerm}%` : "%";

  let countQuery = `SELECT COUNT(*) AS total
                      FROM raw_materials
                      WHERE created_by = $1
                      AND material_name ILIKE $2`;

  let query = `SELECT raw_material_id, material_name, pack_unit, base_unit, units_per_pack, price_per_pack, cost_per_unit FROM raw_materials 
                  WHERE created_by = $1 AND material_name ILIKE $2`;

  let values = [createdBy, searchValue];

  if (selectedUnit) {
    query += ` AND pack_unit = $3`;
    countQuery += ` AND pack_unit = $3`;
    values.push(selectedUnit);
  }

  const countResult = await pool.query(countQuery, values);
  const totalRows = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalRows / limit);

  const limitPlaceholder = `$${values.length + 1}`;
  const offsetPlaceholder = `$${values.length + 2}`;
  query += ` ORDER BY created_at DESC LIMIT ${limitPlaceholder} OFFSET ${offsetPlaceholder}`;
  values.push(limit, offset);
  const result = await pool.query(query, values);
  return {
    headers: result.fields.map((field) => field.name),
    rows: result.rows,
    page,
    totalPages,
    totalRows,
  };
};

export const getRawMaterialsById = async (createdBy, id) => {
  const query = `SELECT material_name, pack_unit, base_unit, units_per_pack, price_per_pack, cost_per_unit 
                  FROM raw_materials 
                  WHERE created_by = $1 AND raw_material_id = $2`;
  const result = await pool.query(query, [createdBy, id]);
  return result.rows[0];
};

export const deleteRawMaterials = async (id) => {
  const query = `DELETE FROM raw_materials WHERE raw_material_id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
