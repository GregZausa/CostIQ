import React from "react";
import usePagination from "../../hooks/usePagination";
import Pagination from "../layout/Pagination";

const Table = ({ columns, data }) => {
  const { page, setPage, totalPages, paginatedData } = usePagination(data, 8);
  return (
    <div className="overflow-auto">
      <div className="mt-2">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <table className="min-w-full border-separate border-spacing-y-1.5">
        <thead className="bg-gray-800 focus:outline-none">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left border-b text-white"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-left">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
