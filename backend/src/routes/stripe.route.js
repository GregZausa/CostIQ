import express from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { createSubscriptionSession } from "../controllers/stripe.controller.js";

const router = express.Router();
router.post("/billing/subscription", requireAuth, createSubscriptionSession);

export default router;