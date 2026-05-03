import express from "express";
import { fetchWhatIfPDF, fetchWhatIfExcel } from "../controllers/what-if-income-goal-report.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { submitLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();


router.get("/what-if/pdf", requireAuth, submitLimiter, fetchWhatIfPDF);
router.get("/what-if/excel", requireAuth, submitLimiter, fetchWhatIfExcel);

export default router;