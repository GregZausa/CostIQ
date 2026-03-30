import { use, useCallback, useEffect, useState } from "react";
import { fetchOtherExpenses } from "../../services/other-expenses.api";

export const useOtherExpensesQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [totalAllRows, setTotalAllRows] = useState(0);

  const load = useCallback(async () => {
    try {
      const result = await fetchOtherExpenses({ search, page });

      const rows = result.rows?? [];

      setData(rows);
      if(rows.length > 0) setColumns(Object.keys(rows[0]));
      setPage(result.page);
      setTotalPages(result.totalPages);
      setTotalRows(result.totalRows);
      setTotalAllRows(result.totalAllRows);
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
