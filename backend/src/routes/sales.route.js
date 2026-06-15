import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { submitLimiter } from "../middleware/rate-limiter.js";
import {
  logSaleController,
  getDashboardSalesController,
  getTodaySalesController,
  getMonthlySalesController,
  updateGoalController,
  getSalesHistoryController,
} from "../controllers/sales.controller.js";

const router = express.Router();

router.post("/", requireAuth, submitLimiter, logSaleController);
router.get("/dashboard", requireAuth, getDashboardSalesController);
router.get("/today", requireAuth, getTodaySalesController);
router.get("/monthly", requireAuth, getMonthlySalesController);
router.patch("/goal", requireAuth, updateGoalController);
router.get("/history", requireAuth, getSalesHistoryController); 

export default router;
