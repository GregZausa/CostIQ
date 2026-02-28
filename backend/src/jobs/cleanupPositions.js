import cron from "node-cron";
import pool from "../config/db.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const query = `DELETE FROM positions
                        WHERE is_active = false
                        AND updated_at <= NOW() - INTERVAL '30 days'
                        RETURNING position_id`;

    const { rows } = await pool.query(query);
    console.log(`Cleaned up ${rows.length} inactive position`);
  } catch (err) {
    console.error("Cleanup job failed ", err);
  }
});
