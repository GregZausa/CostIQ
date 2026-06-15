import { useEffect, useState } from "react";
import { getMonthlySales } from "../services/sales.api";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  useEffect(() => {
    setLoading(true);
    getMonthlySales(year, month)
      .then((d) => setSales(d.sales ?? []))
      .finally(() => setLoading(false));
  }, [year, month]);

  const totalRevenue = sales.reduce((s, d) => s + Number(d.total_revenue), 0);
  const totalProfit = sales.reduce((s, d) => s + Number(d.total_profit), 0);
  const totalUnits = sales.reduce((s, d) => s + Number(d.total_units), 0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="space-y-4">
      {/* Month/Year selector */}
      <div className="flex items-center gap-3">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400/50 transition-all"
        >
          {months.map((m, i) => (
            <option key={i} value={i + 1} className="bg-slate-800">
              {m}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400/50 transition-all"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y} className="bg-slate-800">
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Revenue",
            value: `₱${Number(totalRevenue).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`,
            color: "text-amber-400",
          },
          {
            label: "Total Profit",
            value: `₱${Number(totalProfit).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`,
            color: "text-emerald-400",
          },
          { label: "Total Units", value: totalUnits, color: "text-blue-400" },
        ].map((m, i) => (
          <div
            key={i}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">
              {m.label}
            </p>
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Daily breakdown table */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">
          Daily Breakdown — {months[month - 1]} {year}
        </p>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sales.length === 0 ? (
          <p className="text-center text-slate-600 text-sm py-8">
            No sales logged for this month.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {["Date", "Units Sold", "Revenue", "Profit", "COGS"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left py-2 px-3 text-xs font-bold tracking-widest uppercase text-slate-500"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {sales.map((s, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {new Date(s.date).toLocaleDateString("en-PH", {
                        month: "short",
                        day: "numeric",
                        weekday: "short",
                      })}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {s.total_units}
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-400">
                      ₱
                      {Number(s.total_revenue).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-400">
                      ₱
                      {Number(s.total_profit).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      ₱
                      {Number(s.total_cogs).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
