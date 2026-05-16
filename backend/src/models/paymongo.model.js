import pool from "../config/db.js";

export const handleSubscription = async (
  premium_since,
  premium_until,
  subscription_id,
  id,
) => {
  const query = `UPDATE users SET is_premium = true, subscription_status = 'active', 
                    premium_since = $1, premium_until = $2, subscription_id = $3 
                    WHERE id = $4 RETURNING *`;

  const values = [premium_since, premium_until, subscription_id, id];

  const result = await pool.query(query, values);
  return result;
};
