import express from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { loginLimiter, registerLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
