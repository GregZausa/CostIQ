import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Cell,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { BarChart2 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md space-y-1.5 text-xs">
        <p className="font-semibold text-slate-700 border-b border-slate-100 pb-1 mb-1">
          Margin: {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500">{entry.name}</span>
            </div>
            <span className="font-semibold text-slate-700">
              {entry.name === "ROI %" ? `${entry.value}%` : `₱${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MarginScenarioChart = ({ computed = {} }) => {
  const {
    totalCPP = 0,
    totalCPB = 0,
    total_sellable_units = 0,
    discount = 0,
    profit_margin = 0,
    sales_tax = 0,
  } = computed;

  const [minMargin, setMinMargin] = useState(10);
  const [maxMargin, setMaxMargin] = useState(90);
  const [step, setStep] = useState(10);

  const scenarios = [];
  for (let m = minMargin; m <= maxMargin; m += step) {
    scenarios.push(m);
  }

  const data = scenarios.map((margin) => {
    const sellingPrice = totalCPP / (1 - margin / 100);
    const discountCost = sellingPrice * (discount / 100);
    const discountedPrice = sellingPrice - discountCost;
    const profit = discountedPrice - totalCPP;
    const netProfit = profit * total_sellable_units;
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;
    const tax = discountedPrice * (sales_tax / 100);
    const finalPrice = discountedPrice + tax;

    return {
      margin: `${margin}%`,
      profit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      isCurrent: margin === Number(profit_margin),
    };
  });

  const inputClass =
    "w-14 text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white";

  return (
    <ProductCardLayout title="Margin Scenarios" icon={BarChart2}>
      <div className="flex items-center gap-3 px-3 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium">Min</span>
          <input
            type="number"
            min={1}
            max={maxMargin - step}
            value={minMargin}
            onChange={(e) => setMinMargin(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium">Max</span>
          <input
            type="number"
            min={minMargin + step}
            max={99}
            value={maxMargin}
            onChange={(e) => setMaxMargin(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium">Step</span>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className={inputClass}
          >
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
          </select>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
          <span className="text-xs text-slate-400">
            Current: {profit_margin}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="margin"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={45}
            tickFormatter={(v) => `₱${v}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={40}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            iconType="circle"
            iconSize={8}
          />
          <Bar yAxisId="right" dataKey="roi" name="ROI %" barSize={24} fill="#6e99f0">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.isCurrent ? "#2563eb" : "#6e99f0"}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </Bar>
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="profit"
            name="Profit / Unit"
            stroke="#4ade80"
            strokeWidth={2.5}
            dot={{ fill: "#4ade80", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="finalPrice"
            name="Final Price"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: "#f59e0b", r: 2, strokeWidth: 0 }}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default MarginScenarioChart;