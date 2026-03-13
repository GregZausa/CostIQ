import { BadgePercent, FileText, Percent, Tag, TrendingUp } from "lucide-react";
import React from "react";

const ProfitAndTaxSummaryCard = ({
  title,
  profitMargin = 0,
  profit = 0,
  discountPercent = 0,
  discount = 0,
  salesTaxPercent = 0,
  salesTax = 0,
  finalPrice = 0,
}) => {
  const rows = [
    {
      label: "Profit margin",
      percentValue: profitMargin,
      amountValue: profit,
      icon: TrendingUp,
      color: "text-green-700",
      bg: "bg-green-50",
      pillColor: "bg-green-50 text-green-700",
    },
    {
      label: "Discount",
      percentValue: discountPercent,
      amountValue: discount,
      icon: Percent,
      color: "text-amber-700",
      bg: "bg-amber-50",
      pillColor: "bg-amber-50 text-amber-700",
    },
    {
      label: "Sales tax",
      percentValue: salesTaxPercent,
      amountValue: salesTax,
      icon: FileText,
      color: "text-blue-700",
      bg: "bg-blue-50",
      pillColor: "bg-blue-50 text-blue-700",
    },
    {
      label: "Final Price",
      amountValue: finalPrice,
      icon: Tag,
      color: "text-white",
      bg: "bg-slate-800",
      pillColor: null,
      isTotal: true,
    },
  ];
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            {title}
          </p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500">
          <BadgePercent size={15} />
        </div>
      </div>
      <div className="divide-y divide-slate-100">
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
              className={`flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 transition-colors duration-150
                 ${isTotal ? "bg-slate-800 hover:bg-slate-700" : "hover:bg-slate-50"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                >
                  <Icon size={15} className={color} />
                </div>
                <span
                  className={`text-sm font-medium w-25 flex-1 ${isTotal ? "text-white" : "text-slate-600"} `}
                >
                  {label}
                </span>
              </div>
              {!isTotal && (
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full text-center ${pillColor}`}
                >
                  {parseFloat(percentValue).toFixed(2)}%
                </span>
              )}
              <span
                className={`text-sm font-medium tabular-nums ${isTotal ? "text-white"  : "text-slate-800"} min-w-18 text-right`}
              >
                ₱{amountValue.toFixed(2)}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default ProfitAndTaxSummaryCard;
