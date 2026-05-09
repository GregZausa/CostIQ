import React from "react";
import { useTheme } from "../../context/ThemeContext";

const HeaderCard = ({ title, value, description, icon }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`group relative border shadow-xs hover:shadow-md ${isDark ? "bg-slate-800 border-slate-700 hover:border-slate-600" : "bg-slate-50 border-slate-200 hover:border-slate-200"} rounded-2xl p-5 transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div>
          <p
            className={`text-xs font-bold tracking-widest uppercase ${isDark ? "text-slate-200" : "text-slate-600"} mb-0.5`}
          >
            {title}
          </p>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <div
          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${isDark ? "text-indigo-400 bg-slate-700 group-hover:bg-slate-700" : "bg-slate-100 text-indigo-600 group-hover:bg-slate-100"} transition-colors duration-300`}
        >
          {icon}
        </div>
      </div>
      <div
        className={`relative text-3xl font-bold ${isDark ? "text-slate-50" : "text-slate-800"} tracking-tight`}
      >
        {value}
      </div>
    </div>
  );
};

export default HeaderCard;
