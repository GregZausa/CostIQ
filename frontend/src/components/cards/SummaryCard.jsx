import React from "react";
import { useTheme } from "../../context/ThemeContext";

const SummaryCard = ({ label, value, sub, color }) => {
  const { isDark } = useTheme();
  const colorMap = {
    green: isDark
      ? "border-green-700 bg-slate-800 text-green-400"
      : "border-green-600 bg-green-50 text-green-400",
    red: isDark
      ? "border-red-700 bg-slate-800 text-red-400"
      : "border-red-600 bg-red-50 text-red-400",
    blue: "border-blue-500 bg-blue-50 text-blue-700",
    yellow: "border-yellow-500 bg-yellow-50 text-yellow-700",
    default: isDark
      ? "border-slate-700 bg-slate-800 text-slate-50"
      : "border-slate-100 bg-slate-50 text-slate-800",
  };

  return (
    <div className={`rounded-xl border p-4 ${colorMap[color || "default"]}`}>
      <div className="text-xs uppercase tracking-wider opacity-60 mb-1">
        {label}
      </div>
      <div className="text-lg font-bold">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  );
};

export default SummaryCard;
