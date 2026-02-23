import { useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const initialState = createInitialState({
  categoryName: "",
  quantity: "",
  cost: "",
});

export const useOtherExpensesForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const loadForEdit = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/other-expenses/${id}`);
      const result = await res.json();

      dispatch({
        type: "SET_FORM",
        payload: {
          categoryName: result.category_name,
          quantity: result.quantity,
          cost: result.cost,
        },
      });
    } catch (err) {}
  };
  const resetForm = () => dispatch({ type: "RESET_FORM" });
  return {
    state,
    dispatch,
    loadForEdit,
    handleChange,
    resetForm,
  };
};
