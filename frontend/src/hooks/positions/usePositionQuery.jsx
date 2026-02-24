import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const usePositionQuery = () => {
  const [positions, setPositions] = useState([]);

  const loadPosition = useCallback(async () => {
    try {
      const res = await authFetch(`${apiUrl}/positions`);
      const data = await res.json();
      setPositions(data);
    } catch (err) {
      console.error("Failed to fetch position", err);
    }
  },[]);
  useEffect(() => {
    loadPosition();
  }, [loadPosition]);
  return {
    positions,
    loadPosition,
  };
};
