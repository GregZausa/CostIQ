import { useNavigate } from "react-router-dom";
import RevealSection from "./RevealSection";
import { pricingPlans } from "../../constants/landing-page-constants";

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      style={{
        padding: "80px 40px 120px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <RevealSection>
          <div className="badge" style={{ marginBottom: 24 }}>
            Pricing
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              color: "#e8edf5",
              marginBottom: 16,
            }}
          >
            START FREE. SCALE SMART.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(232,237,245,0.5)",
              marginBottom: 48,
            }}
          >
            Free forever for the basics. Premium when you're ready to go all in.
          </p>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            maxWidth: 600,
            margin: "0 auto 48px",
          }}
        >
          {pricingPlans.map((p, i) => (
            <RevealSection key={i} delay={i * 150}>
              <div
                style={{
                  background: p.highlight
                    ? "rgba(245,158,11,0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${p.highlight ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 12,
                  padding: 32,
                  textAlign: "left",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = p.highlight
                    ? "0 30px 60px rgba(245,158,11,0.15)"
                    : "0 30px 60px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 18,
                    letterSpacing: 2,
                    color: p.highlight ? "#f59e0b" : "rgba(232,237,245,0.5)",
                    marginBottom: 8,
                  }}
                >
                  {p.plan}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 48,
                    color: "#e8edf5",
                    lineHeight: 1,
                  }}
                >
                  {p.price}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(232,237,245,0.4)",
                    marginBottom: 24,
                  }}
                >
                  {p.desc}
                </div>
                {p.features.map((f, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      fontSize: 14,
                      color: "rgba(232,237,245,0.6)",
                    }}
                  >
                    <span style={{ color: "#f59e0b" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </RevealSection>
          ))}
        </div>

        <button
          className="btn-primary"
          style={{ fontSize: 18 }}
          onClick={() => navigate("/register")}
        >
          START FREE TODAY
        </button>
      </div>
    </section>
  );
};

export default PricingSection;
