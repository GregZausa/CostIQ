import toast from "react-hot-toast";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useOtherExpensesAction = ({
  form,
  query,
  setIsLoading,
  closeModal,
}) => {
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
    try {
      setIsLoading(true);
      const res = await authFetch(`${apiUrl}/other-expenses`, {
        method: "POST",
        body: JSON.stringify({
          category_name: form.state.categoryName,
          quantity: form.state.quantity,
          cost: form.state.cost,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add expense");
        return;
      }
      toast.success(`${form.state.categoryName} added successfully!`);
      form.resetForm();
      closeModal();
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
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
    handleDelete,
    handleSubmit,
  };
};
