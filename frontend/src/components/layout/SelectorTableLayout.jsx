import React from "react";
import Table from "../ui/Table";
import { useTheme } from "../../context/ThemeContext";

const SelectorTableLayout = ({ selectedItems, cols }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`border ${isDark ? "border-slate-700" : "border-slate-100"}  rounded-lg overflow-hidden mb-5`}
    >
      <div
        className={`border-b ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"} px-4 py-2  `}
      >
        <span
          className={`text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-600"} uppercase tracking-wide`}
        >
          Selected ({selectedItems.length})
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table columns={cols} data={selectedItems} />
      </div>
    </div>
  );
};

export default SelectorTableLayout;
