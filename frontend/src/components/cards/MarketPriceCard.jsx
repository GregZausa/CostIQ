// MarketPriceCard.jsx
import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";
import { fetchMarketPriceAnalysis } from "../../services/gemini.api";
import ProductCardLayout from "../layout/ProductCardLayout";

const comparisonConfig = {
  competitive: {
    color: "text-green-600",
    bg: "bg-green-50 border-green-100",
    icon: <Minus size={14} className="text-green-600" />,
    label: "Competitive ✅",
  },
  too_high: {
    color: "text-red-600",
    bg: "bg-red-50 border-red-100",
    icon: <TrendingUp size={14} className="text-red-600" />,
    label: "Above Market ⚠️",
  },
  too_low: {
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-100",
    icon: <TrendingDown size={14} className="text-yellow-600" />,
    label: "Below Market 💡",
  },
};

const MarketPriceCard = ({ computed }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!computed?.product_id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMarketPriceAnalysis(computed.product_id);
      setAnalysis(data);
    } catch {
      setError("Failed to fetch market data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const config = analysis ? comparisonConfig[analysis.comparison] : null;

  return (
    <ProductCardLayout title="AI Market Price Analysis" icon={Sparkles}>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
          <span className="text-xs text-slate-500">Product Name</span>
          <span className="text-sm font-bold text-slate-800">
            {computed?.product_name}
          </span>
        </div>
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
          <span className="text-xs text-slate-500">Your Selling Price</span>
          <span className="text-sm font-bold text-slate-800">
            ₱{Number(computed?.finalPrice ?? 0).toFixed(2)}
          </span>
        </div>

        {analysis && config && (
          <>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-xs text-slate-500">Market Price Range</span>
              <span className="text-sm font-bold text-slate-800">
                ₱{analysis.marketPriceMin} — ₱{analysis.marketPriceMax}
              </span>
            </div>

            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-xs text-slate-500">Market Average</span>
              <span className="text-sm font-bold text-slate-800">
                ₱{analysis.marketAverage}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl ${config.bg}`}
            >
              {config.icon}
              <div>
                <p className={`text-xs font-bold ${config.color}`}>
                  {config.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {analysis.comparisonText}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-xl">
              <Sparkles size={13} className="text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-600">
                {analysis.recommendation}
              </p>
            </div>
          </>
        )}

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        {!analysis && !loading && (
          <p className="text-xs text-slate-400 text-center px-3">
            Click analyze to compare your price with the Philippine market.
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !computed?.product_id}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles size={13} />
          {loading
            ? "Analyzing..."
            : analysis
              ? "Re-analyze"
              : "Analyze Market Price"}
        </button>
      </div>
    </ProductCardLayout>
  );
};

export default MarketPriceCard;
