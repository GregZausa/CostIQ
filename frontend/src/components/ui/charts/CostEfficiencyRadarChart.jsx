import React, { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { Activity } from "lucide-react";
import { getRandomColor } from "../../../utils/palette";

const COLORS = Array.from({ length: 7 }, () => getRandomColor());
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md text-xs space-y-1.5">
        <p className="font-bold text-slate-700 border-b border-slate-100 pb-1">
          {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400">{entry.name}</span>
            </div>
            <span className="font-semibold text-slate-700">
              {Number(entry.value).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CostEfficiencyRadarChart = ({ data = [], products = [] }) => {
  const [highlighted, setHighlighted] = useState(null);

  if (data.length === 0 || products.length === 0) return null;

  return (
    <ProductCardLayout
      title="Cost Efficiency Radar"
      icon={Activity}
    >
      <div className="flex items-center gap-2 px-3 pt-1 pb-1 flex-wrap">
        {products.map((p, i) => (
          <button
            key={p.product_name}
            onClick={() =>
              setHighlighted(
                highlighted === p.product_name ? null : p.product_name,
              )
            }
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all border ${
              highlighted === null || highlighted === p.product_name
                ? "opacity-100"
                : "opacity-30"
            }`}
            style={{
              borderColor: COLORS[i % COLORS.length],
              color: COLORS[i % COLORS.length],
              backgroundColor:
                highlighted === p.product_name
                  ? `${COLORS[i % COLORS.length]}20`
                  : "transparent",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {p.product_name.length > 10
              ? p.product_name.slice(0, 10) + "…"
              : p.product_name}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "#cbd5e1" }}
            tickCount={4}
          />
          <Tooltip content={<CustomTooltip />} />
          {products.map((p, i) => (
            <Radar
              key={p.product_name}
              name={p.product_name}
              dataKey={p.product_name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={
                highlighted === null
                  ? 0.15
                  : highlighted === p.product_name
                  ? 0.3
                  : 0.03
              }
              strokeOpacity={
                highlighted === null
                  ? 0.8
                  : highlighted === p.product_name
                  ? 1
                  : 0.2
              }
              strokeWidth={highlighted === p.product_name ? 2.5 : 1.5}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default CostEfficiencyRadarChart;