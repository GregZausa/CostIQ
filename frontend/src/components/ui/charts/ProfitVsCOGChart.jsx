import React from "react";
import ProductCardLayout from "../../layout/ProductCardLayout";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart2 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-lg shadow-lg px-3 py-2 space-y-1">
        <p className="text-xs font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-xs text-slate-500">{entry.name}:</span>
            <span className="text-xs font-bold" style={{ color: entry.fill }}>
              ₱{Number(entry.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ProfitVsCOGChart = ({ data = [] }) => {
  return (
    <ProductCardLayout title="Price Vs. COGS" icon={BarChart2}>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          barGap={4}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={(v) => `₱${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="cogs"
            name="COGS"
            barSize={24}
            fill="#f87171"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="sellingPrice"
            name="Selling Price"
            barSize={24}
            fill="#4ade80"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ProductCardLayout>
  );
};

export default ProfitVsCOGChart;