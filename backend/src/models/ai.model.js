import pool from "../config/db.js";

export const checkAndConsumeToken = async (userId) => {
  const { rows } = await pool.query(
    `SELECT ai_tokens_used, ai_tokens_limit, ai_tokens_reset_at, 
     is_premium, ai_trial_used
     FROM users WHERE id = $1`,
    [userId]
  );

  const user = rows[0];
  if (!user) throw new Error("User not found");

  if (!user.is_premium && !user.ai_trial_used) {
    await pool.query(
      `UPDATE users SET ai_trial_used = true WHERE id = $1`,
      [userId]
    );
    return {
      tokensUsed: 1,
      tokensLimit: 1,
      tokensRemaining: 0,
      isTrial: true,
    };
  }

  if (!user.is_premium && user.ai_trial_used) {
    throw new Error("You've used your free AI trial. Upgrade to Premium for full access.")
  }

  if (new Date() > new Date(user.ai_tokens_reset_at)) {
    await pool.query(
      `UPDATE users SET 
        ai_tokens_used = 0,
        ai_tokens_reset_at = NOW() + INTERVAL '1 day'
       WHERE id = $1`,
      [userId]
    );
    user.ai_tokens_used = 0;
  }

  if (user.ai_tokens_used >= user.ai_tokens_limit) {
    const resetAt = new Date(user.ai_tokens_reset_at)
    throw new Error(`Daily AI limit reached. Resets at ${resetAt.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })} tomorrow.`)
  }

  await pool.query(
    `UPDATE users SET ai_tokens_used = ai_tokens_used + 1 WHERE id = $1`,
    [userId]
  );

  return {
    tokensUsed: user.ai_tokens_used + 1,
    tokensLimit: user.ai_tokens_limit,
    tokensRemaining: user.ai_tokens_limit - user.ai_tokens_used - 1,
    isTrial: false,
  }
}

export const getTokenStatus = async (userId) => {
  const { rows } = await pool.query(
    `SELECT ai_tokens_used, ai_tokens_limit, ai_tokens_reset_at, is_premium
     FROM users WHERE id = $1`,
    [userId]
  );
  const user = rows[0];

  return {
    isPremium: user.is_premium,
    tokensUsed: user.ai_tokens_used,
    tokensLimit: user.ai_tokens_limit,
    tokensRemaining: Math.max(0, user.ai_tokens_limit - user.ai_tokens_used),
    resetsAt: user.ai_tokens_reset_at,
  }
}