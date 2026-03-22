import React from "react";

const ProductImageCard = ({ src, alt = "Product", name, description }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md hover:border-slate-200 transition-all duration-300">
      <div className="relative h-89 overflow-hidden bg-slate-50 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0 bg-slate-500/0 group-hover:bg-slate-500/10 transition-colors duration-300" />
      </div>
      {(name || description) && (
        <div className="px-4 py-3">
          {name && (
            <p className="text-sm font-semibold text-slate-800 truncate">
              {name}
            </p>
          )}
          {description && (
            <p className="text-sm font-semibold text-slate-800 truncate">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductImageCard;
