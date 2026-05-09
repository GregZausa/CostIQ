import Pagination from "../layout/Pagination";
import NoDataLayout from "../layout/NoDataLayout";
import { useTheme } from "../../context/ThemeContext";

const Table = ({
  columns,
  data,
  toolbar,
  text = "No data available",
  page,
  totalPages,
  onPageChange,
}) => {
  const { isDark } = useTheme();
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="w-full">{toolbar}</div>
      </div>

      <div className="w-full rounded-2xl  min-h-130 flex flex-col">
        <table className="min-w-full">
          <thead>
            <tr className={`${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200" } border-b `}>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  className={`px-5 py-3 text-left text-xs font-semibold tracking-wider uppercase ${isDark ?"text-slate-100" : "text-slate-700"} ${
                    i === 0 ? "rounded-tl-2xl" : ""
                  } ${i === columns.length - 1 ? "rounded-tr-2xl" : ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "divide-slate-700 bg-slate-800" : "divide-slate-200 bg-slate-100"} `}>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`group ${isDark ? "hover:bg-slate-600/80" : "hover:bg-slate-200/80"} transition-colors duration-150`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.key}
                      className={`px-5 py-3.5 text-sm ${isDark ? "text-slate-200" : "text-slate-600"} ${
                        colIdx === 0 ? `font-medium ${isDark ? "text-slate-50" : "text-slate-800"}` : ""
                      } ${
                        idx === data.length - 1 && colIdx === 0
                          ? "rounded-bl-2xl"
                          : ""
                      } ${
                        idx === data.length - 1 && colIdx === columns.length - 1
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

      {totalPages > 0 && (
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
