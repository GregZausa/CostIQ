import React from "react";
import ProductCardLayout from "../../layout/ProductCardLayout";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../../../context/ThemeContext";
import { chartColors } from "../../../utils/palette";

const CustomTooltip = ({ active, payload, label, formatter, isDark }) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value);

    const formattedValue = formatter ? formatter(value) : value.toFixed(2);

    return (
      <div
        className={`border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"} rounded-lg shadow-lg px-3`}
      >
        <p
          className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}  mb-1`}
        >
          {label}
        </p>
        <p
          className={`text-xs font-bold ${isDark ? "text-slate-100" : "text-slate-700"}`}
          style={{ color: payload[0].fill }}
        >
          {formattedValue}
        </p>
      </div>
    );
  }
  return null;
};

const HorizontalChart = ({ data = [], formatter, fillType, title, icon }) => {
  const { isDark } = useTheme();
  const maxValue = Math.max(...data.map((d) => d.data), 0);

  const truncated = data.map((d) => ({
    ...d,
    name: d.name.length > 10 ? d.name.slice(0, 10) + "..." : d.name,
  }));

  return (
    <ProductCardLayout title={title} icon={icon}>
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
            content={<CustomTooltip formatter={formatter} isDark={isDark} />}
            cursor={{
              fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            }}
          />
          <Bar dataKey="data" barSize={16} radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  fillType === "positive"
                    ? isDark
                      ? chartColors[fillType].dark
                      : chartColors[fillType].light
                    : fillType === "negative"
                      ? isDark
                        ? chartColors[fillType].dark
                        : chartColors[fillType].light
                      : isDark
                        ? chartColors[fillType].dark
                        : chartColors[fillType].light
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
