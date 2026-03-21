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
        <p className="text-sm font-bold text-emerald-500">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const ProfitMarginChart = ({ data = [] }) => {
  const maxValue = Math.max(...data.map((d) => d.profitMargin), 0);

  return (
    <ProductCardLayout
      title="Profit Margin per Product"
      icon={TrendingUp}
    >
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, bottom: 5, left: 60 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) => `${v}%`}
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
            dataKey="profitMargin"
            name="Profit Margin"
            barSize={16}
            radius={[0, 6, 6, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.profitMargin >= 50
                    ? "#4ade80"
                    : entry.profitMargin >= 25
                    ? "#facc15"
                    : "#f87171"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default ProfitMarginChart;