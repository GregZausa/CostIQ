import { useCallback, useEffect, useState } from "react";
import { apiUrl } from "../../config/apiUrl";
import { authFetch } from "../../utils/authFetch";

export const useEmployeeQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows ,setTotalRows] = useState();
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const urlParams = new URLSearchParams({ search, page, limit: 8 });
    try {
      const res = await authFetch(
        `${apiUrl}/employees?${urlParams.toString()}`,
      );

      const result = await res.json();

      const rows = result.rows ?? [];
      setData(rows);
      if (rows.length > 0) setColumns(Object.keys(rows[0]));
      setPage(result.page);
      setTotalPages(result.totalPages);
      setTotalRows(result.totalRows);
    } catch (err) {
      console.error(err);
    }
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
    totalRows,
    columns,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    load,
  };
};
