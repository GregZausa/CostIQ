import cron from "node-cron";
import pool from "../config/db.js";

const cleanupInactiveRecords = async ({
  table,
  idColumn,
  retentionDays = 30,
}) => {
  try {
    const query = `
      DELETE FROM ${table}
      WHERE is_active = false
      AND updated_at <= NOW() - INTERVAL '${retentionDays} days'
      RETURNING ${idColumn}
    `;

    const { rows } = await pool.query(query);

    console.log(`[CLEANUP] ${table}: deleted ${rows.length} inactive records`);
  } catch (err) {
    console.error(`[CLEANUP ERROR] ${table}`, err);
  }
};

cron.schedule("0 0 * * *", async () => {
  await Promise.all([
    cleanupInactiveRecords({
      table: "employees",
      idColumn: "employee_id",
    }),

    cleanupInactiveRecords({
      table: "positions",
      idColumn: "position_id",
    }),
    cleanupInactiveRecords({
      table: "raw_materials",
      idColumn: "raw_material_id",
    }),
    cleanupInactiveRecords({
      table: "other_expenses",
      idColumn: "other_expense_id",
    }),
    cleanupInactiveRecords({
      table: "products",
      idColumn: "product_id",
    }),
  ]);
});
