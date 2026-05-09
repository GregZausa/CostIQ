import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ProductCardLayout = ({ title, icon: Icon, children }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`w-full  border${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"} rounded-2xl  shadow-xs`}
    >
      <div
        className={`flex items-center justify-between px-3 py-2.5 border-b ${isDark ? "border-slate-700" : "border-slate-100"}`}
      >
        <div>
          <p
            className={`text-xs font-semibold tracking-widest uppercase ${isDark ? "text-slate-50" : "text-slate-800"}`}
          >
            {title}
          </p>
        </div>
        <div
          className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${isDark ? "text-indigo-400 bg-slate-700 group-hover:bg-slate-700" : "bg-slate-100 text-indigo-600 group-hover:bg-slate-100"} transition-colors duration-300`}
        >
          <Icon size={15} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProductCardLayout;
