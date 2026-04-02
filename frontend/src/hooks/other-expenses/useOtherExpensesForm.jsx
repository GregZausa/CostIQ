import { useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { fetchOtherExpensesById } from "../../services/other-expenses.api";

const initialState = createInitialState({
  categoryName: "",
  cost: "",
  expenseType: "",
});

export const useOtherExpensesForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const loadForEdit = async (id) => {
    try {
      const result = await fetchOtherExpensesById({ id });
      dispatch({
        type: "SET_FORM",
        payload: {
          categoryName: result.category_name,
          cost: result.expense_cost,
          expenseType: result.expense_type,
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
