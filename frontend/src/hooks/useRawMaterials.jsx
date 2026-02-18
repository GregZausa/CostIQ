import React, { useReducer, useState, useEffect, useMemo } from "react";
import { apiUrl } from "../config/apiUrl.js";
import toast from "react-hot-toast";
import useUnits from "./useUnits";

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

const useRawMaterials = (closeModal, openModal) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [unitsPerPackEditable, setUnitsPerPackEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState();

  const { units } = useUnits();

  //useEffects
  useEffect(() => {
    loadRawMaterials();
  }, [page, search, selectedUnit]);
  useEffect(() => {
    setPage(1);
  }, [search, selectedUnit]);
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
    const units = Number(state.unitsPerPack) || 0;
    const cost = units ? price / units : 0;
    dispatch({
      type: "UPDATE_FIELD",
      field: "costPerUnit",
      value: cost.toFixed(2),
    });
  }, [state.pricePerPack, state.unitsPerPack]);

  //handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  const loadRawMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      const urlParams = new URLSearchParams({ search, page, limit: 8 });
      if (selectedUnit) urlParams.append("packUnit", selectedUnit);
      const res = await fetch(
        `${apiUrl}/raw-materials?${urlParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();

      setColumns(result.headers);
      setData(result.rows);
      setTotalPages(result.totalPages);
      setPage(result.page);
    } catch (err) {
      console.error("Failed to load raw material", err);
    }
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
      const res = await fetch(`${apiUrl}/raw-materials`, {
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
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to add raw materials");
        return;
      }
      toast.success("Raw material added successfully!");
      dispatch({ type: "RESET_FORM" });
      closeModal();
      loadRawMaterials();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/raw-materials/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();

      dispatch({
        type: "UPDATE_FIELD",
        field: "materialName",
        value: result.material_name,
      });
      dispatch({
        type: "UPDATE_FIELD",
        field: "packUnit",
        value: result.pack_unit,
      });
      dispatch({
        type: "UPDATE_FIELD",
        field: "baseUnit",
        value: result.base_unit,
      });
      dispatch({
        type: "UPDATE_FIELD",
        field: "unitsPerPack",
        value: result.units_per_pack,
      });
      dispatch({
        type: "UPDATE_FIELD",
        field: "pricePerPack",
        value: result.price_per_pack,
      });
      dispatch({
        type: "UPDATE_FIELD",
        field: "costPerUnit",
        value: result.cost_per_unit,
      });

      openModal(id);
    } catch (err) {
      console.error("Failed to get raw material", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/raw-materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log("Deleted", result);
      loadRawMaterials();
    } catch (err) {
      console.error("Failed to delete raw material", err);
    }
  };

  const totalRawMaterials = useMemo(() => data.length, [data]);
  const mostExpensiveMaterial = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.reduce((max, current) => {
      return Number(current.cost_per_unit) > Number(max.cost_per_unit)
        ? current
        : max;
    });
  }, [data]);
  return {
    mostExpensiveMaterial,
    totalRawMaterials,
    columns,
    data,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    selectedUnit,
    setSelectedUnit,
    state,
    loadRawMaterials,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    unitsPerPackEditable,
    isLoading,
  };
};

export default useRawMaterials;
