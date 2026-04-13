import { useState, useReducer, useEffect } from "react";
import { createInitialState, reducer } from "../../utils/reducer";
import { fetchRawMaterialById } from "../../services/raw-materials.api";

const initialState = createInitialState({
  materialName: "",
  packUnit: "",
  baseUnit: "",
  unitsPerPack: "",
  pricePerPack: "",
  totalUnitsPerPack: "",
  costPerUnit: "",
  multiplier: "",
});

export const useRawMaterialsForm = ({ units = [] } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [unitsPerPackEditable, setUnitsPerPackEditable] = useState(false);

  useEffect(() => {
    const selected = units.find((u) => u.pack_unit === state?.packUnit);
    if (selected) {
      if (selected) {
        const isAuto = selected.multiplier !== null;

        dispatch({
          type: "SET_FORM",
          payload: {
            baseUnit: selected.base_unit,
            multiplier: selected.multiplier,
            totalUnitsPerPack: isAuto
              ? Number(selected.multiplier) * Number(state?.unitsPerPack)
              : 0,
            unitsPerPack: isAuto ? state.unitsPerPack : "",
          },
        });
        setUnitsPerPackEditable(!isAuto);
      }
    }
  }, [state?.packUnit, state?.unitsPerPack, units]);
  useEffect(() => {
    const selected = units.find((u) => u.pack_unit === state?.packUnit);

    if (selected && selected.multiplier !== null) {
      dispatch({
        type: "UPDATE_FIELD",
        field: "totalUnitsPerPack",
        value: Number(selected.multiplier) * Number(state?.unitsPerPack),
      });
    }
  }, [state?.unitsPerPack, state?.packUnit, units]);

  useEffect(() => {
    const price = Number(state?.pricePerPack) || 0;
    const unitsCount = Number(state?.totalUnitsPerPack) || 0;
    const cost = unitsCount ? price / unitsCount : 0;
    dispatch({
      type: "UPDATE_FIELD",
      field: "costPerUnit",
      value: cost.toFixed(2),
    });
  }, [state?.pricePerPack, state?.totalUnitsPerPack]);

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
          totalUnitsPerPack: result.total_units_per_pack,
          costPerUnit: result.cost_per_unit,
          multiplier: result.multiplier,
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
