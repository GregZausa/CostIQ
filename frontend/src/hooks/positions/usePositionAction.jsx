import toast from "react-hot-toast";
import { useState } from "react";
import { addPositions, deletePosition } from "../../services/positions.api";

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
      default_rate_per_day: positionForm.state.defaultRatePerDay,
    };

    try {
      await addPositions({ editingId, payload });
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
      const result = await deletePosition({ id });
      const positionName = result.position_name || "Position";
      toast.success(`${positionName} deleted successfully!`);
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
    setEditingId,
  };
};
