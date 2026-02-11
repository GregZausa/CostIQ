import express from "express";
import { createRawMaterial, fetchRawMaterials } from "../controllers/raw-materials.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();

router.post("/add-raw-materials",globalLimiter, requireAuth, createRawMaterial);
router.get("/raw-materials", fetchRawMaterials);

export default router;