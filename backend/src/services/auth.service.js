import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  getUserById,
  saveRefreshToken,
  deleteRefreshToken,
  deleteAllUserRefreshTokens,
} from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

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

  return { newUser, accessToken, refreshToken };
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
