import { useState } from "react";
import { createCheckoutSession } from "../../services/subscriptions.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/ThemeContext";

const features = [
  { label: "Product Costing", free: true, premium: true },
  { label: "Basic Dashboard", free: true, premium: true },
  { label: "Up to 3 Products", free: true, premium: false },
  { label: "Unlimited Products", free: false, premium: true },
  { label: "Financial Overview Report", free: false, premium: true },
  { label: "Product Cost Summary Report", free: false, premium: true },
  { label: "Pricing Guide Report", free: false, premium: true },
  { label: "What-If Income Goal", free: false, premium: true },
  { label: "PDF & Excel Export", free: false, premium: true },
  { label: "Advanced Dashboard Analytics", free: false, premium: true },
  { label: "Priority Support", free: false, premium: true },
  { label: "AI Insights", free: false, premium: true },
];

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const isPremium = user?.is_premium;

  const handleUpgrade = async () => {
    setLoading(true);
    await createCheckoutSession(billing);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 ">
        <h1
          className={`text-3xl font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
        >
          Simple, Honest Pricing
        </h1>
        <p className="text-slate-500 mt-2">
          Free tells you what your costs are. Premium tells you what to do about
          them.
        </p>

        {isPremium && (
          <div className={`mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-full`}>
            ⚡ You're on Premium
            {user?.premium_until && (
              <span className="text-green-500 text-xs">
                · Renews{" "}
                {new Date(user.premium_until).toLocaleDateString("en-PH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        )}

        {!isPremium && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-700 ${billing === "monthly" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-700 ${billing === "annual" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save ₱589
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className={`border rounded-2xl p-6 transition-all ${isPremium ? "border-slate-100 opacity-60" : "border-slate-200"}`}
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Free</h2>
            <div className="text-3xl font-bold text-slate-800 mt-2">₱0</div>
            <p className="text-slate-500 text-sm mt-1">Forever free</p>
          </div>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <span className={f.free ? "text-green-500" : "text-slate-300"}>
                  {f.free ? "✓" : "✕"}
                </span>
                <span
                  className={`text-sm ${f.free ? "text-slate-700" : "text-slate-400"}`}
                >
                  {f.label}
                </span>
              </div>
            ))}
          </div>
          <button
            disabled
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-slate-400 text-sm font-medium cursor-not-allowed"
          >
            {isPremium ? "Not your plan" : "Current Plan"}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border-2 border-slate-800 rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1 rounded-full">
            {isPremium ? "✓ YOUR PLAN" : "RECOMMENDED"}
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Premium</h2>
            <div className="text-3xl font-bold text-slate-800 mt-2">
              {billing === "monthly" ? "₱299" : "₱2,999"}
              <span className="text-base font-normal text-slate-500">
                {billing === "monthly" ? "/month" : "/year"}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              {isPremium
                ? `Active until ${new Date(user?.premium_until).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}`
                : billing === "annual"
                  ? "₱250/month billed annually"
                  : "Billed monthly"}
            </p>
          </div>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>

          {isPremium ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-all"
            >
              ✓ Go to Dashboard
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all disabled:opacity-50"
            >
              {loading
                ? "Redirecting..."
                : `Get Premium — ${billing === "monthly" ? "₱299/mo" : "₱2,999/yr"}`}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Payments are securely processed by PayMongo. Cancel anytime.
      </p>
    </div>
  );
};

export default Pricing;
