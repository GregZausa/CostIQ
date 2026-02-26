import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const usePositionQuery = () => {
  const [positions, setPositions] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const loadPosition = useCallback(async () => {
    try {
      const res = await authFetch(`${apiUrl}/positions`);
      const result = await res.json();
      setPositions(result.positionOptions);
      setColumns(result.headers);
      setData(result.rows);
    } catch (err) {
      console.error("Failed to fetch position", err);
    }
  }, [apiUrl]);
  useEffect(() => {
    loadPosition();
  }, [loadPosition]);
  return {
    columns,
    data,
    positions,
    loadPosition,
  };
};
