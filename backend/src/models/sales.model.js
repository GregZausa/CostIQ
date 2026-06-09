import pool from "../config/db.js";

export const logSale = async ({
  productId,
  userId,
  unitsSold,
  revenue,
  profit,
  cogs,
  date,
  notes,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO sales_logs (product_id, user_id, units_sold, revenue, profit, cogs, date, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (product_id, user_id, date)
     DO UPDATE SET
       units_sold = sales_logs.units_sold + EXCLUDED.units_sold,
       revenue = sales_logs.revenue + EXCLUDED.revenue,
       profit = sales_logs.profit + EXCLUDED.profit,
       cogs = sales_logs.cogs + EXCLUDED.cogs,
       notes = EXCLUDED.notes
     RETURNING *`,
    [
      productId,
      userId,
      unitsSold,
      revenue,
      profit,
      cogs,
      date || new Date(),
      notes,
    ],
  );
  return rows[0];
};

export const getTodaySales = async (userId) => {
  const { rows } = await pool.query(
    `SELECT
       sl.*,
       p.product_name,
       p.product_image
     FROM sales_logs sl
     JOIN products p ON p.product_id = sl.product_id
     WHERE sl.user_id = $1
     AND sl.date = CURRENT_DATE
     ORDER BY sl.created_at DESC`,
    [userId],
  );
  return rows;
};

export const getMonthlySales = async (userId, year, month) => {
  const { rows } = await pool.query(
    `SELECT
       sl.date,
       SUM(sl.units_sold) as total_units,
       SUM(sl.revenue) as total_revenue,
       SUM(sl.profit) as total_profit,
       SUM(sl.cogs) as total_cogs
     FROM sales_logs sl
     WHERE sl.user_id = $1
     AND EXTRACT(YEAR FROM sl.date) = $2
     AND EXTRACT(MONTH FROM sl.date) = $3
     GROUP BY sl.date
     ORDER BY sl.date ASC`,
    [userId, year, month],
  );
  return rows;
};

export const getSalesSummary = async (userId) => {
  const { rows } = await pool.query(
    `SELECT
       -- Today
       COALESCE(SUM(CASE WHEN date = CURRENT_DATE THEN revenue END), 0) as today_revenue,
       COALESCE(SUM(CASE WHEN date = CURRENT_DATE THEN profit END), 0) as today_profit,
       COALESCE(SUM(CASE WHEN date = CURRENT_DATE THEN units_sold END), 0) as today_units,

       -- This week
       COALESCE(SUM(CASE WHEN date >= DATE_TRUNC('week', CURRENT_DATE) THEN revenue END), 0) as week_revenue,
       COALESCE(SUM(CASE WHEN date >= DATE_TRUNC('week', CURRENT_DATE) THEN profit END), 0) as week_profit,

       -- This month
       COALESCE(SUM(CASE WHEN date >= DATE_TRUNC('month', CURRENT_DATE) THEN revenue END), 0) as month_revenue,
       COALESCE(SUM(CASE WHEN date >= DATE_TRUNC('month', CURRENT_DATE) THEN profit END), 0) as month_profit,
       COALESCE(SUM(CASE WHEN date >= DATE_TRUNC('month', CURRENT_DATE) THEN units_sold END), 0) as month_units,

       -- Best day this month
       MAX(CASE WHEN date >= DATE_TRUNC('month', CURRENT_DATE) THEN profit END) as best_day_profit

     FROM sales_logs
     WHERE user_id = $1`,
    [userId],
  );
  return rows[0];
};

export const getProductSalesSummary = async (userId) => {
  const { rows } = await pool.query(
    `SELECT
       p.product_id,
       p.product_name,
       p.product_image,
       COALESCE(SUM(sl.units_sold), 0) as total_units,
       COALESCE(SUM(sl.revenue), 0) as total_revenue,
       COALESCE(SUM(sl.profit), 0) as total_profit
     FROM products p
     LEFT JOIN sales_logs sl ON sl.product_id = p.product_id
       AND sl.date >= DATE_TRUNC('month', CURRENT_DATE)
     WHERE p.created_by = $1
     GROUP BY p.product_id, p.product_name, p.product_image
     ORDER BY total_profit DESC`,
    [userId],
  );
  return rows;
};

export const getWeeklySalesHistory = async (userId) => {
  const { rows } = await pool.query(
    `SELECT
       date,
       SUM(revenue) as revenue,
       SUM(profit) as profit,
       SUM(units_sold) as units_sold
     FROM sales_logs
     WHERE user_id = $1
     AND date >= CURRENT_DATE - INTERVAL '7 days'
     GROUP BY date
     ORDER BY date ASC`,
    [userId],
  );
  return rows;
};

export const updateMonthlyGoal = async (userId, goal) => {
  await pool.query(`UPDATE users SET monthly_goal = $1 WHERE id = $2`, [
    goal,
    userId,
  ]);
};
