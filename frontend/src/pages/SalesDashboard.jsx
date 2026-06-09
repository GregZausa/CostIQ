import { useState } from "react";
import { TrendingUp, Target, Plus, ShoppingBag } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LogSaleModal from "../components/modals/LogSaleModal";

const fmt = (n) =>
  `₱${Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SalesDashboard = ({
  dashboard,
  todaySales,
  products,
  user,
  onLog,
  onUpdateGoal,
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(user?.monthly_goal ?? 0);

  const { summary, productSummary, weeklyHistory } = dashboard ?? {};

  const monthlyGoal = Number(user?.monthly_goal ?? 0);
  const monthRevenue = Number(summary?.month_revenue ?? 0);
  const goalProgress =
    monthlyGoal > 0 ? Math.min((monthRevenue / monthlyGoal) * 100, 100) : 0;
  const isPremium = user?.is_premium;

  // Format weekly history for chart
  const chartData =
    weeklyHistory?.map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-PH", {
        month: "short",
        day: "numeric",
      }),
      revenue: parseFloat(d.revenue),
      profit: parseFloat(d.profit),
    })) ?? [];

  return (
    <div className="space-y-4">
      {/* Quick log button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Sales Tracker</h2>
          <p className="text-xs text-slate-500">
            {new Date().toLocaleDateString("en-PH", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowLogModal(true)}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20"
        >
          <Plus size={14} />
          LOG SALE
        </button>
      </div>

      {/* Today's metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Today's Revenue",
            value: fmt(summary?.today_revenue ?? 0),
            color: "text-amber-400",
            icon: "💰",
          },
          {
            label: "Today's Profit",
            value: fmt(summary?.today_profit ?? 0),
            color: "text-emerald-400",
            icon: "📈",
          },
          {
            label: "Units Sold",
            value: summary?.today_units ?? 0,
            color: "text-blue-400",
            icon: "📦",
          },
        ].map((m, i) => (
          <div
            key={i}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                {m.label}
              </p>
              <span className="text-base">{m.icon}</span>
            </div>
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly goal — FREE for all */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
              Monthly Goal
            </span>
          </div>
          <button
            onClick={() => setEditingGoal(!editingGoal)}
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            {editingGoal ? "Cancel" : "Edit"}
          </button>
        </div>

        {editingGoal ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="e.g. 30000"
              className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400/50 transition-all"
            />
            <button
              onClick={() => {
                onUpdateGoal(goalInput);
                setEditingGoal(false);
              }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl transition-all"
            >
              SAVE
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-100">
                {fmt(monthRevenue)}
              </span>
              <span className="text-sm text-slate-500">
                of {fmt(monthlyGoal)}
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-400 to-amber-300"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">
                {goalProgress.toFixed(1)}% achieved
              </span>
              <span className="text-xs text-slate-500">
                {monthlyGoal > monthRevenue
                  ? `${fmt(monthlyGoal - monthRevenue)} to go`
                  : "🎉 Goal reached!"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Weekly chart — PREMIUM only */}
      {isPremium ? (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
              Last 7 Days
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 10, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₱${v}`}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 12,
                }}
                labelStyle={{ color: "#94a3b8", fontSize: 12 }}
                formatter={(v, name) => [
                  `₱${Number(v).toLocaleString()}`,
                  name === "revenue" ? "Revenue" : "Profit",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#revenue)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#4ade80"
                strokeWidth={2}
                fill="url(#profit)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs text-slate-500">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-500">Profit</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-center space-y-2">
          <p className="text-sm font-bold text-slate-400">
            📊 Revenue & Profit Charts
          </p>
          <p className="text-xs text-slate-600">
            Upgrade to Premium to see your 7-day trend
          </p>
        </div>
      )}

      {/* Monthly breakdown — PREMIUM */}
      {isPremium && (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag size={14} className="text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
              This Month by Product
            </span>
          </div>
          <div className="space-y-3">
            {productSummary?.map((p, i) => {
              const maxProfit = Math.max(
                ...productSummary.map((x) => Number(x.total_profit)),
                1,
              );
              const pct =
                Number(p.total_profit) > 0
                  ? (Number(p.total_profit) / maxProfit) * 100
                  : 0;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">
                      {p.product_name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">
                        {p.total_units} units
                      </span>
                      <span className="font-bold text-emerald-400">
                        {fmt(p.total_profit)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {(!productSummary || productSummary.length === 0) && (
              <p className="text-xs text-slate-600 text-center py-4">
                No sales logged this month yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Today's log */}
      {todaySales.length > 0 && (
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">
            Today's Logs
          </p>
          <div className="space-y-2">
            {todaySales.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {s.product_name}
                  </p>
                  {s.notes && (
                    <p className="text-xs text-slate-500 mt-0.5">{s.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-400">
                    {fmt(s.revenue)}
                  </p>
                  <p className="text-xs text-emerald-400">
                    +{fmt(s.profit)} profit
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log modal */}
      {showLogModal && (
        <LogSaleModal
          products={products}
          onLog={onLog}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </div>
  );
};

export default SalesDashboard;
