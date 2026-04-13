import toast from "react-hot-toast";
import { useState } from "react";
import {
  addRawMaterials,
  deleteRawMaterial,
} from "../../services/raw-materials.api";

export const useRawMaterialsAction = ({
  form,
  query,
  onSuccess,
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
    setIsLoading(true);

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
      multiplier: form.state.multiplier,
    };

    try {
      await addRawMaterials({ editingId, payload });
      toast.success(
        editingId
          ? `${form.state.materialName} updated successfully!`
          : `${form.state.materialName} added successfully!`,
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
      const result = await deleteRawMaterial({ id });
      const materialName = result.material_name || 'Raw Material';
      console.log("Deleted", result);
      toast.success(`${materialName} is deleted successfully!`);
      query.load();
      query.setPage(1);
      return;
    } catch (err) {
      toast.error("Failed to deleted raw material");
    }
  };
  return {
    handleSubmit,
    handleDelete,
    setEditingId,
    editingId,
    handleEdit,
  };
};
