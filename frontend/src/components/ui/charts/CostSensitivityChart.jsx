// CostSensitivityChart.jsx
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
  ReferenceLine,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import PremiumCard from "../../cards/PremiumCard";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md space-y-1.5 text-xs">
        <p className="font-semibold text-slate-700 border-b border-slate-100 pb-1 mb-1">
          Cost Change: {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500">{entry.name}</span>
            </div>
            <span className="font-semibold text-slate-700">
              {entry.name === "ROI %" ? `${entry.value}%` : `₱${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CHANGES = [-20, -10, 0, 10, 20];

const CostSensitivityChart = ({ computed = {} }) => {
  const [costType, setCostType] = useState("all");
  const { user } = useTheme();

  const {
    totalCPP = 0,
    totalCPB = 0,
    total_sellable_units = 0,
    profit_margin = 0,
    sales_tax = 0,
    materialCPB: ingredients_cost = 0,
    employeeCPB: labor_cost = 0,
    otherExpenseCPB: expense_cost = 0,
  } = computed;

  const data = CHANGES.map((pct) => {
    const multiplier = 1 + pct / 100;

    let adjustedIngredients = Number(ingredients_cost);
    let adjustedLabor = Number(labor_cost);
    let adjustedExpenses = Number(expense_cost);

    if (costType === "all") {
      adjustedIngredients *= multiplier;
      adjustedLabor *= multiplier;
      adjustedExpenses *= multiplier;
    } else if (costType === "ingredients") {
      adjustedIngredients *= multiplier;
    } else if (costType === "labor") {
      adjustedLabor *= multiplier;
    } else if (costType === "expenses") {
      adjustedExpenses *= multiplier;
    }

    const adjustedCPB = adjustedIngredients + adjustedLabor + adjustedExpenses;
    const adjustedCPP = adjustedCPB / Number(total_sellable_units || 1);
    const sellingPrice = adjustedCPP / (1 - Number(profit_margin) / 100);
    const tax = sellingPrice * (Number(sales_tax) / 100);
    const finalPrice = sellingPrice + tax;
    const profitPerUnit = sellingPrice - adjustedCPP;
    const netProfit = profitPerUnit * Number(total_sellable_units);
    const roi = adjustedCPB > 0 ? (netProfit / adjustedCPB) * 100 : 0;

    return {
      change: pct === 0 ? "Current" : `${pct > 0 ? "+" : ""}${pct}%`,
      isCurrent: pct === 0,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      profitPerUnit: parseFloat(profitPerUnit.toFixed(2)),
      roi: parseFloat(roi.toFixed(2)),
      cogs: parseFloat(adjustedCPP.toFixed(2)),
    };
  });

  const inputClass =
    "text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white";

  return (
    <ProductCardLayout title="Cost Sensitivity Analysis" icon={TrendingUp}>
      {!user?.is_premium ? (
        <PremiumCard message="Unlock pricing guide to check how different prices works" />
      ) : (
        <>
          <div className="flex items-center gap-3 px-3 pt-2 pb-1">
            <span className="text-xs text-slate-400 font-medium">Adjust</span>
            <select
              value={costType}
              onChange={(e) => setCostType(e.target.value)}
              className={inputClass}
            >
              <option value="all">All Costs</option>
              <option value="ingredients">Ingredients Only</option>
              <option value="labor">Labor Only</option>
              <option value="expenses">Expenses Only</option>
            </select>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                <span className="text-xs text-slate-400">Current</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="change"
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
                content={<CustomTooltip />}
                cursor={{ fill: "#f8fafc" }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                iconType="circle"
                iconSize={8}
              />
              <ReferenceLine
                x="Current"
                yAxisId="left"
                stroke="#6366f1"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <Bar
                yAxisId="left"
                dataKey="cogs"
                name="COGS/Unit"
                barSize={24}
                fill="#6e99f0"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="profitPerUnit"
                name="Profit/Unit"
                stroke="#4ade80"
                strokeWidth={2.5}
                dot={{ fill: "#4ade80", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="roi"
                name="ROI %"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ fill: "#f59e0b", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      )}
    </ProductCardLayout>
  );
};

export default CostSensitivityChart;
