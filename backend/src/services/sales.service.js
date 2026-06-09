import {
  logSale,
  getTodaySales,
  getMonthlySales,
  getSalesSummary,
  getProductSalesSummary,
  getWeeklySalesHistory,
  updateMonthlyGoal,
} from "../models/sales.model.js";
import { fetchProductService } from "./product.services.js";

export const logSaleService = async ({
  productId,
  userId,
  unitsSold,
  date,
  notes,
}) => {
  const { computedProduct: p } = await fetchProductService({
    id: productId,
    userId,
  });

  const revenue = parseFloat((unitsSold * p.finalPrice).toFixed(2));
  const profit = parseFloat((unitsSold * p.profit).toFixed(2));
  const cogs = parseFloat((unitsSold * p.totalCPP).toFixed(2));

  return await logSale({
    productId,
    userId,
    unitsSold,
    revenue,
    profit,
    cogs,
    date,
    notes,
  });
};

export const getDashboardSalesService = async (userId) => {
  const [summary, productSummary, weeklyHistory] = await Promise.all([
    getSalesSummary(userId),
    getProductSalesSummary(userId),
    getWeeklySalesHistory(userId),
  ]);
  return { summary, productSummary, weeklyHistory };
};
