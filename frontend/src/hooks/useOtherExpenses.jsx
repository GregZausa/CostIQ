import { useReducer } from "react";

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

const useOtherExpenses = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  return { handleChange, state };
};

export default useOtherExpenses;
