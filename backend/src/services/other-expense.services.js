import {
  deleteOtherExpense,
  getmostUsedExepnse,
  getOtherExpenses,
  getOtherExpensesById,
  getOtherExpensesCount,
  getOtherExpensesTotalCount,
  insertOtherExpense,
  updateOtherExpense,
} from "../models/other-expense.model.js";
import { getPaginationParams } from "../utils/pagination.js";

export const createOtherExpenseSevice = async ({ userId, body }) => {
  const { category_name, cost, expense_type } = body;
  return await insertOtherExpense({ category_name, cost, expense_type, created_by: userId });
};

export const editOtherExpenseService = async ({ userId, id, body }) => {
  const { category_name, cost, expense_type, } = body;
  const updated = await updateOtherExpense(category_name, cost, expense_type, userId, id);

  if (!updated) throw new Error("Expenses not found!");

  return updated;
};

export const fetchOtherExpensesService = async (req) => {
  const { page, limit, offset, searchTerm, createdBy } =
    getPaginationParams(req);

  const [rows, totalRows, totalAllRows, mostUsedExpense] = await Promise.all([
    getOtherExpenses(createdBy, searchTerm, limit, offset),
    getOtherExpensesCount(createdBy, searchTerm),
    getOtherExpensesTotalCount(createdBy),
    getmostUsedExepnse(createdBy),
  ]);
  const totalPages = Math.ceil(totalAllRows / limit);

  return {
    rows,
    page,
    totalPages,
    totalRows,
    totalAllRows,
    mostUsedExpense,
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
