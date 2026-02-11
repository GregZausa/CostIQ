import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { loginLimiter, registerLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);

export default router;