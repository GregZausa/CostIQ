// OnboardingModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const STEPS = [
  {
    icon: "⚡",
    title: "WELCOME TO THE WAR ROOM",
    subtitle: "Your business costing command center",
    desc: "CostIQ helps you track exactly what your products cost, what to charge, and how to maximize profit — built for Filipino entrepreneurs like you.",
    cta: "SHOW ME HOW",
  },
  {
    icon: "📦",
    title: "ADD YOUR PRODUCTS",
    subtitle: "Start with your most important product",
    desc: "Add your ingredients, assign employees, and track other expenses. CostIQ computes your cost per batch, ROI, break-even, and selling price automatically.",
    cta: "GOT IT",
  },
  {
    icon: "📊",
    title: "READ YOUR DASHBOARD",
    subtitle: "All your financial metrics in one place",
    desc: "Your dashboard shows net profit, ROI, break-even revenue, and more. The more products you add, the more powerful your insights become.",
    cta: "LET'S GO →",
  },
];

const OnboardingModal = ({ user, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const markOnboarded = async () => {
    try {
      await authFetch(`${apiUrl}/auth/onboard`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
  };

  const handleNext = async () => {
    if (isLast) {
      setLoading(true);
      await markOnboarded();
      onComplete();
      navigate("/product-management/products");
      setLoading(false);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = async () => {
    await markOnboarded();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/50 rounded-2xl p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-amber-400"
                  : i < step
                    ? "w-6 bg-amber-400/40"
                    : "w-6 bg-slate-700"
              }`}
            />
          ))}
          <span className="ml-auto text-xs text-slate-500 font-medium">
            {step + 1} / {STEPS.length}
          </span>
        </div>

        {/* Step content */}
        <div
          key={step}
          className="animate-in fade-in slide-in-from-right-4 duration-200"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl mb-6">
            {current.icon}
          </div>

          {/* Subtitle */}
          <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
            {current.subtitle}
          </p>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-100 leading-tight mb-3">
            {current.title}
          </h2>

          {/* Desc */}
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {current.desc}
          </p>

          {/* Welcome card on step 1 */}
          {step === 0 && (
            <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xs font-bold text-slate-900 shrink-0">
                {user?.first_name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Mabuhay, {user?.first_name}! 🇵🇭
                </p>
                <p className="text-xs text-slate-500">
                  Let's get your business running on data.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading ? "SETTING UP..." : current.cta}
        </button>

        {/* Skip */}
        <div className="text-center mt-3">
          <button
            onClick={handleSkip}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors py-2 px-4"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
