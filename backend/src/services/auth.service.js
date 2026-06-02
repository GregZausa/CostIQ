import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/email.js";
import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  getUserById,
  saveRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
  markUserOnboarded,
  findUserByEmailVerificationToken,
  saveEmailVerificationToken,
  savePasswordResetToken,
  findUserByPasswordResetToken,
  updateUserPassword,
} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import pool from "../config/db.js";

const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists!");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  const accessToken = generateAccessToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);
  await saveRefreshToken(newUser.id, refreshToken);

  const verifyToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await saveEmailVerificationToken(newUser.id, verifyToken, expires);
  await sendVerificationEmail(email, verifyToken);

  return { newUser, accessToken, refreshToken };
};

export const verifyEmail = async (token) => {
  const user = await findUserByEmailVerificationToken(token);
  if (!user) throw new AppError("Invalid or expired verification token", 400);
  if (new Date() > new Date(user.email_verification_expires))
    throw new AppError("Verification token expired", 400);

  await pool.query(
    `UPDATE users SET is_email_verified = true,
     email_verification_token = NULL, email_verification_expires = NULL
     WHERE id = $1`,
    [user.id],
  );
};

export const forgotPassword = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  await savePasswordResetToken(user.id, token, expires);
  await sendPasswordResetEmail(email, token);
};

export const resetPassword = async (token, newPassword) => {
  const user = await findUserByPasswordResetToken(token);
  if (!user) throw new AppError("Invalid or expired reset token", 400);
  if (new Date() > new Date(user.password_reset_expires))
    throw new AppError("Reset token expired", 400);

  const hashed = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.id, hashed);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await saveRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const fetchUserByIdService = async ({ userId }) => {
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found!");
  return user;
};

export const refreshUserToken = async (token) => {
  if (!token) throw new AppError("No refresh token provided", 401);

  const user = await findUserByRefreshToken(token);
  if (!user) throw new AppError("Invalid or expired refresh token", 401);

  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    await deleteRefreshToken(token);
    throw new AppError("Refresh token expired, please login again", 401);
  }

  await deleteRefreshToken(token);

  const newAccessToken = generateAccessToken(user.id);
  const newRefreshToken = generateRefreshToken(user.id);
  await saveRefreshToken(user.id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (token) => {
  if (token) await deleteRefreshToken(token);
};
export const logoutAllDevices = async (userId) => {
  await deleteAllUserRefreshTokens(userId);
};

export const completeOnboarding = async (userId) => {
  await markUserOnboarded(userId);
};
