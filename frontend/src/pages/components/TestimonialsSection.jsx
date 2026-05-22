import RevealSection from "./RevealSection";
import { testimonials } from "../../constants/landing-page-constants";

const TestimonialsSection = () => (
  <section
    style={{
      padding: "80px 40px 120px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <RevealSection>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            Real Stories
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              color: "#e8edf5",
            }}
          >
            BUSINESSES THAT FOUGHT BACK
          </h2>
        </div>
      </RevealSection>

      <div
        className="testimonials-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 24,
        }}
      >
        {testimonials.map((t, i) => (
          <RevealSection key={i} delay={i * 120}>
            <div className="testimonial-card">
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(232,237,245,0.7)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  paddingTop: 16,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar">{t.avatar}</div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: "#e8edf5" }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(232,237,245,0.4)" }}>
                    {t.biz}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
