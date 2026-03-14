import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ProductCardLayout from "../layout/ProductCardLayout";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = {
  Materials: { fill: "#818cf8", light: "#e0e7ff" },
  Labor: { fill: "#a78bfa", light: "#ede9fe" },
  Others: { fill: "#38bdf8", light: "#e0f2fe" },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-sm">
        <p className="text-slate-600 font-medium">{name}</p>
        <p className="text-slate-800 font-semibold">
          ₱{Number(value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const CostPerProductChart = ({ computed = {} }) => {
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
              fill="#1e293b"
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
              fill="#94a3b8"
              fontSize={11}
            >
              Cost / Unit
            </text>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value, entry) => (
                <span className="text-xs text-slate-600">
                  {value} — ₱{entry.payload.value.toFixed(2)} (
                  {((entry.payload.value / total) * 100).toFixed(1)}%)
                </span>
              )}
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ProductCardLayout>
  );
};

export default CostPerProductChart;
