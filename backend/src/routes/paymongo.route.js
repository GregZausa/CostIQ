import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createCheckout,
  paymongoWebhook,
} from "../controllers/paymongo.controller.js";

const router = express.Router();
router.post("/checkout", requireAuth, createCheckout);
router.post("/webhook", paymongoWebhook);

export default router;
