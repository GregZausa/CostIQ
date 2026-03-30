import {
  deleteOtherExpense,
  getOtherExpenses,
  getOtherExpensesById,
  insertOtherExpense,
  updateOtherExpense,
} from "../models/other-expense.model.js";
import {
  createOtherExpenseSevice,
  editOtherExpenseService,
  fetchOtherExpensesByIdService,
  fetchOtherExpensesService,
  removeOtherExpenseService,
} from "../services/other-expense.services.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createOtherExpense = async (req, res) => {
  try {
    const otherExpense = await createOtherExpenseSevice({
      userId: req.user.id,
      body: req.body,
    });
    res
      .status(201)
      .json({ message: "Expense added successfully!", otherExpense });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add expense", error: err.message });
  }
};

export const editOtherExpense = async (req, res) => {
  try {
    const data = await editOtherExpenseService({
      userId: req.user.id,
      id: req.params.id,
      body: req.body,
    });
    res.status(200).json({ message: "Expense updated successfully!", data });
  } catch (err) {
    res;
    const status = err.message === "Expenses not found!" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const fetchOtherExpenses = async (req, res) => {
  try {
    const result = await fetchOtherExpensesService(req);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch expenses", error: err.message });
  }
};

export const fetchOtherExpensesById = async (req, res) => {
  try {
    const expense = await fetchOtherExpensesByIdService({
      userId: req.user.id,
      id: req.params.id,
    });
    res.json(expense);
  } catch (err) {
    const status = err.message === "Expense not found!" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeOtherExpense = async (req, res) => {
  try {
    const deleted = await removeOtherExpenseService(req.params.id);
    res.json(deleted);
  } catch (err) {
    const status = err.message === "Expense not found!" ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};
