import express from "express";
import {
  createRawMaterial,
  editRawMaterial,
  fetchRawMaterials,
  fetchRawMaterialsById,
  removeRawMaterials,
} from "../controllers/raw-materials.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();
router.use(requireAuth);

router.post("/raw-materials", globalLimiter, createRawMaterial);
router.get("/raw-materials", fetchRawMaterials);
router.get("/raw-materials/:id", fetchRawMaterialsById);
router.delete("/raw-materials/:id", removeRawMaterials);
router.put("/raw-materials/:id", globalLimiter, editRawMaterial);

export default router;
