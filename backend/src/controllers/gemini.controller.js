import {
  getCostOptimizationSuggestions,
  getMarketPriceAnalysis,
} from "../services/gemini.services.js";
import { getProductsWithProfit } from "../models/product.model.js";
import { checkAndConsumeToken, getTokenStatus } from "../models/ad.model.js";

export const analyzeMarketPrice = async (req, res) => {
  try {
    const { productId } = req.params;
    const allProducts = await getProductsWithProfit(req.user.id);
    const product = allProducts.find(
      (p) => String(p.product_id) === String(productId),
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    const analysis = await getMarketPriceAnalysis(product);
    res.json(analysis);
  } catch (err) {
    console.error("FULL ERROR:", err);
    res
      .status(500)
      .json({ message: "Failed to analyze market price", error: err.message });
  }
};

export const analyzeCostOptimization = async (req, res) => {
  try {
    const tokenInfo = await checkAndConsumeToken(req.user.id);
    const { productId } = req.params;
    const allProducts = await getProductsWithProfit(req.user.id);
    const product = allProducts.find(
      (p) => String(p.product_id) === String(productId),
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    const analysis = await getCostOptimizationSuggestions(product);
    res.json({ ...analysis, tokenInfo });
  } catch (err) {
    console.error("FULL ERROR: ", err);
    const status = err.message.includes("token limit") ? 429 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const fetchTokenStatus = async (req, res) => {
  try {
    const status = await getTokenStatus(req.user.id);
    res.json(status);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
