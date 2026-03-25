import React from "react";
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
  Cell,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const breakEven = payload.find((p) => p.dataKey === "breakEvenRevenue");
    const gap = payload.find((p) => p.dataKey === "gap");
    const capacity = payload.find((p) => p.dataKey === "revenueAtCapacity");

    const isViable = gap?.value > 0;

    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md text-xs space-y-1.5">
        <p className="font-bold text-slate-700 border-b border-slate-100 pb-1">
          {label}
        </p>
        {breakEven && (
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-slate-400">Break-even</span>
            </div>
            <span className="font-semibold text-slate-700">
              ₱{Number(breakEven.value).toLocaleString()}
            </span>
          </div>
        )}
        {gap && (
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Profit Zone</span>
            </div>
            <span
              className="font-semibold"
              style={{ color: isViable ? "#4ade80" : "#f87171" }}
            >
              {isViable ? "+" : ""}₱{Number(gap.value).toLocaleString()}
            </span>
          </div>
        )}
        {capacity && (
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-slate-400">Max Revenue</span>
            </div>
            <span className="font-semibold text-blue-500">
              ₱{Number(capacity.value).toLocaleString()}
            </span>
          </div>
        )}
        <div
          className={`text-center text-xs font-semibold pt-1 border-t border-slate-100 ${
            isViable ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {isViable ? "✅ Above Break-even" : "⚠️ Below Break-even"}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueGapChart = ({ data = [] }) => {
  if (data.length === 0) return null;

  return (
    <ProductCardLayout
      title="Revenue Potential vs Break-Even"
      icon={TrendingUp}
    >
      <div className="flex items-center gap-4 px-3 pt-1 pb-1 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-400" />
          <span className="text-xs text-slate-500">Break-even Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
          <span className="text-xs text-slate-500">Profit Zone</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span className="text-xs text-slate-500">Max Revenue</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 10 }}
          barCategoryGap="30%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) =>
              v.length > 8 ? v.slice(0, 8) + "…" : v
            }
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(v) => `₱${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />

          <Bar
            dataKey="breakEvenRevenue"
            name="Break-even"
            stackId="revenue"
            barSize={28}
            fill="#f87171"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gap"
            name="Profit Zone"
            stackId="revenue"
            barSize={28}
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.gap > 0 ? "#4ade80" : "#fca5a5"}
              />
            ))}
          </Bar>

          <Line
            type="monotone"
            dataKey="revenueAtCapacity"
            name="Max Revenue"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={{ fill: "#60a5fa", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            strokeDasharray="5 3"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default RevenueGapChart;