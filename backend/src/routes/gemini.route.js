import express from "express";
import {
  analyzeCostOptimization,
  analyzeMarketPrice,
} from "../controllers/gemini.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { aiLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();
router.get(
  "/market-price/:productId",
  requireAuth,
  aiLimiter,
  analyzeMarketPrice,
);
router.get(
  "/cost-optimization/:productId",
  requireAuth,
  aiLimiter,
  analyzeCostOptimization,
);

export default router;
