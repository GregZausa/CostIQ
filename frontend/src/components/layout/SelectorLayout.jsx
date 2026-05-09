import React from "react";
import TextInput from "../ui/TextInput";
import { useTheme } from "../../context/ThemeContext";

const SelectorLayout = ({
  search,
  setSearch,
  filtered = [],
  isSelected,
  toggleSelect,
  Icon,
  title,
  columns,
  idKey,
}) => {
  const { isDark } = useTheme();
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        {Icon}
        <h1
          className={`text-xl font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
        >
          {title}
        </h1>
      </div>
      <div className="relative mb-4">
        <TextInput type="search" value={search} onChange={setSearch} />
      </div>
      <div
        className={`border ${isDark ? "border-slate-700" : "border-slate-100"} rounded-lg overflow-hidden mb-5`}
      >
        <div
          className={`border-b ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"} px-4  `}
        >
          <div className="flex justify-between">
            <span
              className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-600"} uppercase tracking-wide`}
            >
              Select
            </span>
            {columns.map((col) => (
              <span
                key={col.key}
                className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-600"} uppercase tracking-wide`}
              >
                {col.label}
              </span>
            ))}
          </div>
        </div>
        <div
          className={`max-h-48 overflow-y-auto divide-y ${isDark ? "divide-slate-700" : "divide-slate-100"}`}
        >
          {filtered.length === 0 ? (
            <span className="text-center py-10 text-slate-500 italic font-semibold text-sm">
              Search not found
            </span>
          ) : (
            filtered.map((item) => (
              <div
                key={item[idKey]}
                onClick={() => toggleSelect(item)}
                className={`flex items-center text-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                  isSelected(item[idKey])
                    ? `${isDark ? "bg-slate-800 text-slate-50" : "bg-slate-50 text-slate-800"}`
                    : ` ${isDark ? "hover:bg-slate-700 text-slate-50" : "hover:bg-slate-100 text-slate-800"}`
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors 
                        ${
                          isSelected(item[idKey])
                            ? "bg-white border-white"
                            : "border-slate-300"
                        }`}
                >
                  {isSelected(item[idKey]) && (
                    <svg
                      className="w-2.5 h-2.5 text-slate-800"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10 3L5 8.5 2 5.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {columns.map((cols) => (
                  <span key={cols.key} className="text-sm font-medium">
                    {cols.render(item)}
                  </span>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectorLayout;
