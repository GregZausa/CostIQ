import { useState } from "react";
import { TrendingUp } from "lucide-react";
import Headers from "../components/layout/Headers";
import SalesDashboard from "./SalesDashboard";
import SalesHistory from "./SalesHistory";
import SalesAIAnalysis from "./SalesAIAnalysis";
import { useSales } from "../hooks/sales/useSales";
import useProducts from "../hooks/products/useProducts";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";

const TABS = [
  { id: "tracker", label: "Daily Tracker" },
  { id: "history", label: "Sales History", premium: true },
  { id: "ai", label: "AI Analysis", premium: true },
];

const Sales = () => {
  const [activeTab, setActiveTab] = useState("tracker");
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { query } = useProducts();
  const {
    dashboard,
    todaySales,
    history,
    loading,
    handleLogSale,
    handleUpdateGoal,
  } = useSales();

  return (
    <div>
      <Headers
        icon={<TrendingUp size={20} className="text-indigo-500" />}
        title="Sales Tracker"
        subTitle="Log your daily sales and track your business growth."
        isDark={isDark}
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-700/50 mb-4 mt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.premium && !user?.is_premium) return;
              setActiveTab(tab.id);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-amber-400 text-amber-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            } ${tab.premium && !user?.is_premium ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {tab.label}
            {tab.premium && !user?.is_premium && (
              <span className="text-[9px] font-bold tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/20 px-1.5 py-0.5 rounded-full">
                PRO
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "tracker" && (
        <SalesDashboard
          dashboard={dashboard}
          todaySales={todaySales}
          products={query?.products ?? []}
          user={user}
          onLog={handleLogSale}
          onUpdateGoal={handleUpdateGoal}
          loading={loading}
        />
      )}

      {activeTab === "history" && user?.is_premium && (
        <SalesHistory userId={user?.id} />
      )}

      {activeTab === "ai" && user?.is_premium && (
        <SalesAIAnalysis userId={user?.id} />
      )}
    </div>
  );
};

export default Sales;
