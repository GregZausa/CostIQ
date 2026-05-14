import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { PieChart as PieIcon } from "lucide-react";
import { chartColors, costPerProductColor } from "../../../utils/palette";
import { useTheme } from "../../../context/ThemeContext";

const COLORS = costPerProductColor;

const CustomTooltip = ({ active, payload, isDark }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div
        className={`border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  rounded-xl px-3 py-2.5 shadow-md space-y-1.5 text-xs`}
      >
        <p
          className={`${isDark ? "text-slate-200" : "text-slate-600"} font-medium`}
        >
          {name}
        </p>
        <p
          className={`${isDark ? "text-slate-50" : "text-slate-800"} font-semibold`}
        >
          ₱{Number(value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const CostPerProductChart = ({ computed = {} }) => {
  const { isDark } = useTheme();
  const {
    materialCPP = 0,
    employeeCPP = 0,
    otherExpenseCPP = 0,
    totalCPP = 0,
  } = computed;

  const data = [
    { name: "Materials", value: parseFloat(Number(materialCPP).toFixed(2)) },
    { name: "Labor", value: parseFloat(Number(employeeCPP).toFixed(2)) },
    { name: "Others", value: parseFloat(Number(otherExpenseCPP).toFixed(2)) },
  ].filter((d) => d.value > 0);

  const total = Number(totalCPP);

  return (
    <ProductCardLayout title="Cost Breakdown" icon={PieIcon}>
      <div className="p-3">
        <ResponsiveContainer width="100%" height={275}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]?.fill}
                  stroke="none"
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={`${isDark ? chartColors.neutral.dark : chartColors.neutral.light}`}
              fontSize={16}
              fontWeight={600}
            >
              ₱{total.toFixed(2)}
            </text>
            <text
              x="50%"
              y="57%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={`${isDark ? chartColors.neutral.dark : chartColors.neutral.light}`}
              fontSize={11}
            >
              Cost / Unit
            </text>
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Legend
              formatter={(value, entry) => {
                const val = entry?.payload?.value ?? 0;
                return (
                  <span className="text-xs text-slate-400">
                    {value} — ₱{val.toFixed(2)} (
                    {((val / total) * 100).toFixed(1)}%)
                  </span>
                );
              }}
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ProductCardLayout>
  );
};

export default CostPerProductChart;
