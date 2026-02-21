import toast from "react-hot-toast";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useRawMaterialsAction = ({
  form,
  query,
  closeModal,
  setIsLoading,
}) => {
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
    try {
      setIsLoading(true);
      const res = await authFetch(`${apiUrl}/raw-materials`, {
        method: "POST",
        body: JSON.stringify({
          material_name: form.state.materialName,
          pack_unit: form.state.packUnit,
          base_unit: form.state.baseUnit,
          units_per_pack: form.state.unitsPerPack,
          price_per_pack: form.state.pricePerPack,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add raw material");
        return;
      }
      toast.success("Raw material added successfully!");
      form.resetForm();
      closeModal();
      query.setPage(1);
      query.load();
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
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
  };
};
