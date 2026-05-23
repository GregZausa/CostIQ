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
    cta: "LET'S GO",
  },
];

const OnboardingModal = ({ user, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = async () => {
    if (isLast) {
      setLoading(true);
      try {
        await authFetch(`${apiUrl}/auth/onboard`, {
          method: "POST",
          credentials: "include",
        });
        onComplete();
        navigate("/product-management/products");
      } catch {
        onComplete();
      } finally {
        setLoading(false);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = async () => {
    try {
      await authFetch(`${apiUrl}/auth/onboard`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    onComplete();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(8,12,20,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ob-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px 40px;
          width: 100%; max-width: 480px;
          position: relative;
          animation: ob-enter 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        @keyframes ob-enter {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ob-step-content {
          animation: ob-slide 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        @keyframes ob-slide {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .ob-btn-primary {
          width: 100%;
          background: #f59e0b; color: #080c14;
          border: none; border-radius: 10px;
          padding: 14px; font-family: 'Bebas Neue', sans-serif;
          font-size: 17px; letter-spacing: 2px;
          cursor: pointer; transition: all 0.2s;
          position: relative; overflow: hidden;
        }
        .ob-btn-primary:hover { background: #fbbf24; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(245,158,11,0.25); }
        .ob-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .ob-btn-skip {
          background: none; border: none;
          color: rgba(232,237,245,0.3); font-family: 'DM Sans', sans-serif;
          font-size: 13px; cursor: pointer; transition: color 0.2s;
          padding: 8px;
        }
        .ob-btn-skip:hover { color: rgba(232,237,245,0.6); }

        .ob-dot {
          width: 6px; height: 6px; border-radius: 50%;
          transition: all 0.3s ease;
        }
        .ob-dot.active { width: 20px; background: #f59e0b; }
        .ob-dot.done { background: rgba(245,158,11,0.4); }
        .ob-dot.upcoming { background: rgba(255,255,255,0.15); }
      `}</style>

      <div className="ob-card">
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`ob-dot ${i === step ? "active" : i < step ? "done" : "upcoming"}`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="ob-step-content" key={step}>
          {/* Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              marginBottom: 24,
            }}
          >
            {current.icon}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#f59e0b",
              textTransform: "uppercase",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {current.subtitle}
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 36,
              letterSpacing: 1.5,
              color: "#e8edf5",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            {current.title}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(232,237,245,0.55)",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            {current.desc}
          </p>

          {/* User greeting on first step */}
          {step === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#080c14",
                  flexShrink: 0,
                }}
              >
                {user?.first_name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#e8edf5" }}
                >
                  Mabuhay, {user?.first_name}! 🇵🇭
                </div>
                <div style={{ fontSize: 12, color: "rgba(232,237,245,0.4)" }}>
                  Let's get your business running on data.
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="ob-btn-primary"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? "SETTING UP..." : current.cta}
        </button>

        {/* Skip */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button className="ob-btn-skip" onClick={handleSkip}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
