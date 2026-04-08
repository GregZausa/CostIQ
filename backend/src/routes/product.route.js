import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { globalLimiter } from "../middleware/rate-limiter.js";
import {
  createProduct,
  fetchAllComputedProducts,
  fetchPaginatedProducts,
  fetchProduct,
  fetchProducts,
  removeProducts,
} from "../controllers/product.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.use(requireAuth);

router.post(
  "/products",
  globalLimiter,
  upload.single("product_image"),
  createProduct,
);
router.get("/products/all", fetchProducts);
router.get("/products", fetchPaginatedProducts);
router.get("/products/computed", fetchAllComputedProducts);
router.get("/products/:id", fetchProduct);
router.delete("/products/:id", removeProducts);

export default router;
