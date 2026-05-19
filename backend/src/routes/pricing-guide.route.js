import express from "express"
import { requireAuth } from "../middleware/auth.middleware.js";
import { reportLimiter, submitLimiter } from "../middleware/rate-limiter.js";
import { fetchPricingGuideExcel, fetchPricingGuidePDF } from "../controllers/pricing-guide.controller.js";

const router = express.Router();

router.get("/pricing-guide/pdf/", reportLimiter, submitLimiter, fetchPricingGuidePDF);
router.get("/pricing-guide/excel/", reportLimiter, submitLimiter, fetchPricingGuideExcel);

export default router;