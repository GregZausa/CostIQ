import React from "react";
import Pagination from "../layout/Pagination";

const Table = ({ columns, data, toolbar, text, page, totalPages, onPageChange }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">{toolbar}</div>
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
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
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-left">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-gray-500 italic font-semibold text-xl"
              >
                {text}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
