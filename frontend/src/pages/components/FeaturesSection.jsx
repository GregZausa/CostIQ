import { useEffect, useRef } from "react";
import RevealSection from "./RevealSection";
import TiltCard from "./TiltCard";
import { features } from "../../constants/landing-page-constants";

const FeatureParallaxGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.closest("section").getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, 1 - rect.top / window.innerHeight),
      );
      ref.current.style.transform = `translate(${progress * -60}px, ${progress * -80}px)`;
      ref.current.style.opacity = 0.04 + progress * 0.06;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: "50%",
        pointerEvents: "none",
        background:
          "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
        willChange: "transform, opacity",
      }}
    />
  );
};

const FeaturesSection = () => (
  <section
    id="features"
    style={{ padding: "80px 40px 120px", position: "relative" }}
  >
    <FeatureParallaxGlow />
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            What You Get
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              color: "#e8edf5",
            }}
          >
            YOUR COMPLETE COSTING ARSENAL
          </h2>
        </div>
      </RevealSection>

      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
        }}
      >
        {features.map((f, i) => (
          <RevealSection key={i} delay={i * 80}>
            <TiltCard className="feature-card" style={{ height: "100%" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  letterSpacing: 1,
                  color: "#e8edf5",
                  marginBottom: 12,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(232,237,245,0.5)",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </TiltCard>
          </RevealSection>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
