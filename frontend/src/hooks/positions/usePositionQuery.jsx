import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const usePositionQuery = () => {
  const [positions, setPositions] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadPosition = useCallback(async () => {
    try {
      const urlParams = new URLSearchParams({ search, page, limit: 3 });
      const res = await authFetch(`${apiUrl}/positions?${urlParams.toString()}`);
      const result = await res.json();
      setPositions(result.positionOptions);
      setColumns(result.headers);
      setData(result.rows);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to fetch position", err);
    }
  }, [search, page]);
  useEffect(() => {
    loadPosition();
  }, [loadPosition]);

  const positionOptions = positions.map((p) => ({
    label: p.position_name,
    value: p.position_id,
  }));
  return {
    positionOptions,
    columns,
    data,
    setData,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    positions,
    loadPosition,
  };
};
