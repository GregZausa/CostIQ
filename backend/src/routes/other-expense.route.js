import express from "express";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { createOtherExpense } from "../controllers/other-expense.controller.js";

const router = express.Router();

router.post("/other-expense", globalLimiter, requireAuth, createOtherExpense)
export default router;