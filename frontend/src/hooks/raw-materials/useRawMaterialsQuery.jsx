import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useRawMaterialsQuery = () => {
  const [data, setData] = useState([]);
  const [mostExpensive, setMostExpensive] = useState(0);
  const [leastExpensive, setLeastExpensive] = useState(0);
  const [totalAllRows, setTotalAllRows] = useState(0);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(1);

  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState();

  const load = useCallback(async () => {
    const urlParams = new URLSearchParams({ search, page, limit: 8 });
    if (selectedUnit) urlParams.append("packUnit", selectedUnit);
    try {
      const res = await authFetch(
        `${apiUrl}/raw-materials?${urlParams.toString()}`,
      );
      const result = await res.json();

      const rows = result.rows ?? [];

      setData(rows);
      if (rows.length > 0) setColumns(Object.keys(rows[0]));
      setTotalAllRows(result.totalAllRows);
      setMostExpensive(result.mostExpensive);
      setLeastExpensive(result.leastExpensive);
      setTotalRows(result.totalRows);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error(err);
    }
  }, [search, page, selectedUnit]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedUnit]);

  return {
    data,
    setData,
    columns,
    page,
    setPage,
    totalPages,
    totalRows,
    search,
    setSearch,
    selectedUnit,
    setSelectedUnit,
    mostExpensive,
    leastExpensive,
    totalAllRows,
    load,
  };
};
