import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

export const useOtherExpensesQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState();

  const load = useCallback(async () => {
    const urlParams = new URLSearchParams({ search, page, limit: 8 });
    const res = await authFetch(
      `${apiUrl}/other-expenses?${urlParams.toString()}`,
    );
    const result = await res.json();

    setData(result.rows);
    setColumns(result.headers);
    setPage(result.page);
    setTotalPages(result.totalPages);
    setTotalRows(result.totalRows);
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
    totalRows,
  };
};
