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
  ReferenceLine,
  Cell,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingDown } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md space-y-1.5 text-xs">
        <p className="font-semibold text-slate-700 border-b border-slate-100 pb-1 mb-1">
          Discount: {label}
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

const inputClass =
  "w-14 text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white";

const PricingGuideChart = ({ computed = {} }) => {
  const {
    totalCPP = 0,
    totalCPB = 0,
    total_sellable_units = 0,
    profit_margin = 0,
    sales_tax = 0,
    discount = 0,
  } = computed;

  const [maxDiscount, setMaxDiscount] = useState(50);
  const [step, setStep] = useState(10);

  const scenarios = [];
  for (let d = 0; d <= maxDiscount; d += step) {
    scenarios.push(d);
  }

  const data = scenarios.map((d) => {
    const sellingPrice = totalCPP / (1 - Number(profit_margin) / 100);
    const discountCost = sellingPrice * (d / 100);
    const discountedPrice = sellingPrice - discountCost;
    const profit = discountedPrice - totalCPP;
    const tax = discountedPrice * (Number(sales_tax) / 100);
    const finalPrice = discountedPrice + tax;
    const netProfit = profit * Number(total_sellable_units);
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;

    return {
      discount: `${d}%`,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      isCurrent: d === Number(discount),
    };
  });

  const breakEvenDiscount = data.find((d) => d.profit <= 0);

  return (
    <ProductCardLayout title="Pricing Guide" icon={TrendingDown}>
      {/* Controls */}
      <div className="flex items-center gap-3 px-3 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-medium">Max Discount</span>
          <input
            type="number"
            min={10}
            max={99}
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(Number(e.target.value))}
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
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
            <span className="text-xs text-slate-400">Current: {discount}%</span>
          </div>
          {breakEvenDiscount && (
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 bg-red-400" style={{ borderTop: "2px dashed #f87171" }} />
              <span className="text-xs text-red-400">Break-even: {breakEvenDiscount.discount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="discount"
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

          {breakEvenDiscount && (
            <ReferenceLine
              x={breakEvenDiscount.discount}
              yAxisId="left"
              stroke="#f87171"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
          )}

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="finalPrice"
            name="Final Price"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
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
        </ComposedChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default PricingGuideChart;