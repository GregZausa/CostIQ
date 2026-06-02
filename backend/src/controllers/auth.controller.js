import { saveRefreshToken } from "../models/user.model.js";
import {
  completeOnboarding,
  fetchUserByIdService,
  forgotPassword,
  loginUser,
  logoutAllDevices,
  logoutUser,
  refreshUserToken,
  registerUser,
  resetPassword,
  verifyEmail,
} from "../services/auth.service.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction ? process.env.PRODUCTION_URL : process.env.URL;

export const register = async (req, res) => {
  try {
    const { email, password, lastName, firstName } = req.body;
    if (!email || !password || !lastName || !firstName)
      return res.status(400).json({ message: "All fields are required!" });

    const { newUser, accessToken, refreshToken } = await registerUser({
      email,
      password,
      firstName,
      lastName,
    });

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      message: "User Registered Successfully!",
      user: newUser,
      token: accessToken,
    });
  } catch (err) {
    res
      .status(err.message.includes("exists") ? 409 : 500)
      .json({ message: err.message });
  }
};
export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    await verifyEmail(token);
    res.redirect(`${BASE_URL}/login?verified=true`);
  } catch (err) {
    res.redirect(`${BASE_URL}/login?verified=false`);
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPassword(email);
    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!password || password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    await resetPassword(token, password);
    res.json({ message: "Password reset successfully. You can now log in." });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    await saveRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

    res.redirect(`${BASE_URL}/oauth/callback?token=${accessToken}`);
  } catch (err) {
    res.redirect(`${BASE_URL}/login?error=oauth_failed`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });

    const { user, accessToken, refreshToken } = await loginUser({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.json({ message: "Logged In Successfully!", user, token: accessToken });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await fetchUserByIdService({ userId: req.user.id });
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ message: "No refresh token provided" });

    const { accessToken, refreshToken } = await refreshUserToken(token);
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.json({ token: accessToken });
  } catch (err) {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.status(err.statusCode || 401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    await logoutUser(token);
  } catch {
  } finally {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.json({ message: "Logged out successfully!" });
  }
};

export const logoutAll = async (req, res) => {
  try {
    await logoutAllDevices(req.user.id);
  } catch {
  } finally {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.json({ message: "Logged out from all devices!" });
  }
};

export const onboard = async (req, res) => {
  try {
    await completeOnboarding(req.user.id);
    res.json({ message: "Onboarding complete" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
