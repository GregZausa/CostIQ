import express from "express";
import { createRawMaterial } from "../controllers/raw-materials.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.post("/add-raw-material",globalLimiter, requireAuth, createRawMaterial);

export default router;