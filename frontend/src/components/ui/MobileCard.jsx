import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Pagination from "../layout/Pagination";
import NoDataLayout from "../layout/NoDataLayout";

const PREVIEW_COUNT = 6;

const MobileCard = ({
  columns,
  data,
  toolbar,
  text = "No data available",
  page,
  totalPages,
  onPageChange,
  rowKey,
  avatarKeys,
  previewKeys,
}) => {
  const [expandedKey, setExpandedKey] = useState(null);

  const titleCol = columns.find((col) => col.key !== "action");
  const bodyColumns = columns.filter(
    (col) => col.key !== "action" && col.key !== titleCol?.key,
  );
  const actionCol = columns.find((col) => col.key === "action");

  const getPreviewCols = () => {
    if (previewKeys?.length) {
      return bodyColumns.filter((col) => previewKeys.includes(col.key));
    }
    return bodyColumns.slice(0, PREVIEW_COUNT);
  };

  const previewCols = getPreviewCols();
  const hiddenCols = bodyColumns.filter((col) => !previewCols.includes(col));

  return (
    <div className="w-full space-y-3">
      {toolbar && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">{toolbar}</div>
        </div>
      )}

      <div className="w-full flex flex-col gap-3">
        {data.length > 0 ? (
          data.map((row, idx) => {
            const key = row[rowKey] ?? idx;
            const isExpanded = expandedKey === key;

            const titleValue = titleCol?.render
              ? titleCol.render(row)
              : (row[titleCol?.key] ?? "—");

            const initials = avatarKeys
              ? avatarKeys.single
                ? (row[avatarKeys.single]?.[0] ?? "?").toUpperCase()
                : [row[avatarKeys.first]?.[0], row[avatarKeys.last]?.[0]]
                    .filter(Boolean)
                    .join("")
                    .toUpperCase()
              : null;

            return (
              <div
                key={key}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    {initials !== null && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold shrink-0">
                        {initials || "?"}
                      </div>
                    )}
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {titleValue}
                    </p>
                  </div>
                  {actionCol?.render?.(row)}
                </div>

                {previewCols.length > 0 && (
                  <div className="grid grid-cols-3 divide-x divide-y divide-slate-100">
                    {previewCols.map((col) => (
                      <div key={col.key} className="px-4 py-3 flex flex-col gap-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {col.label}
                        </span>
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {col.render ? col.render(row) : (row[col.key] ?? "—")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {hiddenCols.length > 0 && (
                  <button
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-500
                      hover:bg-slate-50 hover:text-blue-600 transition-colors duration-150 border-t border-slate-100"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={13} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={13} />
                        Show {hiddenCols.length} more field{hiddenCols.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </button>
                )}

                {isExpanded && hiddenCols.length > 0 && (
                  <div className="grid grid-cols-3 divide-x divide-y divide-slate-100 border-t border-slate-100">
                    {hiddenCols.map((col) => (
                      <div key={col.key} className="px-4 py-3 flex flex-col gap-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {col.label}
                        </span>
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {col.render ? col.render(row) : (row[col.key] ?? "—")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center">
            <NoDataLayout message={text} />
          </div>
        )}
      </div>

      {totalPages > 1 && (
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

export default MobileCard;