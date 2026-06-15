import { useState } from "react";
import { Sparkles } from "lucide-react";
import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";
import toast from "react-hot-toast";
import { fetchSalesAnalysis } from "../services/gemini.api";

const SalesAIAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const data = await fetchSalesAnalysis();
      setAnalysis(data.analysis);
    } catch (err) {
      toast.error(err.message || "Failed to analyze sales data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-100 mb-1">
              AI Sales Analysis
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Our AI analyzes your sales patterns, product performance, and goal
              progress to give you actionable insights for your business.
            </p>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/30 text-purple-400 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={13} />
              {loading ? "ANALYZING..." : "ANALYZE MY SALES"}
            </button>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="bg-slate-800/40 border border-purple-400/20 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
              AI Insights
            </span>
          </div>
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesAIAnalysis;
