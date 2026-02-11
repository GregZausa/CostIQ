import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import AddRawMaterialsForm from "../forms/AddRawMaterialsForm";

const initialState = {
  materialName: "",
  packUnit: "",
  baseUnit: "",
  unitsPerPack: 0,
  pricePerPack: 0,
  costPerUnit: "",
  errors: {},
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
const AddRawMaterialModal = ({ closeModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [packUnits, setPackUnits] = useState([]);
  const [unitsPerPackEditable, setUnitsPerPackEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/units");
        const data = await res.json();
        setPackUnits(data);
      } catch (err) {
        console.error("Failed to fetch units", err);
      }
    };
    loadUnits();
  }, []);

  useEffect(() => {
    const selected = packUnits.find((u) => u.pack_unit === state.packUnit);
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
      } else {
        dispatch({
          type: "UPDATE_FIELD",
          field: "unitsPerPack",
          value: "",
        });
        setUnitsPerPackEditable(true);
      }
    }
  }, [state.packUnit, packUnits]);

  useEffect(() => {
    const price = Number(state.pricePerPack) || 0;
    const units = Number(state.unitsPerPack) || 0;
    const cost = units ? price / units : 0;
    dispatch({ type: "UPDATE_FIELD", field: "costPerUnit", value: cost });
  }, [state.pricePerPack, state.unitsPerPack]);

  const unitOptions = packUnits.map((unit) => ({
    label: unit.pack_unit.toUpperCase(),
    value: unit.pack_unit,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!state.materialName) errors.materialName = "Material name required!";
    if (!state.pricePerPack) errors.pricePerPack = "Price per pack must be > 0";

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/add-raw-materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          material_name: state.materialName,
          pack_unit: state.packUnit,
          base_unit: state.baseUnit,
          units_per_pack: state.unitsPerPack,
          price_per_pack: state.pricePerPack,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to add raw materials");
        return;
      }
      toast.success("Raw material added successfully!");
      dispatch({ type: "RESET_FORM" });
      closeModal();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="fixed top-1/2 left-1/2 z-60 w-96 max-w-full bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6">
        <h1 className="text-xl font-bold mb-4">Add Raw Products</h1>
        <AddRawMaterialsForm
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          unitsPerPackEditable={unitsPerPackEditable}
          closeModal={closeModal}
          unitOptions={unitOptions}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default AddRawMaterialModal;
