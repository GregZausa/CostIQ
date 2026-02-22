import toast from "react-hot-toast";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import { useState } from "react";

export const useRawMaterialsAction = ({
  form,
  query,
  closeModal,
  openModal,
  setIsLoading,
}) => {
  const [editingId, setEditingId] = useState(null);
  const validate = (state) => {
    const errors = {};
    if (!state.materialName) errors.materialName = "Material name required";
    if (!state.pricePerPack || Number(state.pricePerPack) <= 0)
      errors.pricePerPack = "Price per pack must be > 0";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(form.state);
    if (Object.keys(errors).length) {
      form.dispatch({ type: "SET_ERRORS", errors });
      Object.values(errors).forEach((msg) => toast.error(msg));
      setIsLoading(false);
      return;
    }
    const payload = {
      material_name: form.state.materialName,
      pack_unit: form.state.packUnit,
      base_unit: form.state.baseUnit,
      units_per_pack: form.state.unitsPerPack,
      price_per_pack: form.state.pricePerPack,
    };

    try {
      setIsLoading(true);
      if (editingId != null) {
        await authFetch(`${apiUrl}/raw-materials/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authFetch(`${apiUrl}/raw-materials`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      toast.success(
        editingId
          ? `${form.state.materialName} updated successfully!`
          : `${form.state.materialName} added successfully!`,
      );
      form.resetForm();
      closeModal();
      setEditingId(null);
      query.setPage(1);
      query.load();
      return;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = async (id) => {
    await form.loadForEdit(id);
    openModal();
    setEditingId(id);

  };
  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/raw-materials/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("Deleted", result);
      toast.success(`${result.material_name} is deleted successfully!`);
      query.load();
      query.setPage(1);
      return;
    } catch (err) {
      toast.error("Failed to deleted raw material");
      console.log("Failed to delete raw material", err);
    }
  };
  return {
    handleSubmit,
    handleDelete,
    handleEdit,
  };
};
