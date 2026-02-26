import { useEffect, useMemo, useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const initialState = createInitialState({
  employeeFirstName: "",
  employeeLastName: "",
  position: "",
  ratePerHr: "",
});

export const useEmployeeForm = ({ positions = [] } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const selected = positions.find(
      (p) => p.position_id === state?.position,
    );
    if (selected) {
      dispatch({
        type: "UPDATE_FIELD",
        field: "ratePerHr",
        value: selected.default_rate_per_hr,
      });
    }
  }, [state?.position, positions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const loadForEdit = async (id) => {
    try {
      const res = await authFetch(`${apiUrl}/employees/${id}`);
      const result = await res.json();
      dispatch({
        type: "SET_FORM",
        payload: {
          employeeFirstName: result.first_name,
          employeeLastName: result.last_name,
          ratePerHr: result.rate_per_hr,
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
