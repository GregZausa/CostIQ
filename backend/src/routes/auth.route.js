import express from "express";
import {
  getMe,
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { loginLimiter, registerLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, getMe);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
