import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const FloatingMetric = ({ label, value, color, style, animDelay = "0s" }) => (
  <div
    className="floating-metric"
    style={{
      animation: `float 7s ease-in-out infinite ${animDelay}`,
      ...style,
    }}
  >
    <div
      style={{
        fontSize: 10,
        color: "rgba(232,237,245,0.4)",
        marginBottom: 4,
        letterSpacing: 1,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 22, fontFamily: "'Bebas Neue'", color }}>
      {value}
    </div>
    {/* Scanline */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: 12,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 2,
          background: `${color}20`,
          animation: "scan 3s linear infinite",
        }}
      />
    </div>
  </div>
);

const Hero = ({
  heroVisible,
  gridRef,
  glowRef,
  glowRef2,
  metric1Ref,
  metric2Ref,
  heroTitleRef,
  heroSubRef,
}) => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 40px 80px",
        overflow: "hidden",
      }}
    >
      <div
        ref={gridRef}
        className="grid-bg"
        style={{ willChange: "transform" }}
      />

      <div
        ref={glowRef}
        className="amber-glow"
        style={{
          width: 700,
          height: 700,
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <div
        ref={glowRef2}
        className="amber-glow"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          right: -100,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className={heroVisible ? "hero-visible" : ""}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="badge" style={{ marginBottom: 32 }}>
          <span>⚡</span> Built for Filipino Entrepreneurs
        </div>

        <div ref={heroTitleRef} style={{ willChange: "transform" }}>
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 96,
              lineHeight: 0.92,
              letterSpacing: 2,
              marginBottom: 32,
              maxWidth: 900,
            }}
          >
            {["STOP", "GUESSING.", "START", "WINNING."].map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ color: i === 1 || i === 3 ? "#f59e0b" : "#e8edf5" }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div ref={heroSubRef} style={{ willChange: "transform" }}>
          <p
            className="hero-sub"
            style={{
              fontSize: 18,
              color: "rgba(232,237,245,0.6)",
              maxWidth: 560,
              margin: "0 auto 48px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            CostIQ is the business costing platform that tells you{" "}
            <strong style={{ color: "#e8edf5" }}>exactly</strong> what your
            product costs, what to charge, and how to profit — built for
            Philippine small businesses.
          </p>
        </div>

        <div
          className="hero-cta cta-btns"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-primary" onClick={() => navigate("/register")}>
            START FOR FREE — IT'S ₱0
          </button>
          <button className="btn-ghost" onClick={() => navigate("/pricing")}>
            SEE PREMIUM PLANS
          </button>
        </div>

        <p
          className="hero-sub"
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "rgba(232,237,245,0.3)",
          }}
        >
          No credit card. No tricks. Just clarity.
        </p>
      </div>

      {/* Floating metrics */}
      <FloatingMetric
        ref={metric1Ref}
        label="NET PROFIT/UNIT"
        value="₱29.00"
        color="#4ade80"
        style={{ bottom: 80, left: "8%" }}
        animDelay="0s"
      />
      <FloatingMetric
        ref={metric2Ref}
        label="ROI"
        value="185.71%"
        color="#f59e0b"
        style={{ bottom: 120, right: "8%" }}
        animDelay="2.5s"
      />
      <div
        className="floating-metric"
        style={{
          top: "55%",
          left: "4%",
          animation: "float 9s ease-in-out infinite 1s",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(232,237,245,0.4)",
            letterSpacing: 1,
          }}
        >
          BREAK-EVEN
        </div>
        <div
          style={{ fontSize: 20, fontFamily: "'Bebas Neue'", color: "#60a5fa" }}
        >
          47 UNITS
        </div>
      </div>
    </section>
  );
};

export default Hero;
