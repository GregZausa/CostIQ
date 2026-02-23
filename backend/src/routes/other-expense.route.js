import express from "express";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createOtherExpense,
  editOtherExpense,
  fetchOtherExpenses,
  fetchOtherExpensesById,
  removeOtherExpense,
} from "../controllers/other-expense.controller.js";

const router = express.Router();
router.use(requireAuth);

router.post("/other-expenses", globalLimiter, createOtherExpense);
router.get("/other-expenses", fetchOtherExpenses);
router.get("/other-expenses/:id", fetchOtherExpensesById);
router.delete("/other-expenses/:id", removeOtherExpense);
router.put("/other-expenses/:id", globalLimiter, editOtherExpense);
export default router;
