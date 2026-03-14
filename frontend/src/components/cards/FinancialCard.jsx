import { DollarSign, Package, Percent, TrendingUp } from "lucide-react";
import React from "react";
import ProductCardLayout from "../layout/ProductCardLayout";

const FinancialCard = ({
  title,
  breakEvenUnits = 0,
  BreakEvenRevenue = 0,
  NetProfitPerUnit = 0,
  ROI = 0,
}) => {
  const formatPeso = (val) =>
    `₱${Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

  const rows = [
    {
      label: "Break-even Products",
      value: breakEvenUnits,
      icon: Package,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      format: (v) => Number(v).toLocaleString("en-PH"),
    },
    {
      label: "Break-even Revenue",
      value: BreakEvenRevenue,
      icon: DollarSign,
      color: "text-violet-500",
      bg: "bg-violet-50",
      format: formatPeso,
    },
    {
      label: "Net Profit / Unit",
      value: NetProfitPerUnit,
      icon: TrendingUp,
      color: "text-sky-500",
      bg: "bg-sky-50",
      format: formatPeso,
    },
    {
      label: "ROI %",
      value: ROI,
      icon: Percent,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      format: (v) => `${Number(v).toFixed(2)}%`,
    },
  ];

  return (
    <ProductCardLayout title={title} icon={TrendingUp}>
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, value, icon: Icon, color, bg, format }) => (
          <div
            key={label}
            className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}
              >
                <Icon size={14} />
              </div>
              <span className="text-sm font-medium text-slate-600">
                {label}
              </span>
            </div>
            <span className="text-sm font-semibold text-slate-800 tabular-nums">
              {format(value)}
            </span>
          </div>
        ))}
      </div>
    </ProductCardLayout>
  );
};

export default FinancialCard;
