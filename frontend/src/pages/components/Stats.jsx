import RevealSection from "./RevealSection";
import CountUp from "./CountUp";
import { stats } from "../../constants/landing-page-constants";

const Stats = () => (
  <RevealSection>
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
        }}
        className="stats-grid"
      >
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 64,
                color: s.color,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              <CountUp
                target={s.target}
                prefix={s.prefix || ""}
                suffix={s.suffix}
              />
            </div>
            <div
              style={{
                fontSize: 14,
                color: "rgba(232,237,245,0.5)",
                fontWeight: 400,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  </RevealSection>
);

export default Stats;
