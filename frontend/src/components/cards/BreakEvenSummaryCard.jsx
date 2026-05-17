// BreakEvenSummaryCard.jsx
import React from "react";
import { Target } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import ProductCardLayout from "../layout/ProductCardLayout";

const fmt = (n) =>
  "₱" +
  Number(n).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const BreakEvenSummaryCard = ({ computed = {} }) => {
  const { user } = useAuth();
  const {
    breakEvenUnits = 0,
    breakEvenRevenue = 0,
    total_sellable_units = 0,
    finalPrice = 0,
    netProfitPerUnit = 0,
    totalCPB = 0,
    roi = 0,
  } = computed;

  const currentUnits = Number(total_sellable_units);
  const beUnits = Number(breakEvenUnits ?? 0);
  const beRevenue = Number(breakEvenRevenue ?? 0);
  const currentRevenue = Number(finalPrice) * currentUnits;

  const isAboveBreakEven = beUnits > 0 && currentUnits >= beUnits;
  const progressPct =
    beUnits > 0 ? Math.min((currentUnits / beUnits) * 100, 100) : 100;

  const unitsAbove = Math.max(0, currentUnits - beUnits);
  const revenueAbove = Math.max(0, currentRevenue - beRevenue);

  const metrics = [
    {
      label: "Break-even Units",
      value: beUnits > 0 ? beUnits.toLocaleString() : "N/A",
      sub: "units needed to cover costs",
      color: "text-slate-800",
    },
    {
      label: "Break-even Revenue",
      value: beRevenue > 0 ? fmt(beRevenue) : "N/A",
      sub: "revenue needed to break even",
      color: "text-slate-800",
    },
    {
      label: "Current Batch Units",
      value: currentUnits.toLocaleString(),
      sub: "units produced per batch",
      color: "text-indigo-600",
    },
    {
      label: "Current Revenue",
      value: fmt(currentRevenue),
      sub: "revenue per batch",
      color: "text-indigo-600",
    },
    {
      label: isAboveBreakEven ? "Units Above BE" : "Units Below BE",
      value:
        unitsAbove > 0
          ? `+${unitsAbove.toLocaleString()}`
          : beUnits > 0
            ? `-${Math.abs(currentUnits - beUnits)}`
            : "N/A",
      sub: isAboveBreakEven ? "profit buffer" : "units needed to break even",
      color: isAboveBreakEven ? "text-green-600" : "text-red-600",
    },
    {
      label: "ROI",
      value: `${Number(roi).toFixed(2)}%`,
      sub: "return on investment",
      color:
        Number(roi) >= 100
          ? "text-green-600"
          : Number(roi) >= 50
            ? "text-yellow-600"
            : "text-red-600",
    },
  ];

  return (
    <ProductCardLayout title="Break-even Summary" icon={Target}>
      {!user?.is_premium ? (
        <PremiumCard message="Unlock pricing guide to check how different prices works" />
      ) : (
        <>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {currentUnits.toLocaleString()} units vs{" "}
                {beUnits > 0 ? beUnits.toLocaleString() : "N/A"} break-even
              </span>
              <span
                className={`text-xs font-bold ${isAboveBreakEven ? "text-green-600" : "text-red-500"}`}
              >
                {isAboveBreakEven
                  ? "✅ Above Break-even"
                  : "⚠️ Below Break-even"}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${isAboveBreakEven ? "bg-green-500" : "bg-red-400"}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-400">0</span>
              {beUnits > 0 && (
                <span className="text-[10px] text-slate-400">
                  BE: {beUnits.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {metrics.map(({ label, value, sub, color }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-100"
              >
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  {label}
                </p>
                <p className={`text-sm font-bold ${color}`}>{value}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Summary note */}
          <div
            className={`flex items-start gap-2 px-3 py-2 rounded-xl text-xs border ${
              isAboveBreakEven
                ? "bg-green-50 border-green-100 text-green-700"
                : "bg-red-50 border-red-100 text-red-700"
            }`}
          >
            <Target size={13} className="shrink-0 mt-0.5" />
            <span>
              {isAboveBreakEven
                ? `You're producing ${unitsAbove.toLocaleString()} units above break-even, generating ${fmt(revenueAbove)} in profit revenue per batch.`
                : beUnits > 0
                  ? `You need ${Math.abs(currentUnits - beUnits).toLocaleString()} more units per batch to reach break-even.`
                  : "Set a profit margin to calculate your break-even point."}
            </span>
          </div>
        </>
      )}
    </ProductCardLayout>
  );
};

export default BreakEvenSummaryCard;
