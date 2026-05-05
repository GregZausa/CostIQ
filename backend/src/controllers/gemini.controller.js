import { getMarketPriceAnalysis } from "../services/gemini.services.js";
import { getProductsWithProfit } from "../models/product.model.js";

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
