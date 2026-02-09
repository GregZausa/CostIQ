import React, { useEffect, useReducer } from "react";
import Button from "../ui/Button";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import toast from "react-hot-toast";

const initialState = {
  materialName: "",
  pricePerPack: 0,
  packageQty: 0,
  unitsPerPack: 0,
  unit: "",
  costPerUnit: 0,
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
const AddRawMaterialModal = ({ closeModal, onSave }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const price = Number(state.pricePerPack) || 0;
    const qty = Number(state.packageQty) || 0;
    const cost = qty ? price / qty : 0;
    dispatch({ type: "UPDATE_FIELD", field: "costPerUnit", value: cost });
  }, [state.pricePerPack, state.packageQty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!state.materialName) errors.materialName = "Material name required!";
    //if (!state.pricePerPack) errors.pricePerPack = "Price per pack must be > 0";
    //if (!state.packageQty) errors.packageQty = "Package quantity must be > 0";

    if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((msg) => toast.error(msg));
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    onSave(state);
    dispatch({ type: "RESET_FORM" });
    closeModal();
  };
  return (
    <>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="fixed top-1/2 left-1/2 z-60 w-96 max-w-full bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6">
        <h1 className="text-xl font-bold mb-4">Add Raw Products</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FloatingLabelInput
            onChange={(val) =>
              handleChange({ target: { name: "materialName", value: val } })
            }
            name="materialName"
            type="text"
            value={state.materialName}
            label="Material Name"
          />

          <div className="flex justify-end space-x-4">
            <Button label="Save" onClick={handleSubmit}/>
            <Button onClick={closeModal} label="Cancel" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRawMaterialModal;
