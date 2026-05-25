// Pricing.jsx
import { useState } from "react";
import { createCheckoutSession } from "../../services/subscriptions.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

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

// ← Only keeping CSS that Tailwind truly can't do:
// - CSS custom font imports
// - ::after shimmer pseudo-element on upgrade button
// - radial-gradient backgrounds (Tailwind doesn't support arbitrary radial gradients well)
// - noise texture background-image
// - grid background pattern
const minimalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .pricing-grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .noise {
    position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .pricing-glow {
    position: fixed; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
  }

  .upgrade-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .upgrade-btn:hover::after { transform: translateX(100%); }

  .bebas { font-family: 'Bebas Neue', sans-serif; }
  .dm-sans { font-family: 'DM Sans', sans-serif; }
`;

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isPremium = user?.is_premium;

  const handleUpgrade = async () => {
    setLoading(true);
    await createCheckoutSession(billing);
    setLoading(false);
  };

  return (
    <div className="dm-sans min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden bg-[#080c14] text-[#e8edf5]">
      <style>{minimalStyles}</style>

      <div className="noise" />
      <div className="pricing-grid-bg" />
      <div
        className="pricing-glow"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: "30%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        className="pricing-glow"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          right: 0,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            onClick={() => navigate("/")}
            className="bebas text-xl tracking-[3px] text-[#e8edf5]/40 mb-6 cursor-pointer inline-block hover:text-[#e8edf5]/60 transition-colors"
          >
            COST<span className="text-amber-400">IQ</span>
          </div>

          <h1 className="bebas text-5xl tracking-[2px] text-[#e8edf5] leading-none mb-3">
            SIMPLE, HONEST PRICING
          </h1>
          <p className="text-sm text-[#e8edf5]/50 max-w-sm mx-auto">
            Free tells you what your costs are. Premium tells you what to do
            about them.
          </p>

          {/* Premium badge */}
          {isPremium && (
            <div className="mt-5 inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase">
              ⚡ You're on Premium
              {user?.premium_until && (
                <span className="text-emerald-400/60 font-normal tracking-normal normal-case">
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

          {/* Billing toggle */}
          {!isPremium && (
            <div className="mt-7 flex justify-center">
              <div className="inline-flex bg-white/5 border border-white/8 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 dm-sans ${
                    billing === "monthly"
                      ? "bg-amber-400 text-[#080c14]"
                      : "bg-transparent text-[#e8edf5]/50 hover:text-[#e8edf5]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 dm-sans flex items-center gap-2 ${
                    billing === "annual"
                      ? "bg-amber-400 text-[#080c14]"
                      : "bg-transparent text-[#e8edf5]/50 hover:text-[#e8edf5]"
                  }`}
                >
                  Annual
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    SAVE ₱589
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-2 gap-5">
          {/* Free */}
          <div
            className={`relative bg-white/3 border border-white/8 rounded-2xl p-9 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] ${isPremium ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="mb-7">
              <p className="bebas text-sm tracking-[3px] text-[#e8edf5]/40 mb-3">
                FREE PLAN
              </p>
              <p className="bebas text-6xl text-[#e8edf5] leading-none">₱0</p>
              <p className="text-sm text-[#e8edf5]/40 mt-1">Forever free</p>
            </div>

            <div className="mb-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 py-1.5 border-b border-white/4 last:border-0 text-[13px]"
                >
                  {f.free ? (
                    <div className="w-4.5 h-4.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shrink-0 text-[10px] text-emerald-400">
                      ✓
                    </div>
                  ) : (
                    <div className="w-4.5 h-4.5 rounded-full bg-white/5 border border-white/8 flex items-center justify-center shrink-0 text-[10px] text-[#e8edf5]/20">
                      ✕
                    </div>
                  )}
                  <span
                    className={
                      f.free ? "text-[#e8edf5]/70" : "text-[#e8edf5]/25"
                    }
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="bebas w-full bg-white/3 text-[#e8edf5]/30 border border-white/[0.07] rounded-xl py-3.5 text-[17px] tracking-[2px] mt-6 text-center cursor-not-allowed">
              {isPremium ? "NOT YOUR PLAN" : "CURRENT PLAN"}
            </div>
          </div>

          {/* Premium */}
          <div className="relative bg-amber-400/4 border border-amber-400/30 rounded-2xl p-9 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-[0_40px_80px_rgba(245,158,11,0.1)]">
            {isPremium ? (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-[#080c14] bebas text-xs tracking-[2px] px-4 py-1 rounded-full whitespace-nowrap">
                ✓ YOUR PLAN
              </div>
            ) : (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#080c14] bebas text-xs tracking-[2px] px-4 py-1 rounded-full whitespace-nowrap">
                RECOMMENDED
              </div>
            )}

            <div className="mb-7">
              <p className="bebas text-sm tracking-[3px] text-amber-400 mb-3">
                PREMIUM PLAN
              </p>
              <div className="flex items-end gap-1">
                <p className="bebas text-6xl text-[#e8edf5] leading-none">
                  {billing === "monthly" ? "₱299" : "₱2,999"}
                </p>
                <p className="text-sm text-[#e8edf5]/40 mb-2">
                  {billing === "monthly" ? "/mo" : "/yr"}
                </p>
              </div>
              <p className="text-sm text-[#e8edf5]/40 mt-1">
                {isPremium
                  ? `Active until ${new Date(user?.premium_until).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}`
                  : billing === "annual"
                    ? "₱250/month billed annually"
                    : "Billed monthly, cancel anytime"}
              </p>
            </div>

            <div className="mb-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 py-1.5 border-b border-white/4 last:border-0 text-[13px]"
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shrink-0 text-[10px] text-emerald-400">
                    ✓
                  </div>
                  <span className="text-[#e8edf5]/70">{f.label}</span>
                </div>
              ))}
            </div>

            {isPremium ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="bebas w-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-xl py-3.5 text-[17px] tracking-[2px] mt-6 cursor-pointer transition-all hover:bg-emerald-400/15 hover:border-emerald-400/50"
              >
                ✓ GO TO DASHBOARD
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="upgrade-btn bebas relative w-full bg-amber-400 hover:bg-amber-300 text-[#080c14] rounded-xl py-3.5 text-[17px] tracking-[2px] mt-6 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(245,158,11,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 overflow-hidden"
              >
                {loading
                  ? "REDIRECTING..."
                  : `GET PREMIUM — ${billing === "monthly" ? "₱299/MO" : "₱2,999/YR"}`}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-5 flex-wrap mt-8">
          {[
            "🔒 Secured by PayMongo",
            "✓ Cancel anytime",
            "🇵🇭 GCash & Maya accepted",
          ].map((t, i) => (
            <span key={i} className="text-xs text-[#e8edf5]/30">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
