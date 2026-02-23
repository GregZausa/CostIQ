import toast from "react-hot-toast";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useState } from "react";

export const useEmployeeAction = ({
  form,
  query,
  closeModal,
  openModal,
  setIsLoading,
}) => {
  const [editingId, setEditingId] = useState(null);
  const validate = (state) => {
    const errors = {};
    if (!state.employeeFirstName)
      errors.employeeFirstName = "Employee first name is required!";

    if (!state.employeeLastName)
      errors.employeeLastName = "Employee last name is required!";

    if (!state.ratePerHr) errors.ratePerHr = "Rate per hour is required!";
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
      const res = await authFetch(`${apiUrl}/employees`, {
        method: "POST",
        body: JSON.stringify({
          last_name: form.state.employeeLastName,
          first_name: form.state.employeeFirstName,
          rate_per_hr: form.state.ratePerHr,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add employee");
        return;
      }
      toast.success(
        `Employee ${form.state.employeeFirstName} ${form.state.employeeLastName} added successfully!`,
      );
      form.resetForm();
      closeModal();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/employees/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("Employee deleted", result);
      toast.success(
        `${result.first_name} ${result.last_name}'s credential deleted successfully!`,
      );
      query.setPage(1);
      query.load();
      return;
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };
  const handleEdit = async (id) => {
    await form.loadForEdit(id);
    openModal();
    setEditingId(id);
  }
  return {
    handleDelete,
    handleSubmit,
    handleEdit,
  };
};
