import express from "express"
import { requireAuth } from "../middleware/auth.middleware.js";
import { submitLimiter } from "../middleware/rate-limiter.js";
import { fetchPricingGuideExcel, fetchPricingGuidePDF } from "../controllers/pricing-guide.controller.js";

const router = express.Router();

router.get("/pricing-guide/pdf/", requireAuth, submitLimiter, fetchPricingGuidePDF);
router.get("/pricing-guide/excel/", requireAuth, submitLimiter, fetchPricingGuideExcel);

export default router;