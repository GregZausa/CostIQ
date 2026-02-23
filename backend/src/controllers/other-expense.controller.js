import {
  deleteOtherExpense,
  getOtherExpenses,
  getOtherExpensesById,
  insertOtherExpense,
} from "../models/other-expense.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createOtherExpense = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { category_name, quantity, cost } = req.body;

    const otherExpense = await insertOtherExpense({
      category_name,
      quantity,
      cost,
      created_by: createdBy,
    });
    res
      .status(201)
      .json({ message: "Expense added successfully!", otherExpense });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const fetchOtherExpenses = async (req, res) => {
  try {
    const { page, limit, offset, searchTerm, createdBy } =
      getPaginationParams(req);
    const otherExpenses = await getOtherExpenses(
      createdBy,
      searchTerm,
      limit,
      offset,
      page,
    );
    res.json(otherExpenses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch other expenses", error: err.message });
  }
};

export const fetchOtherExpensesById = async (req, res) => {
  try {
    const createdBy = req.user.id;
    const { id } = req.params;

    const otherExpense = await getOtherExpensesById(createdBy, id);

    if (!otherExpense) {
      res.status(404).json({ message: "Expense not found" });
    }
    res.json(otherExpense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch expense", error: err.message });
  }
};

export const removeOtherExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const otherExpense = await deleteOtherExpense(id);
    if (!otherExpense) {
      res.status(404).json({ message: "Expense not found" });
    }
    res.json(otherExpense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete expense", error: err.message });
  }
};
