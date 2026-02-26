import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";

export const usePositionAction = ({ positionForm }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      position_name: positionForm.state.positionName,
      default_rate_per_hr: positionForm.state.defaultRatePerHr,
    };

    try {
      await authFetch(`${apiUrl}/positions`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.success("Position added successfully!");
    } catch (err) {}
  };
  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/positions/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("DELETED", result);
      toast.success(`${result.position_name} deleted successfully!`);
      positionQuery.loadPosition();
    } catch (err) {}
  };
  return {
    handleSubmit,
    handleDelete,
  };
};
