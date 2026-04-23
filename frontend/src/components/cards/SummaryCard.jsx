import React from "react";

const SummaryCard = ({ label, value, sub, color }) => {
  const colorMap = {
    green: "border-green-500 bg-green-50 text-green-700",
    red: "border-red-500 bg-red-50 text-red-700",
    blue: "border-blue-500 bg-blue-50 text-blue-700",
    yellow: "border-yellow-500 bg-yellow-50 text-yellow-700",
    default: "border-slate-200 bg-slate-50 text-slate-800",
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
