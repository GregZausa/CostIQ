import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

const minimalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .bebas { font-family: 'Bebas Neue', sans-serif; }
  .dm-sans { font-family: 'DM Sans', sans-serif; }

  .ps-noise {
    position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .ps-grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .ps-glow {
    position: fixed; border-radius: 50%; pointer-events: none; transition: all 1s ease;
  }

  @keyframes ps-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.3); }
    50% { box-shadow: 0 0 0 12px rgba(245,158,11,0); }
  }

  @keyframes ps-pop {
    0% { transform: scale(0.8); }
    60% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes ps-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .ps-icon-pending {
    animation: ps-pulse 2s ease-in-out infinite;
  }

  .ps-icon-success {
    animation: ps-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .ps-spinner {
    position: absolute; inset: -4px; border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #f59e0b;
    border-right-color: rgba(245,158,11,0.3);
    animation: ps-spin 1.2s linear infinite;
  }

  .ps-step-dot-active {
    animation: ps-pulse 1.5s infinite;
  }
`;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan");
  const [status, setStatus] = useState("verifying");
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const dotsInterval = setInterval(() => setDots((d) => (d + 1) % 4), 400);

    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressRef.current);
          return 100;
        }
        return p + 1;
      });
    }, 100);

    const checkStatus = async () => {
      try {
        const res = await authFetch(`${apiUrl}/auth/me`);
        const data = await res.json();
        if (data.user?.is_premium) {
          setStatus("success");
          setProgress(100);
          clearInterval(intervalRef.current);
          clearInterval(dotsInterval);
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("pending");
      }
    };

    checkStatus();
    intervalRef.current = setInterval(checkStatus, 2000);
    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      navigate("/dashboard");
    }, 10000);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(dotsInterval);
      clearInterval(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  const isSuccess = status === "success";

  const verifySteps = [
    { label: "Payment received by PayMongo", state: "done" },
    { label: "Verifying transaction", state: isSuccess ? "done" : "active" },
    {
      label: "Activating premium features",
      state: isSuccess ? "done" : "waiting",
    },
  ];

  return (
    <div className="dm-sans min-h-screen flex items-center justify-center px-6 py-10 relative overflow-hidden bg-[#080c14] text-[#e8edf5]">
      <style>{minimalStyles}</style>

      <div className="ps-noise" />
      <div className="ps-grid" />

      {/* Dynamic glow */}
      <div
        className="ps-glow"
        style={{
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: isSuccess
            ? "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-md bg-white/3 rounded-2xl p-12 text-center transition-all duration-500 ${
          isSuccess
            ? "border border-emerald-400/30 shadow-[0_0_60px_rgba(74,222,128,0.05)]"
            : "border border-white/[8"
        }`}
      >
        {/* Icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7 text-4xl relative ${
            isSuccess
              ? "bg-emerald-400/10 border-2 border-emerald-400/30 ps-icon-success"
              : "bg-amber-400/10 border-2 border-amber-400/20 ps-icon-pending"
          }`}
        >
          {!isSuccess && <div className="ps-spinner" />}
          <span>{isSuccess ? "⚡" : "💳"}</span>
        </div>

        {/* Title */}
        <h1 className="bebas text-4xl tracking-[2px] text-[#e8edf5] leading-none mb-2.5">
          {isSuccess ? "YOU'RE NOW PREMIUM!" : `CONFIRMING${".".repeat(dots)}`}
        </h1>

        <p className="text-sm text-[#e8edf5]/50 leading-relaxed">
          {isSuccess
            ? `Your ${plan === "annual" ? "annual" : "monthly"} subscription is now active. Welcome to the war room.`
            : "We're verifying your payment with PayMongo. This usually takes a few seconds."}
        </p>

        {/* Progress bar */}
        <div className="w-full h-0.75 bg-white/6 rounded-full overflow-hidden my-7">
          <div
            className={`h-full rounded-full transition-[width] duration-100 ${
              isSuccess
                ? "bg-linear-to-r from-emerald-400 to-green-500"
                : "bg-linear-to-r from-amber-400 to-amber-300"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="mb-2">
          {verifySteps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 border-b border-white/4 last:border-0 text-[13px] text-left"
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  step.state === "done"
                    ? "bg-emerald-400"
                    : step.state === "active"
                      ? "bg-amber-400 ps-step-dot-active"
                      : "bg-white/15"
                }`}
              />
              <span
                className={
                  step.state === "done"
                    ? "text-emerald-400/80"
                    : step.state === "active"
                      ? "text-amber-400/80"
                      : "text-[#e8edf5]/30"
                }
              >
                {step.label}
                {step.state === "done" && " ✓"}
              </span>
            </div>
          ))}
        </div>

        {/* Premium badge on success */}
        {isSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-1">
            ⚡ {plan === "annual" ? "Annual" : "Monthly"} Premium Active
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`bebas w-full rounded-xl py-3.5 text-[17px] tracking-[2px] cursor-pointer transition-all duration-200 mt-6 ${
            isSuccess
              ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 hover:bg-emerald-400/15 hover:border-emerald-400/50"
              : "bg-amber-400 text-[#080c14] hover:bg-amber-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(245,158,11,0.25)]"
          }`}
        >
          {isSuccess ? "✓ ENTER THE WAR ROOM" : "GO TO DASHBOARD"}
        </button>

        {!isSuccess && (
          <p className="text-[11px] text-[#e8edf5]/20 mt-4">
            Auto-redirecting in {Math.ceil((10000 - progress * 100) / 1000)}s...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
