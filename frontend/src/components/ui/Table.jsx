import Pagination from "../layout/Pagination";
import NoDataLayout from "../layout/NoDataLayout";

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

      <div className="w-full rounded-2xl border border-slate-100 shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-100">
                {columns.map((col, i) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 text-left text-xs font-semibold tracking-wider uppercase text-slate-200 ${
                      i === 0 ? "rounded-tl-2xl" : ""
                    } ${i === columns.length - 1 ? "rounded-tr-2xl" : ""}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {data.length > 0 ? (
                data.map((row, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-slate-50/80 transition-colors duration-150"
                  >
                    {columns.map((col, colIdx) => (
                      <td
                        key={col.key}
                        className={`px-5 py-3.5 text-sm text-slate-600 ${
                          colIdx === 0
                            ? "font-medium text-slate-800"
                            : ""
                        } ${
                          idx === data.length - 1 && colIdx === 0
                            ? "rounded-bl-2xl"
                            : ""
                        } ${
                          idx === data.length - 1 &&
                          colIdx === columns.length - 1
                            ? "rounded-br-2xl"
                            : ""
                        }`}
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-16 text-center">
                    <NoDataLayout message={text} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>

      {totalPages > 1 && data.length > 8 && (
        <div className="flex justify-end">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Table;