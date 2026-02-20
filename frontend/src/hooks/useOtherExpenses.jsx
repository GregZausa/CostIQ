import { useReducer } from "react";
import toast from "react-hot-toast";
import { apiUrl } from "../config/apiUrl";

const initialState = {
  categoryName: "",
  quantity: "",
  cost: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const useOtherExpenses = ({ closeModal, setIsLoading } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!state.categoryName) errors.categoryName = "Category name is required!";
    if (!state.quantity || state.quantity < 0)
      errors.quantity = "Quantity must be > 0";
    if (!state.cost || state.cost < 0) errors.cost = "Cost must be > 0";

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/other-expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_name: state.categoryName,
          quantity: state.quantity,
          cost: state.cost,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add expense");
        return;
      }
      toast.success("Expense added successfully!");
      dispatch({ type: "RESET_FORM" });
      closeModal();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return { handleChange, handleSubmit, state };
};

export default useOtherExpenses;
