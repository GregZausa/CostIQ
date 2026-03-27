import toast from "react-hot-toast";
import { useState } from "react";
import { addEmployees, deleteEmployee } from "../../services/employees.api";

export const useEmployeeAction = ({
  form,
  query,
  onSuccess,
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

    if (!state.position) errors.position = "Position is required!";

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
    const payload = {
      last_name: form.state.employeeLastName,
      first_name: form.state.employeeFirstName,
      position: form.state.position,
      rate_per_hr: form.state.ratePerHr,
    };

    try {
      setIsLoading(true);
      await addEmployees({ editingId, payload });
      toast.success(
        editingId
          ? `Employee ${form.state.employeeFirstName} ${form.state.employeeLastName} added succesfully`
          : `Employee ${form.state.employeeFirstName} ${form.state.employeeLastName} added successfully!`,
      );
      query.setPage(1);
      onSuccess?.();
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await deleteEmployee({ id });
      const employeeName =
        `${result.first_name} ${result.last_name}` || "Employee";
      toast.success(`${employeeName}'s credential deleted successfully!`);
      query.setPage(1);
      query.load();
      return;
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };
  const handleEdit = async (id) => {
    await form.loadForEdit(id);
    setEditingId(id);
    openModal();
  };
  return {
    editingId,
    setEditingId,
    handleDelete,
    handleSubmit,
    handleEdit,
  };
};
