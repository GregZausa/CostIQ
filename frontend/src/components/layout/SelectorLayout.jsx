import React from "react";
import TextInput from "../ui/TextInput";

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
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        {Icon}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="relative mb-4">
        <TextInput type="search" value={search} onChange={setSearch} />
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
        <div className="bg-gray-50 px-4 border-b border-gray-200">
          <div className="flex justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Select
            </span>
            {columns.map((col) => (
              <span
                key={col.key}
                className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {col.label}
              </span>
            ))}
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <span className="text-center py-10 text-gray-500 italic font-semibold text-sm">
              No employee found
            </span>
          ) : (
            filtered.map((item) => (
              <div
                key={item[idKey]}
                onClick={() => toggleSelect(item)}
                className={`flex items-center text-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                  isSelected(item[idKey])
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors 
                        ${
                          isSelected(item[idKey])
                            ? "bg-white border-white"
                            : "border-gray-300"
                        }`}
                >
                  {isSelected(item[idKey]) && (
                    <svg
                      className="w-2.5 h-2.5 text-gray-800"
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
