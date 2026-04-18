import { useState } from "react";
import Pagination from "../layout/Pagination";
import NoDataLayout from "../layout/NoDataLayout";

const PREVIEW_COUNT = 6; // how many body fields to show collapsed

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

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">{toolbar}</div>
      </div>

      <div className="w-full min-h-130 flex flex-col gap-3">
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
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* Header */}
                <div className="relative flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    {initials !== null && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 text-xs font-semibold shrink-0">
                        {initials || "?"}
                      </div>
                    )}
                    <p className="text-xs font-semibold tracking-widest uppercase text-slate-800">
                      {titleValue}
                    </p>
                  </div>
                  {actionCol?.render?.(row)}
                </div>

                {/* Preview fields — always visible */}
                {previewCols.length > 0 && (
                  <div className="relative grid grid-cols-3 gap-px bg-slate-100">
                    {previewCols.map((col) => (
                      <div
                        key={col.key}
                        className="bg-white px-4 py-3 flex flex-col gap-0.5"
                      >
                        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                          {col.label}
                        </span>
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {col.render ? col.render(row) : (row[col.key] ?? "—")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* See more / less toggle */}
                {bodyColumns.length > previewCols.length && (
                  <button
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className="relative w-full px-4 py-2 text-xs font-semibold tracking-widest uppercase text-indigo-500 hover:bg-indigo-50 transition-colors duration-150 text-center border-t border-slate-100"
                  >
                    {isExpanded ? "Show less ↑" : `Show all ↓`}
                  </button>
                )}

                {/* Expanded fields */}
                {isExpanded && (
                  <div className="relative grid grid-cols-3 gap-px bg-slate-100 border-t border-slate-100">
                    {bodyColumns
                      .filter((col) => !previewCols.includes(col))
                      .map((col) => (
                        <div
                          key={col.key}
                          className="bg-white px-4 py-3 flex flex-col gap-0.5"
                        >
                          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                            {col.label}
                          </span>
                          <span className="text-sm font-medium text-slate-700 truncate">
                            {col.render
                              ? col.render(row)
                              : (row[col.key] ?? "—")}
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
