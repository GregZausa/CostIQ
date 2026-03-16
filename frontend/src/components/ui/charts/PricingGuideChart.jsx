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
  ReferenceLine,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingDown } from "lucide-react";

const PricingGuideChart = ({ computed = {} }) => {
  const {
    totalCPP = 0,
    totalCPB = 0,
    total_sellable_units = 0,
    profit_margin = 0,
    sales_tax = 0,
    discount = 0,
  } = computed;

  const [maxDiscount, setMaxDiscount] = useState(50);
  const [step, setStep] = useState(10);

  const scenarios = [];
  for (let d = 0; d <= maxDiscount; d += step) {
    scenarios.push(d);
  }

  const data = scenarios.map((d) => {
    const sellingPrice = totalCPP / (1 - Number(profit_margin) / 100);
    const discountCost = sellingPrice * (d / 100);
    const discountedPrice = sellingPrice - discountCost;
    const profit = discountedPrice - totalCPP;
    const tax = discountedPrice * (Number(sales_tax) / 100);
    const finalPrice = discountedPrice + tax;
    const netProfit = profit * Number(total_sellable_units);
    const roi = totalCPB > 0 ? (netProfit / totalCPB) * 100 : 0;

    return {
      discount: `${d}%`,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      isCurrent: d === Number(discount),
    };
  });
  const breakEvenDiscount = data.find((d) => d.profit <= 0);

  return (
    <ProductCardLayout title="Pricing Guide" icon={TrendingDown}>
      <div className="flex items-center gap-3 px-3 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600">Max Discount</span>
          <input
            type="number"
            min={10}
            max={99}
            value={maxDiscount}
            onChange={(e) => setMaxDiscount(Number(e.target.value))}
            className="w-14 text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600">Step</span>
          <select
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold"
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
              dataKey="discount"
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: "#475569" }}
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

            {/* reference line at break-even */}
            {breakEvenDiscount && (
              <ReferenceLine
                x={breakEvenDiscount.discount}
                yAxisId="left"
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{ value: "Break-even", fontSize: 10, fill: "#ef4444" }}
              />
            )}

            <Area
              yAxisId="left"
              dataKey="finalPrice"
              name="Final Price"
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth={1}
            />
            <Bar
              yAxisId="right"
              dataKey="roi"
              name="ROI %"
              barSize={28}
              fill="#3b82f6"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              name="Profit / Unit"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ fill: "#16a34a", r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-400 text-center mt-1">
          Current discount: {discount}% — red line marks break-even
        </p>
      </div>
    </ProductCardLayout>
  );
};

export default PricingGuideChart;