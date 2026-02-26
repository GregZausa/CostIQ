import express from "express";
import {
  createPosition,
  fetchPositions,
  removePosition,
} from "../controllers/position.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";

const router = express.Router();
router.use(requireAuth);

router.get("/positions",  fetchPositions);
router.post("/positions", globalLimiter,  createPosition);
router.delete("/positions/:id", removePosition);

export default router;
