import pool from "../config/db.js";

export const getPackUnits = async () => {
    const getPackQuery = "SELECT * FROM units";
    const {rows} = await pool.query(getPackQuery);

    return rows;
}