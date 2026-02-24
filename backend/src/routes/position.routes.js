import express from "express";
import { createPosition, fetchPositions } from "../controllers/position.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();
router.get("/positions", requireAuth, fetchPositions);
router.post("/positions", globalLimiter, requireAuth, createPosition);

export default router;
