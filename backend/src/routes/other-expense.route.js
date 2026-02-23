import express from "express";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createOtherExpense,
  fetchOtherExpenses,
  fetchOtherExpensesById,
  removeOtherExpense,
} from "../controllers/other-expense.controller.js";

const router = express.Router();

router.post("/other-expenses", globalLimiter, requireAuth, createOtherExpense);
router.get("/other-expenses", requireAuth, fetchOtherExpenses);
router.get("/other-expenses/:id", requireAuth, fetchOtherExpensesById);
router.delete("/other-expenses/:id", requireAuth, removeOtherExpense);
export default router;
