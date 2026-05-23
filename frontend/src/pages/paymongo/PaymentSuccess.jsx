import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import { apiUrl } from "../../config/apiUrl";

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

    // Progress bar animation
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

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#080c14",
        minHeight: "100vh",
        color: "#e8edf5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

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
          position: fixed; border-radius: 50%; pointer-events: none;
          transition: all 1s ease;
        }

        .ps-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px 40px;
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 1;
          text-align: center;
          transition: border-color 0.5s ease;
        }

        .ps-card.success {
          border-color: rgba(74,222,128,0.3);
          box-shadow: 0 0 60px rgba(74,222,128,0.05);
        }

        .ps-icon {
          width: 80px; height: 80px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px;
          font-size: 36px;
          position: relative;
        }

        .ps-icon.pending {
          background: rgba(245,158,11,0.1);
          border: 2px solid rgba(245,158,11,0.2);
          animation: ps-pulse 2s ease-in-out infinite;
        }

        .ps-icon.success {
          background: rgba(74,222,128,0.1);
          border: 2px solid rgba(74,222,128,0.3);
          animation: ps-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

        .ps-spinner {
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #f59e0b;
          border-right-color: rgba(245,158,11,0.3);
          animation: ps-spin 1.2s linear infinite;
        }

        .ps-progress-bar {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          overflow: hidden;
          margin: 28px 0;
        }

        .ps-progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.1s linear;
        }

        .ps-progress-fill.pending {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        .ps-progress-fill.success {
          background: linear-gradient(90deg, #4ade80, #22c55e);
        }

        .ps-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 24px;
        }

        .ps-btn.amber {
          background: #f59e0b; color: #080c14;
        }
        .ps-btn.amber:hover { background: #fbbf24; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(245,158,11,0.25); }

        .ps-btn.green {
          background: rgba(74,222,128,0.1);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.3);
        }
        .ps-btn.green:hover { background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.5); }

        .ps-step {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 13px;
          text-align: left;
        }

        .ps-step:last-child { border-bottom: none; }

        .ps-step-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }

        .ps-step-dot.done { background: #4ade80; }
        .ps-step-dot.active { background: #f59e0b; animation: ps-pulse 1.5s infinite; }
        .ps-step-dot.waiting { background: rgba(255,255,255,0.15); }
      `}</style>

      <div className="ps-noise" />
      <div className="ps-grid" />

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

      <div className={`ps-card ${isSuccess ? "success" : ""}`}>
        <div className={`ps-icon ${isSuccess ? "success" : "pending"}`}>
          {!isSuccess && <div className="ps-spinner" />}
          <span>{isSuccess ? "⚡" : "💳"}</span>
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 40,
            letterSpacing: 2,
            color: "#e8edf5",
            marginBottom: 10,
            lineHeight: 1,
          }}
        >
          {isSuccess ? "YOU'RE NOW PREMIUM!" : `CONFIRMING${".".repeat(dots)}`}
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "rgba(232,237,245,0.5)",
            lineHeight: 1.7,
            marginBottom: 4,
          }}
        >
          {isSuccess
            ? `Your ${plan === "annual" ? "annual" : "monthly"} subscription is now active. Welcome to the war room.`
            : "We're verifying your payment with PayMongo. This usually takes a few seconds."}
        </p>

        <div className="ps-progress-bar">
          <div
            className={`ps-progress-fill ${isSuccess ? "success" : "pending"}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div style={{ marginBottom: 8 }}>
          {[
            { label: "Payment received by PayMongo", state: "done" },
            {
              label: "Verifying transaction",
              state: isSuccess ? "done" : "active",
            },
            {
              label: "Activating premium features",
              state: isSuccess ? "done" : "waiting",
            },
          ].map((step, i) => (
            <div key={i} className="ps-step">
              <div className={`ps-step-dot ${step.state}`} />
              <span
                style={{
                  color:
                    step.state === "done"
                      ? "rgba(74,222,128,0.8)"
                      : step.state === "active"
                        ? "rgba(245,158,11,0.8)"
                        : "rgba(232,237,245,0.3)",
                }}
              >
                {step.label}
                {step.state === "done" && " ✓"}
              </span>
            </div>
          ))}
        </div>

        {isSuccess && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "#4ade80",
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            ⚡ {plan === "annual" ? "Annual" : "Monthly"} Premium Active
          </div>
        )}

        <button
          className={`ps-btn ${isSuccess ? "green" : "amber"}`}
          onClick={() => navigate("/dashboard")}
        >
          {isSuccess ? "✓ ENTER THE WAR ROOM" : "GO TO DASHBOARD"}
        </button>

        {!isSuccess && (
          <p
            style={{
              fontSize: 11,
              color: "rgba(232,237,245,0.2)",
              marginTop: 16,
            }}
          >
            Auto-redirecting in {Math.ceil((10000 - progress * 100) / 1000)}s...
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
