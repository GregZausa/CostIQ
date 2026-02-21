import { useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useRawMaterialsQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUnit, setSelectedUnit] = useState();

  const load = async () => {
    const urlParams = new URLSearchParams({ search, page, limit: 8 });
    if (selectedUnit) urlParams.append("packUnit", selectedUnit);
    const res = await authFetch(`${apiUrl}/raw-materials?${urlParams}`);
    const result = await res.json();

    setData(result.rows);
    setColumns(result.headers);
    setPage(result.page);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    load();
  }, [page, search, selectedUnit]);

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
    search,
    setSearch,
    selectedUnit,
    setSelectedUnit,
    reload: load,
  };
};
