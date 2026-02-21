import { useState, useReducer, useEffect } from "react";

const initialState = {
  materialName: "",
  packUnit: "",
  baseUnit: "",
  unitsPerPack: "",
  pricePerPack: "",
  costPerUnit: "",
  errors: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FORM":
      return { ...state, ...action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export const useRawMaterialsForm = ({ units = [] } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [unitsPerPackEditable, setUnitsPerPackEditable] = useState(false);

  useEffect(() => {
    const selected = units.find((u) => u.pack_unit === state.packUnit);
    if (selected) {
      dispatch({
        type: "UPDATE_FIELD",
        field: "baseUnit",
        value: selected.base_unit,
      });
      if (selected.multiplier !== null) {
        dispatch({
          type: "UPDATE_FIELD",
          field: "unitsPerPack",
          value: selected.multiplier,
        });
        setUnitsPerPackEditable(false);
      } else {
        dispatch({
          type: "UPDATE_FIELD",
          field: "unitsPerPack",
          value: "",
        });
        setUnitsPerPackEditable(true);
      }
    }
  }, [state.packUnit, units]);

  useEffect(() => {
    const price = Number(state.pricePerPack) || 0;
    const unitsCount = Number(state.unitsPerPack) || 0;
    const cost = unitsCount ? price / unitsCount : 0;
    dispatch({
      type: "UPDATE_FIELD",
      field: "costPerUnit",
      value: cost.toFixed(2),
    });
  }, [state.pricePerPack, state.unitsPerPack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  const resetForm = () => dispatch({ type: "RESET_FORM" });
  return {
    state,
    handleChange,
    dispatch,
    resetForm,
    unitsPerPackEditable,
  };
};
