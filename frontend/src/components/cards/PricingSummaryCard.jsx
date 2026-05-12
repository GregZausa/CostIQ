import { BadgePercent, FileText, Percent, Tag, TrendingUp } from "lucide-react";
import React from "react";
import ProductCardLayout from "../layout/ProductCardLayout";
import { useTheme } from "../../context/ThemeContext";

const PricingSummaryCard = ({ title, computed }) => {
  const profitMargin = computed?.profit_margin || 0;
  const profit = computed?.profit || 0;
  const discountPercent = computed?.discount;
  const salesTaxPercent = computed?.sales_tax || 0;
  const discount = computed?.discountCost || 0;
  const salesTax = computed?.tax || 0;
  const finalPrice = computed?.finalPrice || 0;
  const { isDark } = useTheme();

  const rows = [
    {
      label: "Profit margin",
      percentValue: profitMargin,
      amountValue: profit,
      icon: TrendingUp,
      color: "text-green-400",
      bg: isDark ? "bg-slate-700" : "bg-green-100",
      pillColor: isDark
        ? "bg-slate-700 text-green-400"
        : "bg-green-100 text-green-400",
    },
    {
      label: "Discount",
      percentValue: discountPercent,
      amountValue: discount,
      icon: Percent,
      color: "text-amber-400",
      bg: isDark ? "bg-slate-700" : "bg-amber-100",
      pillColor: isDark
        ? "bg-slate-700 text-amber-400"
        : "bg-amber-100 text-amber-400",
    },
    {
      label: "Sales tax",
      percentValue: salesTaxPercent,
      amountValue: salesTax,
      icon: FileText,
      color: "text-blue-400",
      bg: isDark ? "bg-slate-700" : "bg-blue-100",
      pillColor: isDark
        ? "bg-slate-700 text-blue-400"
        : "bg-blue-100 text-blue-400",
    },
    {
      label: "Final Price",
      amountValue: finalPrice,
      icon: Tag,
      color: "text-slate-400",
      bg: isDark ? "bg-slate-700" : "bg-slate-100",
      pillColor: null,
      isTotal: true,
    },
  ];

  return (
    <ProductCardLayout title={title} icon={BadgePercent}>
      <div
        className={`divide-y ${isDark ? "divide-slate-700" : "divide-slate-100"}`}
      >
        {rows.map(
          ({
            label,
            percentValue,
            amountValue,
            icon: Icon,
            color,
            bg,
            pillColor,
            isTotal,
          }) => (
            <div
              key={label}
              className={`flex items-center justify-between px-3 py-2 transition-colors duration-150
              ${isTotal ? (isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-50 hover:bg-slate-100") : isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
            >
              <div
                className={`w-5 h-5 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={14} className={color} />
              </div>

              <span
                className={`text-sm font-medium flex-1 min-w-0 truncate ${isTotal ? (isDark ? "text-slate-100" : "text-slate-700") : isDark ? "text-slate-200" : "text-slate-600"}`}
              >
                {label}
              </span>

              {!isTotal && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${pillColor}`}
                >
                  {parseFloat(percentValue).toFixed(2)}%
                </span>
              )}

              <span
                className={`text-sm font-medium tabular-nums shrink-0 w-16 text-right ${isTotal ? (isDark ? "text-slate-100" : "text-slate-700") : isDark ? "text-slate-100 text-sm" : "text-slate-700 text-sm"}`}
              >
                ₱{amountValue.toFixed(2)}
              </span>
            </div>
          ),
        )}
      </div>
    </ProductCardLayout>
  );
};

export default PricingSummaryCard;
