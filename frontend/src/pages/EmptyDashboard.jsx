// EmptyDashboard.jsx
import { useNavigate } from "react-router-dom";

const EmptyDashboard = ({ user }) => {
  const navigate = useNavigate();

  const steps = [
    {
      num: "01",
      icon: "📦",
      title: "Add Raw Materials",
      desc: "Start by adding the ingredients or materials you use.",
      path: "/cost-management/raw-materials",
      color: "#f59e0b",
    },
    {
      num: "02",
      icon: "👷",
      title: "Add Employees",
      desc: "Assign labor costs to your products accurately.",
      path: "/cost-management/employees",
      color: "#60a5fa",
    },
    {
      num: "03",
      icon: "🧾",
      title: "Add Other Expenses",
      desc: "Packaging, utilities, rent — track every overhead.",
      path: "/cost-management/other-expenses",
      color: "#a78bfa",
    },
    {
      num: "04",
      icon: "⚡",
      title: "Create Your First Product",
      desc: "CostIQ will compute your costs, ROI and pricing instantly.",
      path: "/product-management/products",
      color: "#4ade80",
      primary: true,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .ed-step-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .ed-step-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          opacity: 0; transition: opacity 0.25s;
        }

        .ed-step-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3);
        }

        .ed-step-card:hover::before { opacity: 1; }

        .ed-step-card.primary {
          border-color: rgba(74,222,128,0.2);
          background: rgba(74,222,128,0.03);
        }

        .ed-step-card.primary:hover {
          border-color: rgba(74,222,128,0.4);
          box-shadow: 0 24px 48px rgba(74,222,128,0.08);
        }

        .ed-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #f59e0b; color: #080c14;
          border: none; border-radius: 8px;
          padding: 10px 24px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px; letter-spacing: 2px;
          cursor: pointer; transition: all 0.2s;
        }
        .ed-btn:hover { background: #fbbf24; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(245,158,11,0.25); }

        @keyframes ed-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* Decorative background number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(200px, 30vw, 400px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
          letterSpacing: -10,
        }}
      >
        IQ
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 760,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          {/* Floating metric preview */}
          <div
            style={{
              display: "inline-flex",
              gap: 12,
              marginBottom: 32,
              animation: "ed-float 6s ease-in-out infinite",
            }}
          >
            {[
              { label: "NET PROFIT", value: "₱0.00", color: "#4ade80" },
              { label: "ROI", value: "0%", color: "#f59e0b" },
              { label: "BREAK-EVEN", value: "— units", color: "#60a5fa" },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  padding: "10px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(232,237,245,0.35)",
                    letterSpacing: 1,
                    marginBottom: 3,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 18,
                    color: m.color,
                  }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: 2,
              color: "#e8edf5",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            YOUR WAR ROOM AWAITS,{" "}
            <span style={{ color: "#f59e0b" }}>
              {user?.first_name?.toUpperCase()}
            </span>
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(232,237,245,0.45)",
              maxWidth: 420,
              margin: "0 auto",
            }}
          >
            You're 4 steps away from knowing exactly what your business makes —
            and how to make more.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className={`ed-step-card ${s.primary ? "primary" : ""}`}
              style={{ "--step-color": s.color }}
              onClick={() => navigate(s.path)}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.25s",
                }}
                className="ed-top-line"
              />

              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: s.color,
                      marginBottom: 4,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    STEP {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 18,
                      letterSpacing: 1,
                      color: "#e8edf5",
                      marginBottom: 6,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(232,237,245,0.45)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </div>

              {s.primary && (
                <div
                  style={{
                    marginTop: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: "#4ade80",
                    textTransform: "uppercase",
                  }}
                >
                  Start here →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick action */}
        <div style={{ textAlign: "center" }}>
          <button
            className="ed-btn"
            onClick={() => navigate("/product-management/products")}
          >
            ⚡ ADD MY FIRST PRODUCT
          </button>
          <p
            style={{
              fontSize: 12,
              color: "rgba(232,237,245,0.25)",
              marginTop: 12,
            }}
          >
            You can skip steps — but we recommend doing them in order for the
            most accurate costing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyDashboard;
