import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, getUserById } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
  return { newUser, accessToken, refreshToken };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email or Password!");
  }

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid Email or Password!");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { user, accessToken, refreshToken };
};

export const fetchUserByIdService = async ({ userId }) => {
  const user = await getUserById(userId);
  if(!user) throw new Error("User not found!");
  return user;
};

export const refreshUserToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(payload.userId);
    return { accessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
};
