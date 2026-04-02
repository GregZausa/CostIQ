import toast from "react-hot-toast";
import { useState } from "react";
import {
  addOtherExpenses,
  deleteOtherExpenses,
} from "../../services/other-expenses.api";

export const useOtherExpensesAction = ({
  form,
  query,
  setIsLoading,
  onSuccess,
  openModal,
}) => {
  const [editingId, setEditingId] = useState(null);
  const validate = (state) => {
    const errors = {};
    if (!state.categoryName) errors.categoryName = "Category name is required!";
    if (!state.cost || state.cost < 0) errors.cost = "Cost must be > 0";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validate(form.state);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      setIsLoading(false);
      return;
    }
    const payload = {
      category_name: form.state.categoryName,
      cost: form.state.cost,
      expense_type: form.state.expenseType,
    };
    try {
      await addOtherExpenses({ editingId, payload });
      toast.success(
        editingId
          ? `${form.state.categoryName} updated successfully!`
          : `${form.state.categoryName} added successfully!`,
      );
      query.setPage(1);
      onSuccess?.();
      return;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = async (id) => {
    await form.loadForEdit(id);
    setEditingId(id);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteOtherExpenses({ id });
      const expensesName = result.category_name || "Expense";
      toast.success(`${expensesName} deleted sucessfully!`);
      query.load();
      return;
    } catch (err) {
      toast.error(`Failed to delete ${expensesName}`);
    }
  };
  return {
    editingId,
    setEditingId,
    handleDelete,
    handleSubmit,
    handleEdit,
  };
};
