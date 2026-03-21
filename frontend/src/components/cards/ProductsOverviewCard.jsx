import React from "react";

const ProductsOverviewCard = ({ title, value, description, icon, textVariant = "normal", }) => {
  const textVariants = {
    positive: "text-green-500",
    negative: "text-rose-500",
    normal: "text-slate-800",
  }
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-0.5">
            {title}
          </p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div className={`relative text-3xl font-bold ${textVariants[textVariant]} tracking-tight`}>
        {value}
      </div>
    </div>
  );
};

export default ProductsOverviewCard;
