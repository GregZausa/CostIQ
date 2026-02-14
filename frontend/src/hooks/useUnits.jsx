import { useEffect, useState } from "react";
import { apiUrl } from "../config/apiUrl.js";

const useUnits = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const res = await fetch(`${apiUrl}/units`);
        const data = await res.json();
        setUnits(data);
      } catch (err) {
        console.error("Failed to fetch units", err);
      }
    };
    loadUnits();
  }, []);
  const unitOptions = units.map((unit) => ({
    label: unit.pack_unit.toUpperCase(),
    value: unit.pack_unit,
  }));

  const unitOptionsWithAll = [{ label: "All Pack Unit", value: "" }, ...unitOptions];

  return {
    units,
    unitOptions,
    unitOptionsWithAll,
  };
};

export default useUnits;
