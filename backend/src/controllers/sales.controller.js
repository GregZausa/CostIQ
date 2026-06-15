import {
  logSaleService,
  getDashboardSalesService,
  getSalesHistoryService,
} from "../services/sales.service.js";
import {
  getTodaySales,
  getMonthlySales,
  updateMonthlyGoal,
} from "../models/sales.model.js";

export const logSaleController = async (req, res) => {
  try {
    const { productId, unitsSold, date, notes } = req.body;
    if (!productId || !unitsSold)
      return res
        .status(400)
        .json({ message: "Product and units sold are required." });

    const sale = await logSaleService({
      productId,
      userId: req.user.id,
      unitsSold: parseInt(unitsSold),
      date,
      notes,
    });
    res.status(201).json({ message: "Sale logged!", sale });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardSalesController = async (req, res) => {
  try {
    const data = await getDashboardSalesService(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTodaySalesController = async (req, res) => {
  try {
    const sales = await getTodaySales(req.user.id);
    res.json({ sales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMonthlySalesController = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const month = req.query.month || new Date().getMonth() + 1;
    const sales = await getMonthlySales(req.user.id, year, month);
    res.json({ sales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGoalController = async (req, res) => {
  try {
    const { goal } = req.body;
    await updateMonthlyGoal(req.user.id, goal);
    res.json({ message: "Goal updated!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSalesHistoryController = async (req, res) => {
  try {
    const history = await getSalesHistoryService({
      userId: req.user.id,
      isPremium: req.user.is_premium,
    });
    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};