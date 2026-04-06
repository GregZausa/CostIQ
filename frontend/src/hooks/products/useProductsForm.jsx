import { useEffect, useReducer } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });

    console.log(state);
  };
  useEffect(() => {
    const totalInput = Number(state?.totalInput) || 0;
    const unitsPerProduct = Number(state?.unitsPerProduct) || 0;
    const totalSellable = totalInput && unitsPerProduct ? totalInput / unitsPerProduct : 0;
    dispatch({
      type: "UPDATE_FIELD",
      field: "totalSellableUnits",
      value: Math.floor(totalSellable),
    });
  }, [state?.totalInput, state?.unitsPerProduct]);
  return {
    state,
    handleChange,
  };
};
