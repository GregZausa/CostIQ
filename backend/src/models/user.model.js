import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

//function to find if email already exists
export const findUserByEmail = async (email) => {
  //check if the email exists
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

//function to create a user
export const createUser = async ({ firstName, lastName, email, password }) => {
  const id = crypto.randomUUID();   
  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //insert query
  const insertQuery =
    "INSERT INTO users (id, first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name";
  const { rows } = await pool.query(insertQuery, [
    id,
    firstName,
    lastName,
    email,
    hashedPassword,
  ]);
  return rows[0];
};

//function to compare user input password and database password
export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}