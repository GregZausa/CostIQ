import {
  deleteOtherExpense,
  getOtherExpenses,
  getOtherExpensesById,
  getOtherExpensesCount,
  getOtherExpensesTotalCount,
  insertOtherExpense,
  updateOtherExpense,
} from "../models/other-expense.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createOtherExpenseSevice = async ({ userId, body }) => {
  const { category_name, cost } = body;
  return await insertOtherExpense({ category_name, cost, created_by: userId });
};

export const editOtherExpenseService = async ({ userId, id, body }) => {
  const { category_name, cost } = body;
  const updated = await updateOtherExpense(category_name, cost, userId, id);

  if (!updated) throw new Error("Expenses not found!");

  return updated;
};

export const fetchOtherExpensesService = async (req) => {
  const { page, limit, offset, searchTerm, createdBy } =
    getPaginationParams(req);

  const [rows, totalRows, totalAllRows] = await Promise.all([
    getOtherExpenses(createdBy, searchTerm, limit, offset),
    getOtherExpensesCount(createdBy, searchTerm),
    getOtherExpensesTotalCount(createdBy),
  ]);
  const totalPages = Math.ceil(totalAllRows / limit);

  return {
    rows,
    page,
    totalPages,
    totalRows,
    totalAllRows,
  };
};

export const fetchOtherExpensesByIdService = async ({ userId, id }) => {
  const expense = await getOtherExpensesById(userId, id);
  if (!expense) throw new Error("Expense not found!");
  return expense;
};

export const removeOtherExpenseService = async (id) => {
  const deleted = await deleteOtherExpense(id);
  if (!deleted) throw new Error("Expense not found!");
  return deleted;
};
