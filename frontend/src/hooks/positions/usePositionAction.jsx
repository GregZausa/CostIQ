import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";
import { useState } from "react";

export const usePositionAction = ({
  positionForm,
  onSuccess,
  openPositionModal,
}) => {
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      position_name: positionForm.state.positionName,
      default_rate_per_hr: positionForm.state.defaultRatePerHr,
    };

    try {
      if (editingId !== null) {
        await authFetch(`${apiUrl}/positions/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authFetch(`${apiUrl}/positions`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      toast.success(
        editingId !== null
          ? "Position updated successfully!"
          : "Position added successfully!",
      );
      onSuccess?.();
      return;
    } catch (err) {
      toast.error("Failed to add position");
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/positions/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("DELETED", result);
      toast.success(`${result.position_name} deleted successfully!`);
      onSuccess?.();
    } catch (err) {}
  };

  const handleEdit = async (id) => {
    await positionForm.loadForEdit(id);
    setEditingId(id);
    openPositionModal("add");
  };
  return {
    handleEdit,
    handleSubmit,
    handleDelete,
  };
};
