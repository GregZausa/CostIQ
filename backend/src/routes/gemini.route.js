import express from "express";
import { analyzeCostOptimization, analyzeMarketPrice } from "../controllers/gemini.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/market-price/:productId", requireAuth, analyzeMarketPrice);
router.get(
  "/cost-optimization/:productId",
  requireAuth,
  analyzeCostOptimization,
);

export default router;
