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

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value);

    const formattedValue = formatter ? formatter(value) : value.toFixed(2);

    return (
      <div className="bg-white border border-slate-100 rounded-lg shadow-lg px-3">
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-xs font-bold" style={{ color: payload[0].fill }}>
          {formattedValue}
        </p>
      </div>
    );
  }
  return null;
};

const HorizontalChart = ({ data = [], formatter, fillType, title }) => {
  const maxValue = Math.max(...data.map((d) => d.data), 0);

  const truncated = data.map((d) => ({
    ...d,
    name: d.name.length > 10 ? d.name.slice(0, 10) + "..." : d.name,
  }));

  return (
    <ProductCardLayout title={title} icon={TrendingUp}>
      <ResponsiveContainer width="100%" height={Math.max(data.length * 22, 30)}>
        <BarChart
          layout="vertical"
          data={truncated}
          margin={{ top: 0, right: 15, bottom: 0, left: 15 }}
          barCategoryGap="15%"
        >
          <XAxis type="number" hide domain={[0, maxValue + 10]} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: "#475569", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            content={<CustomTooltip formatter={formatter} />}
            cursor={{ fill: "#f8fafc" }}
          />
          <Bar dataKey="data" barSize={16} radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  fillType === "positive"
                    ? "#4ade80"
                    : fillType === "negative"
                      ? "#f87171"
                      : "#334155"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default HorizontalChart;
