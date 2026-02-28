import toast from "react-hot-toast";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useState } from "react";

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
    if (!state.quantity || state.quantity < 0)
      errors.quantity = "Quantity must be > 0";
    if (!state.cost || state.cost < 0) errors.cost = "Cost must be > 0";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(form.state);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      setIsLoading(false);
      return;
    }
    const payload = {
      category_name: form.state.categoryName,
      quantity: form.state.quantity,
      cost: form.state.cost,
    };
    try {
      setIsLoading(true);
      if (editingId !== null) {
        await authFetch(`${apiUrl}/other-expenses/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authFetch(`${apiUrl}/other-expenses`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
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
      const res = await authFetch(`${apiUrl}/other-expenses/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("DELETED", result);
      toast.success(`${result.category_name} deleted sucessfully!`);
      query.load();
      return;
    } catch (err) {
      console.error(`Failed to delete ${result.category_name}`, err);
      toast.error(`Failed to delete ${result.category_name}`);
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
