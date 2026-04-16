import { useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { fetchPositionsById } from "../../services/positions.api";

const initialState = createInitialState({
  positionName: "",
  defaultRatePerDay: "",
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
      const result = await fetchPositionsById({ id });
      dispatch({
        type: "SET_FORM",
        payload: {
          positionName: result.position_name,
          defaultRatePerDay: result.default_rate_per_day,
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
