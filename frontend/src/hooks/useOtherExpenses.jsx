import { useReducer } from "react";

const initialState = {
  employeeFirstName: "",
  employeeLastName: "",
  ratePerHr: 0,
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

  return {};
};

export default useOtherExpenses;
