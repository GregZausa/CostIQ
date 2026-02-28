import { useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const initialState = createInitialState({
  positionName: "",
  defaultRatePerHr: "",
  errors: {},
});

export const usePositionForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const loadForEdit = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/positions/${id}`);
      const result = await res.json();
      dispatch({
        type: "SET_FORM",
        payload: {
          positionName: result.position_name,
          defaultRatePerHr: result.default_rate_per_hr,
        },
      });
    } catch (err) {}
  };
  const resetForm = () => dispatch({ type: "RESET_FORM" });

  return {
    handleChange,
    loadForEdit,
    resetForm,
    state,
  };
};
