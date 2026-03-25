import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from "recharts";
import ProductCardLayout from "../../layout/ProductCardLayout";
import { LayoutGrid } from "lucide-react";

const QUADRANTS = [
  { label: "🚀 Goldmine", color: "#4ade80" },
  { label: "⭐ Stars", color: "#facc15" },
  { label: "🔄 Optimize", color: "#60a5fa" },
  { label: "💀 Danger", color: "#f87171" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, x, y, z } = payload[0].payload;
    const profitColor = y >= 0 ? "#4ade80" : "#f87171";
    return (
      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 shadow-md text-xs space-y-1.5">
        <p className="font-bold text-slate-700 border-b border-slate-100 pb-1">
          {name}
        </p>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">COGS</span>
          <span className="font-semibold text-slate-700">₱{x.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Profit/Unit</span>
          <span className="font-semibold" style={{ color: profitColor }}>
            ₱{y.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">ROI</span>
          <span className="font-semibold text-blue-500">{z.toFixed(2)}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload, avgX, avgY } = props;
  const isGoldmine = payload.y > 0 && payload.z >= 50; // profitable + high ROI
  const isStar = payload.y > 0 && payload.z < 50; // profitable but lower ROI
  const isOptimize = payload.y <= 0 && payload.x <= avgX; // losing money but cheap
  const isDanger = payload.y <= 0 && payload.x > avgX; // losing money and expensive

  const color = isGoldmine
    ? "#4ade80"
    : isStar
      ? "#facc15"
      : isOptimize
        ? "#60a5fa"
        : "#f87171";

  const size = Math.max(16, Math.min(40, Math.abs(payload.z) / 5 + 16));

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={size / 2}
        fill={color}
        fillOpacity={0.85}
        stroke="white"
        strokeWidth={2}
      />
      <text
        x={cx}
        y={cy - size / 2 - 4}
        textAnchor="middle"
        fontSize={10}
        fill="#475569"
        fontWeight={500}
      >
        {payload.name.length > 8
          ? payload.name.slice(0, 8) + "…"
          : payload.name}
      </text>
    </g>
  );
};

const ProductPerformanceChart = ({ data = [], avgX, avgY }) => {
  if (data.length === 0) return null;

  return (
    <ProductCardLayout title="Product Performance Matrix" icon={LayoutGrid}>
      <div className="flex items-center gap-3 px-3 pt-1 pb-1 flex-wrap">
        {QUADRANTS.map((q) => (
          <div key={q.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: q.color }}
            />
            <span className="text-xs text-slate-500">{q.label}</span>
          </div>
        ))}
        <span className="text-xs text-slate-400 ml-auto">
          Bubble size = ROI %
        </span>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart margin={{ top: 0, right: 30, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              dataKey="x"
              name="COGS"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₱${v}`}
            >
              <Label
                value="Cost Per Unit (COGS)"
                offset={-10}
                position="insideBottom"
                style={{ fontSize: 11, fill: "#94a3b8" }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name="Profit"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₱${v}`}
              width={50}
            >
              <Label
                value="Profit / Unit"
                angle={-90}
                position="insideLeft"
                style={{ fontSize: 11, fill: "#94a3b8" }}
              />
            </YAxis>
            <ZAxis type="number" dataKey="z" range={[100, 800]} name="ROI" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
            <ReferenceLine
              x={avgX}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <ReferenceLine
              y={avgY}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            <Scatter
              data={data}
              shape={(props) => (
                <CustomDot {...props} avgX={avgX} avgY={avgY} />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ProductCardLayout>
  );
};

export default ProductPerformanceChart;
