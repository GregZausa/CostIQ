import { useState } from "react";
import { createCheckoutSession } from "../../services/subscriptions.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import pricingStyles from "../../styles/pricintStyles";

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
  const navigate = useNavigate();
  const isPremium = user?.is_premium;

  const handleUpgrade = async () => {
    setLoading(true);
    await createCheckoutSession(billing);
    setLoading(false);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#080c14",
        minHeight: "100vh",
        color: "#e8edf5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{pricingStyles}</style>

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

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 860,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            onClick={() => navigate("/")}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              letterSpacing: 3,
              color: "rgba(232,237,245,0.4)",
              marginBottom: 24,
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            COST<span style={{ color: "#f59e0b" }}>IQ</span>
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              letterSpacing: 2,
              color: "#e8edf5",
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            SIMPLE, HONEST PRICING
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(232,237,245,0.5)",
              maxWidth: 440,
              margin: "0 auto",
            }}
          >
            Free tells you what your costs are. Premium tells you what to do
            about them.
          </p>

          {/* Premium status badge */}
          {isPremium && (
            <div style={{ marginTop: 20 }}>
              <span
                className="badge"
                style={{
                  background: "rgba(74,222,128,0.1)",
                  borderColor: "rgba(74,222,128,0.25)",
                  color: "#4ade80",
                }}
              >
                ⚡ You're on Premium
                {user?.premium_until && (
                  <span
                    style={{
                      color: "rgba(74,222,128,0.6)",
                      fontWeight: 400,
                      letterSpacing: 0,
                    }}
                  >
                    · Renews{" "}
                    {new Date(user.premium_until).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Billing toggle */}
          {!isPremium && (
            <div
              style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="billing-toggle">
                <button
                  className={`billing-btn ${billing === "monthly" ? "active" : "inactive"}`}
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`billing-btn ${billing === "annual" ? "active" : "inactive"}`}
                  onClick={() => setBilling("annual")}
                >
                  Annual
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 10,
                      background: "rgba(74,222,128,0.2)",
                      color: "#4ade80",
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
                  >
                    SAVE ₱589
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {/* Free Plan */}
          <div className={`plan-card ${isPremium ? "dimmed" : ""}`}>
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: 14,
                  letterSpacing: 3,
                  color: "rgba(232,237,245,0.4)",
                  marginBottom: 12,
                }}
              >
                FREE PLAN
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: 56,
                  color: "#e8edf5",
                  lineHeight: 1,
                }}
              >
                ₱0
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(232,237,245,0.4)",
                  marginTop: 4,
                }}
              >
                Forever free
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              {features.map((f) => (
                <div key={f.label} className="feature-row">
                  {f.free ? (
                    <div className="check-yes">✓</div>
                  ) : (
                    <div className="check-no">✕</div>
                  )}
                  <span
                    style={{
                      color: f.free
                        ? "rgba(232,237,245,0.7)"
                        : "rgba(232,237,245,0.25)",
                    }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="disabled-btn">
              {isPremium ? "NOT YOUR PLAN" : "CURRENT PLAN"}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="plan-card premium">
            {isPremium ? (
              <div className="premium-active-tag">✓ YOUR PLAN</div>
            ) : (
              <div className="recommended-tag">RECOMMENDED</div>
            )}

            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: 14,
                  letterSpacing: 3,
                  color: "#f59e0b",
                  marginBottom: 12,
                }}
              >
                PREMIUM PLAN
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 56,
                    color: "#e8edf5",
                    lineHeight: 1,
                  }}
                >
                  {billing === "monthly" ? "₱299" : "₱2,999"}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(232,237,245,0.4)",
                    marginBottom: 8,
                  }}
                >
                  {billing === "monthly" ? "/mo" : "/yr"}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(232,237,245,0.4)",
                  marginTop: 4,
                }}
              >
                {isPremium
                  ? `Active until ${new Date(user?.premium_until).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}`
                  : billing === "annual"
                    ? "₱250/month billed annually"
                    : "Billed monthly, cancel anytime"}
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              {features.map((f) => (
                <div key={f.label} className="feature-row">
                  <div className="check-yes">✓</div>
                  <span style={{ color: "rgba(232,237,245,0.7)" }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {isPremium ? (
              <button
                className="dashboard-btn"
                onClick={() => navigate("/dashboard")}
              >
                ✓ GO TO DASHBOARD
              </button>
            ) : (
              <button
                className="upgrade-btn"
                onClick={handleUpgrade}
                disabled={loading}
              >
                {loading
                  ? "REDIRECTING..."
                  : `GET PREMIUM — ${billing === "monthly" ? "₱299/MO" : "₱2,999/YR"}`}
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {[
            "🔒 Secured by PayMongo",
            "✓ Cancel anytime",
            "🇵🇭 GCash & Maya accepted",
          ].map((t, i) => (
            <span
              key={i}
              style={{ fontSize: 12, color: "rgba(232,237,245,0.3)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
