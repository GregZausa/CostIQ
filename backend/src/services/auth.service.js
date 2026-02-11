import {
  comparePassword,
  createUser,
  findUserByEmail,
} from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already exists!");

  const newUser = await createUser({ firstName, lastName, email, password });

  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET || "SECRET_KEY",
    { expiresIn: "1h" },
  );
  return { newUser, token };
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

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "SECRET_KEY",
    { expiresIn: "1h" },
  );

  return { user, token };
};
