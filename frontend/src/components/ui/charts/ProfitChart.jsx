import React from "react";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-sm font-bold" style={{ color: payload[0].fill }}>
          ₱{Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

// 0 = lowest (red), 0.5 = middle (yellow), 1 = highest (green)
const getGradientColor = (ratio) => {
  if (ratio <= 0.5) {
    const r = 248;
    const g = Math.round(113 + (204 - 113) * (ratio / 0.5));
    const b = Math.round(113 - 113 * (ratio / 0.5));
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const r = Math.round(248 - (248 - 74) * ((ratio - 0.5) / 0.5));
    const g = Math.round(204 + (222 - 204) * ((ratio - 0.5) / 0.5));
    const b = Math.round(128 * ((ratio - 0.5) / 0.5));
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const ProfitChart = ({ data = [] }) => {
  const sorted = [...data].sort((a, b) => b.profit - a.profit);
  const max = sorted.length - 1;
  const maxValue = Math.max(...sorted.map((d) => d.profit), 0);

  return (
    <ProductCardLayout title="Profit per Product" icon={TrendingUp}>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          layout="vertical"
          data={sorted}
          margin={{ top: 5, right: 30, bottom: 5, left: 60 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => `₱${v}`}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            domain={[0, maxValue + 10]}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar
            dataKey="profit"
            name="Profit"
            barSize={16}
            radius={[0, 6, 6, 0]}
          >
            {sorted.map((entry, index) => (
              <Cell
                key={index}
                fill={getGradientColor(max === 0 ? 1 : (max - index) / max)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default ProfitChart;
