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
} from "recharts";
import ProductCardLayout from "../layout/ProductCardLayout";
import { BarChart2 } from "lucide-react";

const CustomBar = (props) => {
  const { x, y, width, height, payload } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={payload.isCurrent ? "#2563eb" : "#bfdbfe"}
      rx={4}
      ry={4}
    />
  );
};

const MarginScenarioChart = ({ computed = {} }) => {
  const {
    totalCPP = 0,
    totalCPB = 0,
    total_sellable_units = 0,
    discount = 0,
    profit_margin = 0,
    sales_tax = 0,
  } = computed;
  const [minMargin, setMinMargin] = useState(10);
  const [maxMargin, setMaxMargin] = useState(90);
  const [step, setStep] = useState(10);

  const scenarios = [];
  for (let m = minMargin; m <= maxMargin; m += step) {
    scenarios.push(m);
  }

  const data = scenarios.map((margin) => {
    const sellingPrice = totalCPP / (1 - margin / 100);
    const discountCost = sellingPrice * (discount / 100);
    const discountedPrice = sellingPrice - discountCost;
    const profit = discountedPrice - totalCPP;
    const netProfit = profit * total_sellable_units;
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;
    const tax = discountedPrice * (sales_tax / 100);
    const finalPrice = discountedPrice + tax;

    return {
      margin: `${margin}%`,
      profit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      isCurrent: margin === Number(profit_margin),
    };
  });

  return (
    <ProductCardLayout title="Margin Scenarios" icon={BarChart2}>
      <div className="flex items-center gap-3 px-3 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600">Min</span>
          <input
            type="number"
            min={1}
            max={maxMargin - step}
            value={minMargin}
            onChange={(e) => setMinMargin(Number(e.target.value))}
            className="w-14 text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-semibold"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600 ">Max</span>
          <input
            type="number"
            min={minMargin + step}
            max={99}
            value={maxMargin}
            onChange={(e) => setMaxMargin(Number(e.target.value))}
            className="w-14 text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-semibold"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600">Step</span>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-semibold"
          >
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
          </select>
        </div>
      </div>
      <div className="p-3">
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="margin"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={50}
              unit="%"
            />
            <Tooltip
              formatter={(value, name) =>
                name === "ROI %" ? `${value}%` : `₱${value}`
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar
              yAxisId="right"
              dataKey="roi"
              name="ROI % "
              barSize={28}
              shape={<CustomBar />}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              name="Profit / Unit"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 3 }}
            />
            <Area
              yAxisId="left"
              dataKey="finalPrice"
              name="Final Price "
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: "#f59e0b", r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-500 text-center mt-1">
          Current margin: {profit_margin}% highlighted in blue
        </p>
      </div>
    </ProductCardLayout>
  );
};

export default MarginScenarioChart;
