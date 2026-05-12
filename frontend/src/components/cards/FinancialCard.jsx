import { DollarSign, Package, Percent, TrendingUp } from "lucide-react";
import React from "react";
import ProductCardLayout from "../layout/ProductCardLayout";
import { useTheme } from "../../context/ThemeContext";

const FinancialCard = ({ title, computed }) => {
  const breakEvenUnits = computed?.breakEvenUnits || 0;
  const BreakEvenRevenue = computed?.breakEvenRevenue || 0;
  const NetProfitPerUnit = computed?.netProfitPerUnit || 0;
  const ROI = computed?.roi || 0;
  const { isDark } = useTheme();

  const formatPeso = (val) => `₱${Number(val).toFixed(2)}`;

  const rows = [
    {
      label: "Break-even Products",
      value: breakEvenUnits,
      icon: Package,
      color: "text-indigo-400",
      bg: isDark ? "bg-slate-700" : "bg-indigo-100",
      format: (v) => Number(v).toFixed(2),
    },
    {
      label: "Break-even Revenue",
      value: BreakEvenRevenue,
      icon: DollarSign,
      color: "text-violet-400",
      bg: isDark ? "bg-slate-700" : "bg-violet-100",
      format: formatPeso,
    },
    {
      label: "Net Profit / Unit",
      value: NetProfitPerUnit,
      icon: TrendingUp,
      color: "text-sky-400",
      bg: isDark ? "bg-slate-700" : "bg-sky-100",
      format: formatPeso,
    },
    {
      label: "ROI %",
      value: ROI,
      icon: Percent,
      color: "text-emerald-400",
      bg: isDark ? "bg-slate-700" : "bg-emerald-100",
      format: (v) => `${Number(v).toFixed(2)}%`,
    },
  ];

  return (
    <ProductCardLayout title={title} icon={TrendingUp}>
      <div
        className={`divide-y  ${isDark ? "divide-slate-700" : "divide-slate-100"}`}
      >
        {rows.map(({ label, value, icon: Icon, color, bg, format }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-3 py-2 ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"} transition-colors duration-150`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}
              >
                <Icon size={14} />
              </div>
              <span
                className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-600"} flex-1 min-w-0 truncate`}
              >
                {label}
              </span>
            </div>
            <span
              className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}  tabular-nums`}
            >
              {format(value)}
            </span>
          </div>
        ))}
      </div>
    </ProductCardLayout>
  );
};

export default FinancialCard;
