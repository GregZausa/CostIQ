import { useState } from "react";
import {
  Sparkles,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Zap,
} from "lucide-react";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";
import ProductCardLayout from "../layout/ProductCardLayout";
import { fetchCostOptimization } from "../../services/gemini.api";

const priorityConfig = {
  high: {
    color: "text-red-600",
    bg: "bg-red-50 border-red-100",
    dot: "bg-red-500",
  },
  medium: {
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-100",
    dot: "bg-yellow-500",
  },
  low: {
    color: "text-green-600",
    bg: "bg-green-50 border-green-100",
    dot: "bg-green-500",
  },
};

const difficultyConfig = {
  easy: "text-green-600 bg-green-50",
  moderate: "text-yellow-600 bg-yellow-50",
  hard: "text-red-600 bg-red-50",
};

const scoreConfig = (score) => {
  if (score >= 80)
    return {
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
      label: "Excellent",
    };
  if (score >= 60)
    return {
      color: "text-yellow-600",
      bg: "bg-yellow-50 border-yellow-200",
      label: "Good",
    };
  if (score >= 40)
    return {
      color: "text-orange-600",
      bg: "bg-orange-50 border-orange-200",
      label: "Needs Improvement",
    };
  return {
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    label: "Critical",
  };
};

const CostOptimizationCard = ({ computed }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  const handleAnalyze = async () => {
    if (!computed?.product_id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCostOptimization(computed.product_id);
      setAnalysis(data);
    } catch {
      setError("Failed to fetch analysis. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const config = analysis ? scoreConfig(analysis.overallScore) : null;

  return (
    <ProductCardLayout title="AI Cost Optimization" icon={TrendingDown}>
      <div className="space-y-3">
        {tokenInfo && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-xs text-slate-400">AI Tokens</span>
            <span className="text-xs font-semibold text-slate-600">
              {tokenInfo.tokensRemaining} remaining this month
            </span>
          </div>
        )}

        {/* Score */}
        {analysis && config && (
          <>
            <div
              className={`flex items-center justify-between px-4 py-3 border rounded-xl ${config.bg}`}
            >
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Cost Efficiency Score
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {analysis.summary}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${config.color}`}>
                  {analysis.overallScore}
                </p>
                <p className={`text-xs font-semibold ${config.color}`}>
                  {analysis.scoreLabel}
                </p>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths?.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Strengths
                </p>
                {analysis.strengths.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg"
                  >
                    <CheckCircle
                      size={12}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-green-700">{s}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions?.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Suggestions
                </p>
                {analysis.suggestions.map((s, i) => {
                  const p = priorityConfig[s.priority];
                  return (
                    <div
                      key={i}
                      className={`px-3 py-2 border rounded-xl ${p.bg}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${p.dot}`}
                          />
                          <p className={`text-xs font-bold ${p.color}`}>
                            {s.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${difficultyConfig[s.difficulty]}`}
                          >
                            {s.difficulty}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${p.color} bg-white border`}
                          >
                            {s.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{s.suggestion}</p>
                      {s.potentialSaving && (
                        <p className="text-[10px] text-slate-400 mt-1">
                          💰 {s.potentialSaving}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Wins */}
            {analysis.quickWins?.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Quick Wins
                </p>
                {analysis.quickWins.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg"
                  >
                    <Zap
                      size={12}
                      className="text-indigo-500 shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-indigo-700">{w}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[10px] text-slate-300 text-right">
              Powered by {analysis.modelUsed}
            </p>
          </>
        )}

        {error && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle size={13} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        {!analysis && !loading && (
          <p className="text-xs text-slate-400 text-center px-3">
            Click analyze to get AI-powered cost optimization suggestions for
            this product.
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !computed?.product_id}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <TrendingDown size={13} />
          {loading
            ? "Analyzing..."
            : analysis
              ? "Re-analyze"
              : "Analyze Cost Efficiency"}
        </button>
      </div>
    </ProductCardLayout>
  );
};

export default CostOptimizationCard;
