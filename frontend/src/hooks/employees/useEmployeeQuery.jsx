import { useCallback, useEffect, useState } from "react";
import { fetchEmployees } from "../../services/employees.api";

export const useEmployeeQuery = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState();
  const [totalAllRows, setTotalAllRows] = useState();
  const [mostUsedPosition, setMostUsedPosition] = useState(null);
  const [mostUsedEmployee, setMostUsedEmployee] = useState(null);
  const [mostPaid, setMostPaid] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      const result = await fetchEmployees({
        search,
        page,
      });
      const rows = result.rows ?? [];
      setData(rows);
      if (rows.length > 0) setColumns(Object.keys(rows[0]));
      setPage(result.page);
      setTotalPages(result.totalPages);
      setTotalRows(result.totalRows);
      setTotalAllRows(result.totalAllRows);
      setMostUsedPosition(result.mostUsedPosition);
      setMostUsedEmployee(result.mostUsedEmployee);
      setMostPaid(result.mostPaidEmployee);
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
    totalAllRows,
    mostUsedPosition,
    mostUsedEmployee,
    mostPaid,
    columns,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    load,
  };
};
