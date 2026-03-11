import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";
import { createProduct, fetchProduct } from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.use(requireAuth);

router.post("/products", globalLimiter, upload.single("product_image"), createProduct);
router.get("/products/:id", globalLimiter, fetchProduct )

export default router;
