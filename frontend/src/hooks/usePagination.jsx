import { useEffect, useMemo, useState } from "react";

const usePagination = (data, pageSize) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    return data.slice((page - 1) * pageSize, page * pageSize);
  }, [data, page, pageSize]);

  return {
    page,
    setPage,
    totalPages,
    paginatedData,
  };
};

export default usePagination;
