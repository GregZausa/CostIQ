import express from "express";
import {
  fetchFinancialOverviewPDF,
  fetchFinancialOverviewExcel,
} from "../controllers/financial-overview-controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { submitLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.get(
  "/financial-overview/pdf/",
  requireAuth,
  submitLimiter,
  fetchFinancialOverviewPDF,
);
router.get(
  "/financial-overview/excel/",
  requireAuth,
  submitLimiter,
  fetchFinancialOverviewExcel,
);

export default router;
