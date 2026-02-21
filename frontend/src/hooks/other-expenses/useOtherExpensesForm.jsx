import { useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";

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
  const resetForm = () => dispatch({ type: "RESET_FORM" });
  return {
    state,
    dispatch,
    handleChange,
    resetForm,
  };
};
