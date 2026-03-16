import { BadgePercent, FileText, Percent, Tag, TrendingUp } from "lucide-react";
import React from "react";
import ProductCardLayout from "../layout/ProductCardLayout";

const PricingSummaryCard = ({
  title,
  computed,
}) => {
  const profitMargin = computed?.profit_margin || 0;
  const profit = computed?.profit || 0;
  const discountPercent = computed?.discount;
  const salesTaxPercent = computed?.sales_tax || 0;
  const discount = computed?.discountCost || 0;
  const salesTax = computed?.tax || 0;
  const finalPrice = computed?.finalPrice || 0;
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
    <ProductCardLayout title={title} icon={BadgePercent}>
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
              className={`flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors duration-150
                 ${isTotal ? "bg-slate-800 hover:bg-slate-700" : "hover:bg-slate-50"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-xl ${bg} flex items-center justify-center shrink-0`}
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
                className={`text-sm font-medium tabular-nums ${isTotal ? "text-white" : "text-slate-800"} min-w-18 text-right`}
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
