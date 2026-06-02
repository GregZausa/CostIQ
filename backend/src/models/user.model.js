import pool from "../config/db.js";
import crypto from "crypto";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const checkIfUserIsPremium = async (userId) => {
  const { rows } = await pool.query(
    "SELECT is_premium FROM users WHERE id = $1",
    [userId],
  );
  return rows[0]?.is_premium ?? false;
};

export const getUserById = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, first_name, last_name, email,
     is_premium, subscription_status, premium_since, premium_until,
     has_onboarded
     FROM users WHERE id = $1 LIMIT 1`,
    [userId],
  );
  return rows[0];
};

export const createUser = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash)
     VALUES($1, $2, $3, $4)
     RETURNING id, email, first_name, last_name`,
    [firstName, lastName, email, hashedPassword],
  );
  return rows[0];
};

export const saveRefreshToken = async (userId, token) => {
  const tokenHash = hashToken(token);
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash)
     VALUES ($1, $2)`,
    [userId, tokenHash],
  );
};

export const findUserByRefreshToken = async (token) => {
  const tokenHash = hashToken(token);
  const { rows } = await pool.query(
    `SELECT  u.id, u.first_name, u.last_name, email, is_premium, rt.id as token_id
     FROM refresh_tokens rt
     JOIN users u ON u.id = rt.user_id
     WHERE rt.token_hash = $1
     AND rt.expires_at > NOW()`,
    [tokenHash],
  );
  return rows[0];
};

export const deleteRefreshToken = async (token) => {
  const tokenHash = hashToken(token);
  await pool.query(`DELETE FROM refresh_tokens WHERE token_hash = $1`, [
    tokenHash,
  ]);
};

export const deleteAllUserRefreshTokens = async (userId) => {
  await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
};

export const cleanupExpiredTokens = async () => {
  await pool.query(`DELETE FROM refresh_tokens WHERE expires_at < NOW()`);
};

export const markUserOnboarded = async (userId) => {
  await pool.query(`UPDATE users SET has_onboarded = true WHERE id = $1`, [
    userId,
  ]);
};

export const saveEmailVerificationToken = async (userId, token, expires) => {
  await pool.query(
    `UPDATE users SET email_verification_token = $1,
     email_verification_expires = $2 WHERE id = $3`,
    [token, expires, userId],
  );
};

export const findUserByEmailVerificationToken = async (token) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email_verification_token = $1`,
    [token],
  );
  return rows[0];
};

export const savePasswordResetToken = async (userId, token, expires) => {
  await pool.query(
    `UPDATE users SET password_reset_token = $1,
     password_reset_expires = $2 WHERE id = $3`,
    [token, expires, userId],
  );
};

export const findUserByPasswordResetToken = async (token) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE password_reset_token = $1`,
    [token],
  );
  return rows[0];
};

export const updateUserPassword = async (userId, hashedPassword) => {
  await pool.query(
    `UPDATE users SET password_hash = $1,
      password_reset_token = NULL, password_reset_expires = NULL
      WHERE id = $2`,
    [hashedPassword, userId],
  );
};
