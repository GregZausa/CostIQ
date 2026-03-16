import {
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  Package,
  CalendarClock,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import ProductCardLayout from "../layout/ProductCardLayout";
import TextInput from "../ui/TextInput";

const fmt = (n) =>
  "₱" + Math.round(n).toLocaleString("en-PH", { minimumFractionDigits: 0 });

const WhatIfScenarioCard = ({ title, computed }) => {
  const [goalInput, setGoalInput] = useState("");
  const [batchesPerDayInput, setBatchesPerDayInput] = useState("");

  const goal = parseFloat(goalInput) || 0;
  const batchesPerDay = parseFloat(batchesPerDayInput) || 0;

  const price = computed?.finalPrice ?? 0;
  const costPerUnit = computed?.totalCPP ?? 0;
  const profitPerUnit = computed?.netProfitPerUnit ?? 0;
  const breakEvenUnits = computed?.breakEvenUnits ?? 0;
  const batchSize = Number(computed?.total_sellable_units ?? 1);
  const profitPerBatch = computed?.netProfit ?? 0;

  const metrics = useMemo(() => {
    if (!goal || !profitPerUnit) return null;

    const batchesNeeded = Math.ceil(goal / profitPerBatch);
    const unitsNeeded = batchesNeeded * batchSize;
    const revenueNeeded = unitsNeeded * price;
    const totalCost = unitsNeeded * costPerUnit;

    const beBatches = Math.ceil(breakEvenUnits / batchSize);
    const profitBatches = Math.max(0, batchesNeeded - beBatches);
    let timeline = null;
    if (batchesPerDay > 0) {
      const daysNeeded = Math.ceil(batchesNeeded / batchesPerDay);
      const weeksNeeded = Math.ceil(daysNeeded / 7);
      const monthsNeeded = (daysNeeded / 30).toFixed(1);

      const profitPerDay = batchesPerDay * profitPerBatch;
      const profitPerWeek = profitPerDay * 7;

      timeline = {
        daysNeeded,
        weeksNeeded,
        monthsNeeded,
        profitPerDay,
        profitPerWeek,
      };
    }

    return {
      goal,
      batchesNeeded,
      unitsNeeded,
      revenueNeeded,
      totalCost,
      beBatches,
      profitBatches,
      timeline,
    };
  }, [goal, batchesPerDay, price, costPerUnit, profitPerUnit, profitPerBatch, breakEvenUnits, batchSize]);

  const showResults = !!metrics;
  const showTimeline = !!(metrics?.timeline);

  return (
    <ProductCardLayout title={title} icon={SlidersHorizontal}>
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Income goal (₱)"
            placeholder="e.g. 50000"
            value={goalInput}
            onChange={(val) => setGoalInput(val)}
            type="number"
            min={0}
          />
          <TextInput
            label="Batches per day"
            placeholder="e.g. 2"
            value={batchesPerDayInput}
            onChange={(val) => setBatchesPerDayInput(val)}
            type="number"
            min={1}
          />
        </div>
        {!goal && (
          <div className="flex items-center gap-2 py-3 px-3 rounded-xl bg-slate-50 border border-slate-100">
            <Target size={14} className="text-slate-400 shrink-0" />
            <p className="text-xs text-slate-400">
              Enter an income goal and your daily batch capacity to get a production plan.
            </p>
          </div>
        )}
        {goal > 0 && !batchesPerDay && metrics && (
          <div className="flex items-center gap-2 py-1 px-3 rounded-xl bg-indigo-50 border border-indigo-100">
            <Package size={14} className="text-indigo-400 shrink-0" />
            <p className="text-xs text-indigo-500">
              You need <strong className="text-indigo-600">{metrics.batchesNeeded} batches</strong> to hit {fmt(goal)}.
              Add your daily batch capacity to see a timeline.
            </p>
          </div>
        )}
        {showResults && (
          <>
            <div className="flex items-center justify-between px-3 py-0.5 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-indigo-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
                    Batches needed
                  </p>
                  <p className="text-xs text-indigo-500 mt-0.5">
                    {metrics.beBatches} to break even
                    {metrics.profitBatches > 0 && ` + ${metrics.profitBatches} for profit`}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-indigo-600">
                {metrics.batchesNeeded}
              </p>
            </div>
            {showTimeline && (
              <div className="flex items-center justify-between px-3 py-0.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <CalendarClock size={14} className="text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-[11px] text-emerald-500 font-semibold uppercase tracking-wider">
                      Time to hit goal
                    </p>
                    <p className="text-xs text-emerald-500 mt-0.5">
                      {fmt(metrics.timeline.profitPerDay)}/day · {fmt(metrics.timeline.profitPerWeek)}/week at current pace
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">
                    {metrics.timeline.weeksNeeded}
                    <span className="text-sm font-medium ml-1">wks</span>
                  </p>
                  <p className="text-[10px] text-emerald-400">
                    {metrics.timeline.daysNeeded} days · ~{metrics.timeline.monthsNeeded} mo
                  </p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "Units needed",
                  value: metrics.unitsNeeded.toLocaleString(),
                  sub: `${batchSize} units × ${metrics.batchesNeeded} batches`,
                  icon: <TrendingUp size={12} />,
                  accent: "text-indigo-600",
                },
                {
                  label: "Revenue needed",
                  value: fmt(metrics.revenueNeeded),
                  sub: `at ₱${price.toFixed(2)} / unit`,
                  icon: <Target size={12} />,
                  accent: "text-slate-700",
                },
                {
                  label: "Total cost",
                  value: fmt(metrics.totalCost),
                  sub: `₱${costPerUnit.toFixed(2)} × ${metrics.unitsNeeded.toLocaleString()} units`,
                  icon: <TrendingDown size={12} />,
                  accent: "text-slate-700",
                },
                {
                  label: "Profit per batch",
                  value: fmt(profitPerBatch),
                  sub: `${batchSize} units × ₱${profitPerUnit.toFixed(2)}`,
                  icon: <Package size={12} />,
                  accent: "text-emerald-600",
                },
              ].map(({ label, value, sub, icon, accent }) => (
                <div
                  key={label}
                  className="bg-slate-50 rounded-xl px-3 py-0.5 border border-slate-100"
                >
                  <div className="flex items-center gap-1 text-slate-400 mb-1">
                    {icon}
                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                      {label}
                    </span>
                  </div>
                  <p className={`text-sm font-bold ${accent}`}>{value}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 px-3 py-0.5 rounded-xl text-xs border bg-amber-50 border-amber-100 text-amber-700">
              <AlertCircle size={13} className="shrink-0 mt-0.5" />
              <span>
                You need <strong>{metrics.batchesNeeded} batches</strong> ({metrics.unitsNeeded.toLocaleString()} units)
                to earn <strong>{fmt(goal)}</strong>.
                {showTimeline
                  ? <> At <strong>{batchesPerDay} batch{batchesPerDay > 1 ? "es" : ""}/day</strong>, that's <strong>{metrics.timeline.daysNeeded} days</strong> (~{metrics.timeline.weeksNeeded} weeks).</>
                  : <> Add your daily batch capacity above to see how long it will take.</>
                }
              </span>
            </div>
          </>
        )}
      </div>
    </ProductCardLayout>
  );
};

export default WhatIfScenarioCard;