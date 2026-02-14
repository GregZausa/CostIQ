import React from "react";

const RawMaterialsCard = ({ title, value, description, icon }) => {
  return (
    <div className="relative backdrop-blur-lg space-y-4 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-white/5 pointer-events-none" />
      <div>
        <h3 className="text-lg font-semibold flex items-center justify-between gap-2">
          <span className="font-semibold text-xl">{title}</span>
          {icon}
        </h3>
        <div className="text-sm text-gray-600 font-semibold">{description}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default RawMaterialsCard;
