import React from "react";
import Pagination from "../layout/Pagination";
import { Inbox } from "lucide-react";

const Table = ({
  columns,
  data,
  toolbar,
  text = "No data available",
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="w-full space-y-3">
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
      <div className="w-full rounded-2xl border border-slate-200 shadow-xs">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3.5 text-left text-xs font-semibold tracking-widest uppercase text-white"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50/40 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-5 py-3.5 text-sm text-slate-700"
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Inbox size={32} strokeWidth={1.5} />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
