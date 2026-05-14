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
  Cell,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingDown } from "lucide-react";
import { useAuth } from "../../../context/useAuth";
import PremiumCard from "../../cards/PremiumCard";
import { useTheme } from "../../../context/ThemeContext";
import { chartColors } from "../../../utils/palette";

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  rounded-xl px-3 py-2.5 shadow-md space-y-1.5 text-xs`}
      >
        <p
          className={`font-semibold border-b ${isDark ? "text-slate-100 border-slate-700" : "text-slate-700 border-slate-100"} pb-1 mb-1`}
        >
          Discount: {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400">{entry.name}</span>
            </div>
            <span
              className={`font-semibold  ${isDark ? "text-slate-100" : "text-slate-700"}`}
            >
              {entry.name === "ROI %" ? `${entry.value}%` : `₱${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const inputClass =
  "w-14 text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50";
const inputClassDark =
  "w-14 text-xs border border-slate-600 rounded-lg px-2 py-1.5 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-700 bg-slate-800";

const PricingGuideChart = ({ computed = {} }) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
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
      {!user?.is_premium ? (
        <PremiumCard message="Unlock pricing guide to check how different prices works" />
      ) : (
        <>
          <div className="flex items-center gap-3 px-3 pt-2 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">
                Max Discount
              </span>
              <input
                type="number"
                min={10}
                max={99}
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(Number(e.target.value))}
                className={isDark ? inputClassDark : inputClass}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">Step</span>
              <select
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className={isDark ? inputClassDark : inputClass}
              >
                <option value={5}>5%</option>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
              </select>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2.5 h-2.5 rounded-sm ${isDark ? "bg-blue-300" : "bg-blue-700"}`}
                />
                <span className="text-xs text-slate-400">
                  Current: {discount}%
                </span>
              </div>
              {breakEvenDiscount && (
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-0.5 bg-red-400"
                    style={{ borderTop: "2px dashed #f87171" }}
                  />
                  <span className="text-xs text-red-400">
                    Break-even: {breakEvenDiscount.discount}
                  </span>
                </div>
              )}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="discount"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={45}
                tickFormatter={(v) => `₱${v}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={40}
                unit="%"
              />
              <Tooltip
                content={<CustomTooltip isDark={isDark} />}
                cursor={{
                  fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                iconType="circle"
                iconSize={8}
              />

              {breakEvenDiscount && (
                <ReferenceLine
                  x={breakEvenDiscount.discount}
                  yAxisId="left"
                  stroke="#f87171"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />
              )}

              <Area
                yAxisId="left"
                type="monotone"
                dataKey="finalPrice"
                name="Final Price"
                fill={`${isDark ? chartColors.yellow.dark : chartColors.yellow.light}`}
                stroke={`${isDark ? chartColors.yellow.dark : chartColors.yellow.light}`}
                strokeWidth={2}
                dot={false}
              />
              <Bar
                yAxisId="right"
                dataKey="roi"
                name="ROI %"
                barSize={24}
                fill={`${isDark ? chartColors.blue.dark : chartColors.blue.light}`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.isCurrent
                        ? isDark
                          ? chartColors.blue.highlightedDark
                          : chartColors.blue.highlightedLight
                        : isDark
                          ? chartColors.blue.dark
                          : chartColors.blue.light
                    }
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </Bar>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="profit"
                name="Profit / Unit"
                stroke={`${isDark ? chartColors.green.dark : chartColors.green.light}`}
                strokeWidth={2.5}
                dot={{
                  fill: isDark
                    ? chartColors.green.dark
                    : chartColors.green.light,
                  r: 3,
                  strokeWidth: 0,
                }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      )}
    </ProductCardLayout>
  );
};

export default PricingGuideChart;
