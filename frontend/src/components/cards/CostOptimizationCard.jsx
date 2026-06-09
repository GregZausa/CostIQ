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
import { useTheme } from "../../context/ThemeContext";

const priorityConfig = (isDark) => ({
  high: {
    color: isDark ? "text-red-200" : "text-red-600",
    bg: isDark ? "bg-red-800/20 border-red-700" : "bg-red-50 border-red-100",
    dot: isDark ? "bg-red-300" : "bg-red-500",
  },
  medium: {
    color: isDark ? "text-yellow-200" : "text-yellow-600",
    bg: isDark
      ? "bg-yellow-800/20 border-yellow-700"
      : "bg-yellow-50 border-yellow-100",
    dot: isDark ? "bg-yellow-300" : "bg-yellow-500",
  },
  low: {
    color: isDark ? "text-green-200" : "text-green-600",
    bg: isDark
      ? "bg-green-800/20 border-green-700"
      : "bg-green-50 border-green-100",
    dot: isDark ? "bg-green-300" : "bg-green-500",
  },
});

const difficultyConfig = (isDark) => ({
  easy: isDark
    ? "text-green-200 bg-green-800/20"
    : "text-green-600 bg-green-50",

  moderate: isDark
    ? "text-yellow-200 bg-yellow-800/20"
    : "text-yellow-600 bg-yellow-50",

  hard: isDark ? "text-red-200 bg-red-800/20" : "text-red-600 bg-red-50",
});

const scoreConfig = (score, isDark) => {
  if (score >= 80)
    return {
      color: isDark ? "text-green-200" : "text-green-600",
      bg: isDark
        ? "bg-green-800/20 border-green-700"
        : "bg-green-50 border-green-200",
      label: "Excellent",
    };

  if (score >= 60)
    return {
      color: isDark ? "text-yellow-200" : "text-yellow-600",
      bg: isDark
        ? "bg-yellow-800/20 border-yellow-700"
        : "bg-yellow-50 border-yellow-200",
      label: "Good",
    };

  if (score >= 40)
    return {
      color: isDark ? "text-orange-200" : "text-orange-600",
      bg: isDark
        ? "bg-orange-800/20 border-orange-700"
        : "bg-orange-50 border-orange-200",
      label: "Needs Improvement",
    };

  return {
    color: isDark ? "text-red-200" : "text-red-600",
    bg: isDark ? "bg-red-800/20 border-red-700" : "bg-red-50 border-red-200",
    label: "Critical",
  };
};

const CostOptimizationCard = ({ computed }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  const { isDark } = useTheme();

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

  const pConfig = priorityConfig(isDark);
  const dConfig = difficultyConfig(isDark);
  const config = analysis ? scoreConfig(analysis.overallScore, isDark) : null;

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
                <p
                  className={`text-xs ${isDark ? "text-slate-200" : "text-slate-600"} uppercase tracking-wider font-semibold`}
                >
                  Cost Efficiency Score
                </p>
                <p
                  className={`text-xs ${isDark ? "text-slate-200" : "text-slate-600"} mt-0.5`}
                >
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
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Strengths
                </p>
                {analysis.strengths.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-3 py-1.5 rounded-lg border ${
                      isDark
                        ? "bg-green-800/20 border-green-700"
                        : "bg-green-50 border-green-100"
                    }`}
                  >
                    <CheckCircle
                      size={12}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <p
                      className={`text-xs ${isDark ? "text-green-200" : "text-green-700"}`}
                    >
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions?.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Suggestions
                </p>
                {analysis.suggestions.map((s, i) => {
                  const p = pConfig[s.priority];

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
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${dConfig[s.difficulty]}`}
                          >
                            {s.difficulty}
                          </span>

                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${p.color} ${
                              isDark
                                ? "bg-slate-800 border-slate-700"
                                : "bg-white border"
                            }`}
                          >
                            {s.priority}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-xs ${
                          isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {s.suggestion}
                      </p>

                      {s.potentialSaving && (
                        <p
                          className={`text-[10px] mt-1 ${
                            isDark ? "text-slate-400" : "text-slate-400"
                          }`}
                        >
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
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Quick Wins
                </p>
                {analysis.quickWins.map((w, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-3 py-1.5 rounded-lg border ${
                      isDark
                        ? "bg-indigo-800/20 border-indigo-700"
                        : "bg-indigo-50 border-indigo-100"
                    }`}
                  >
                    <Zap
                      size={12}
                      className="text-indigo-500 shrink-0 mt-0.5"
                    />
                    <p
                      className={`text-xs ${isDark ? "text-indigo-200" : "text-indigo-700"}`}
                    >
                      {w}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
          className={`w-full py-2 ${isDark ? "bg-slate-50 hover:bg-slate-100 text-slate-800" : "bg-slate-800 hover:bg-slate-700 text-white"} text-xs font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
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
