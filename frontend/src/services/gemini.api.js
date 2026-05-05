import { apiUrl } from "../config/apiUrl"
import { authFetch } from "../utils/authFetch"

export const fetchMarketPriceAnalysis = async (productId) => {
  const res = await authFetch(`${apiUrl}/ai/market-price/${productId}`, {
    method: "GET",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch analysis")
  return await res.json()
}