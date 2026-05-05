import express from "express";
import { analyzeMarketPrice } from "../controllers/gemini.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/market-price/:productId", requireAuth, analyzeMarketPrice);

export default router;