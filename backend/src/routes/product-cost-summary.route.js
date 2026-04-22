import express from "express";
import { fetchProductCostSummaryExcel, fetchProductCostSummaryPDF } from "../controllers/product-cost-summary.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { submitLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.get("/product-cost-summary/pdf/", requireAuth, submitLimiter, fetchProductCostSummaryPDF);
router.get("/product-cost-summary/excel/", requireAuth, submitLimiter, fetchProductCostSummaryExcel)
export default router;