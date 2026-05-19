import express from "express";
import {
  getMe,
  login,
  logout,
  logoutAll,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { loginLimiter, refreshLimiter, registerLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, getMe);
router.post("/refresh",refreshLimiter, refresh);
router.post("/logout", requireAuth, logout);
router.post("/logout-all", requireAuth, logoutAll); 

export default router;
