import {
  insertOtherExpense,
  updateOtherExpense,
} from "../models/other-expense.model.js";

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
