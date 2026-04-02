import { useCallback, useEffect, useState } from "react";
import { fetchRawMaterials } from "../../services/raw-materials.api";

export const useRawMaterialsQuery = () => {
  const [data, setData] = useState([]);
  const [totalAllRows, setTotalAllRows] = useState(0);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(1);

  const [mostExpensive, setMostExpensive] = useState(null);
  const [leastExpensive, setLeastExpensive] = useState(null);
  const [mostUsed, setMostUsed] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState();

  const load = useCallback(async () => {
    try {
      const result = await fetchRawMaterials({
        search,
        page,
        selectedUnit,
      });

      const rows = result.rows ?? [];
      setData(rows);
      if (rows.length > 0) setColumns(Object.keys(rows[0]));
      setTotalAllRows(result.totalAllRows);
      setMostExpensive(result.mostExpensive);
      setLeastExpensive(result.leastExpensive);
      setMostUsed(result.mostUsed);
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
    mostUsed,
    totalAllRows,
    load,
  };
};
