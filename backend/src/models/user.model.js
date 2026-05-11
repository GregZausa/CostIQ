import pool from "../config/db.js";

//function to find if email already exists
export const findUserByEmail = async (email) => {
  //check if the email exists
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const checkIfUserIsPremium = async (userId) => {
  const userResult = await pool.query(
    "SELECT is_premium FROM users WHERE id = $1",
    [userId],
  );
  return userResult.rows?.[0]?.is_premium ?? false;
};

export const getUserById = async (userId) => {
  const query = `SELECT id, first_name, last_name,
                email, is_premium, subscription_status, premium_since,
                premium_until
                FROM users WHERE id = $1 LIMIT 1`;

  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

export const createUser = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
}) => {
  const insertQuery =
    "INSERT INTO users (first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4) RETURNING id, email, first_name, last_name";
  const { rows } = await pool.query(insertQuery, [
    firstName,
    lastName,
    email,
    hashedPassword,
  ]);
  return rows[0];
};
