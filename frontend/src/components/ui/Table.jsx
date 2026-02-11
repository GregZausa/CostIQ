import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="min-w-full border-separate border-spacing-y-1.5">
      <thead className="bg-gray-800 focus:outline-none">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-6 py-4 text-left border-b text-white">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
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
  );
};

export default Table;
