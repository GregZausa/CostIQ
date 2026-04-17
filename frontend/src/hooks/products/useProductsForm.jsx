import { useCallback, useEffect, useMemo, useReducer } from "react";
import { createInitialState, reducer } from "../../utils/reducer";

const initialState = createInitialState({
  productName: "",
  batchPerDay: "",
  productImage: "",
  totalInput: "",
  unitsPerProduct: "",
  totalSellableUnits: "",
  profitMargin: "",
  discount: "",
  salesTax: "",
  directMaterials: {},
  employees: {},
  otherExpenses: {},
  errors: {},
});

export const useProductsForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  }, []);
  const totalSellableUnits = useMemo(() => {
    const totalInput = Number(state?.totalInput) || 0;
    const unitsPerProduct = Number(state?.unitsPerProduct) || 0;
    return totalInput && unitsPerProduct
      ? Math.floor(totalInput / unitsPerProduct)
      : 0;
  }, [state?.totalInput, state?.unitsPerProduct]);
  return {
    state: { ...state, totalSellableUnits },
    handleChange,
  };
};
