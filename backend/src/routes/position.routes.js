import express from "express";
import {
  createPosition,
  editPosition,
  fetchPositions,
  fetchPositionsById,
  removePosition,
} from "../controllers/position.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();
router.use(requireAuth);

router.get("/positions", fetchPositions);
router.get("/positions/:id", fetchPositionsById);
router.post("/positions", globalLimiter, createPosition);
router.put("/positions/:id", globalLimiter, editPosition);
router.delete("/positions/:id", removePosition);

export default router;
