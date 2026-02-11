import pool from "../config/db.js";

export const instertRawMaterial = async ({
    material_name,pack_unit, base_unit, units_per_pack, price_per_pack, created_by,
}) => {
    const query = `INSERT INTO raw_materials
    (material_name, pack_unit, base_unit, units_per_pack, price_per_pack, created_by) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const values = [material_name, pack_unit, base_unit, units_per_pack, price_per_pack, created_by];
    const {rows} = await pool.query(query, values);
    return rows[0];
}