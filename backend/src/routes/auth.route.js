import express from "express";
import {
  forgotPasswordController,
  getMe,
  googleCallback,
  login,
  logout,
  logoutAll,
  onboard,
  refresh,
  register,
  resetPasswordController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import {
  loginLimiter,
  refreshLimiter,
  registerLimiter,
} from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, getMe);
router.post("/refresh", refreshLimiter, refresh);
router.post("/logout", requireAuth, logout);
router.post("/logout-all", requireAuth, logoutAll);
router.post("/onboard", requireAuth, onboard);

router.get("/verify-email", verifyEmailController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`,
    session: false,
  }),
  googleCallback,
);

export default router;
