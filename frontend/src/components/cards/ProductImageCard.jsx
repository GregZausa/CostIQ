import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ProductImageCard = ({ src, alt = "Product", name, description }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`group relative border ${isDark ? "bg-slate-800 border-slate-700 hover:border-slate-700" : "bg-slate-50 border-slate-100 hover:border-slate-100"} rounded-2xl   shadow-xs overflow-hidden hover:shadow-md  transition-all duration-300`}
    >
      <div
        className={`relative h-89 overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-50"} flex items-center justify-center`}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/30 to-transparent`}
        />
        <div className="absolute inset-0 bg-slate-500/0 group-hover:bg-slate-500/10 transition-colors duration-300" />
      </div>
      {(name || description) && (
        <div className="px-4 py-3">
          {name && (
            <p
              className={`text-sm font-semibold ${isDark ? "text-slate-50" : "text-slate-800"} truncate`}
            >
              {name}
            </p>
          )}
          {description && (
            <p
              className={`text-sm font-semibold ${isDark ? "text-slate-50" : "text-slate-800"} truncate`}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageCard;
