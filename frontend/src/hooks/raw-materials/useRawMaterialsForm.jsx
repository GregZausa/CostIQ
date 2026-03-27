import { useState, useReducer, useEffect } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { fetchRawMaterialById } from "../../services/raw-materials.api";

const initialState = createInitialState({
  materialName: "",
  packUnit: "",
  baseUnit: "",
  unitsPerPack: "",
  pricePerPack: "",
  costPerUnit: "",
  errors: {},
});

export const useRawMaterialsForm = ({ units = [] } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [unitsPerPackEditable, setUnitsPerPackEditable] = useState(false);

  useEffect(() => {
    const selected = units.find((u) => u.pack_unit === state?.packUnit);
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
  }, [state?.packUnit, units]);

  useEffect(() => {
    const price = Number(state?.pricePerPack) || 0;
    const unitsCount = Number(state?.unitsPerPack) || 0;
    const cost = unitsCount ? price / unitsCount : 0;
    dispatch({
      type: "UPDATE_FIELD",
      field: "costPerUnit",
      value: cost.toFixed(2),
    });
  }, [state?.pricePerPack, state?.unitsPerPack]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  const loadForEdit = async (id) => {
    try {
      const result = await fetchRawMaterialById({ id });
      dispatch({
        type: "SET_FORM",
        payload: {
          materialName: result.material_name,
          packUnit: result.pack_unit,
          baseUnit: result.base_unit,
          unitsPerPack: result.units_per_pack,
          pricePerPack: result.price_per_pack,
          costPerUnit: result.cost_per_unit,
        },
      });
    } catch (err) {}
  };
  const resetForm = () => dispatch({ type: "RESET_FORM" });
  return {
    state,
    handleChange,
    loadForEdit,
    dispatch,
    resetForm,
    unitsPerPackEditable,
  };
};
