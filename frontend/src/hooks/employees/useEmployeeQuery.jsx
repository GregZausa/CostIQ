import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";

export const useEmployeeQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const urlParams = new URLSearchParams({ search, page, limit: 8 });
    const res = await authFetch(`${apiUrl}/employees?${urlParams.toString()}`);

    const result = await res.json();

    setData(result.rows);
    setColumns(result.headers);
    setPage(result.page);
    setTotalPages(result.totalPages);
  }, [search, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return {
    data,
    setData,
    columns,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    load,
  };
};
