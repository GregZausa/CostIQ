import { useEffect, useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { fetchEmployeesById } from "../../services/employees.api";

const initialState = createInitialState({
  employeeFirstName: "",
  employeeLastName: "",
  position: "",
  ratePerDay: "",
});

export const useEmployeeForm = ({ positions = [] } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const selected = positions.find((p) => p.position_id === state?.position);
    if (selected) {
      dispatch({
        type: "UPDATE_FIELD",
        field: "ratePerDay",
        value: selected.default_rate_per_day,
      });
    }
  }, [state?.position, positions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const loadForEdit = async (id) => {
    try {
      const result = await fetchEmployeesById({ id });
      dispatch({
        type: "SET_FORM",
        payload: {
          employeeFirstName: result.first_name,
          employeeLastName: result.last_name,
          position: result.position_id,
          ratePerDay: result.rate_per_day,
        },
      });
    } catch (err) {}
  };
  const resetForm = () => dispatch({ type: "RESET_FORM" });
  return {
    handleChange,
    state,
    loadForEdit,
    dispatch,
    resetForm,
  };
};
