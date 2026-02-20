import { insertOtherExpense } from "../models/other-expense.model.js";

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
