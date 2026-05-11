import React, { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { Activity } from "lucide-react";
import { getRandomColor } from "../../../utils/palette";
import { useAuth } from "../../../context/useAuth";
import PremiumCard from "../../cards/PremiumCard";
import { useTheme } from "../../../context/ThemeContext";

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}   rounded-xl px-3 py-2.5 shadow-md text-xs space-y-1.5`}
      >
        <p
          className={`font-bold border-b ${isDark ? "text-slate-100 border-slate-700 " : "text-slate-700 border-slate-100"}   pb-1`}
        >
          {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-400">{entry.name}</span>
            </div>
            <span
              className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}`}
            >
              {Number(entry.value).toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CostEfficiencyRadarChart = ({ data = [], products = [] }) => {
  const [highlighted, setHighlighted] = useState(null);
  const { user } = useAuth();
  const { isDark } = useTheme();

  const COLORS = React.useMemo(
    () => Array.from({ length: 7 }, () => getRandomColor(isDark)),
    [isDark],
  );

  if (data.length === 0 || products.length === 0) return null;

  return (
    <ProductCardLayout title="Cost Efficiency Radar" icon={Activity}>
      {!user?.is_premium ? (
        <PremiumCard />
      ) : (
        <>
          <div className="flex items-center gap-2 px-3 pt-1 pb-1 flex-wrap">
            {products.map((p, i) => (
              <button
                key={p.product_name}
                onClick={() =>
                  setHighlighted(
                    highlighted === p.product_name ? null : p.product_name,
                  )
                }
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-all border ${
                  highlighted === null || highlighted === p.product_name
                    ? "opacity-100"
                    : "opacity-30"
                }`}
                style={{
                  borderColor: COLORS[i % COLORS.length],
                  color: COLORS[i % COLORS.length],
                  backgroundColor:
                    highlighted === p.product_name
                      ? `${COLORS[i % COLORS.length]}20`
                      : "transparent",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {p.product_name.length > 10
                  ? p.product_name.slice(0, 10) + "…"
                  : p.product_name}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <RadarChart
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
            >
              <PolarGrid
                stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}
              />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "#cbd5e1" }}
                tickCount={4}
              />
              <Tooltip content={<CustomTooltip isDark={isDark} />} />
              {products.map((p, i) => (
                <Radar
                  key={p.product_name}
                  name={p.product_name}
                  dataKey={p.product_name}
                  stroke={COLORS[i % COLORS.length]}
                  fill={COLORS[i % COLORS.length]}
                  fillOpacity={
                    highlighted === null
                      ? 0.15
                      : highlighted === p.product_name
                        ? 0.3
                        : 0.03
                  }
                  strokeOpacity={
                    highlighted === null
                      ? 0.8
                      : highlighted === p.product_name
                        ? 1
                        : 0.2
                  }
                  strokeWidth={highlighted === p.product_name ? 2.5 : 1.5}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </>
      )}
    </ProductCardLayout>
  );
};

export default CostEfficiencyRadarChart;
