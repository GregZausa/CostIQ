import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";

export const fetchMarketPriceAnalysis = async (productId) => {
  const res = await authFetch(`${apiUrl}/ai/market-price/${productId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch analysis");
  return await res.json();
};

export const fetchCostOptimization = async (productId) => {
  const res = await authFetch(`${apiUrl}/ai/cost-optimization/${productId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch analysis");
  return await res.json();
};

export const fetchSalesAnalysis = async () => {
  const res = await authFetch(`${apiUrl}/ai/sales-analysis`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch sales analysis");
  }
  return await res.json();
};
