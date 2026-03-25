import {
  fetchUserByIdService,
  loginUser,
  refreshUserToken,
  registerUser,
} from "../services/auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    if (!email || !password || !lastName || !firstName) {
      return res.status(400).json({ message: "All fields are required!" });
    }

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
    console.error(err);
    res
      .status(err.message.includes("exists") ? 409 : 500)
      .json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });
    }

    const { user, accessToken, refreshToken } = await loginUser({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.json({
      message: "Logged In Successfully!",
      user,
      token: accessToken,
    });
  } catch (err) {
    res
      .status(err.message.includes("Invalid") ? 401 : 500)
      .json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await fetchUserByIdService({
      userId: req.user.id,
    });
    if (!user) return res.status(404).json({ message: "User not found!" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refresh = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const { accessToken } = refreshUserToken(token);
    res.json({ token: accessToken });
  } catch (err) {
    res.clearCookie("refreshToken", COOKIE_OPTIONS);
    res.status(401).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.json({ message: "Logged out successfully!" });
};
