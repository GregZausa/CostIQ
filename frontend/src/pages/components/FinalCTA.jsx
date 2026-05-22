import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import RevealSection from "./RevealSection";

const FinalCTA = ({ ctaSectionGlowRef }) => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={ctaSectionGlowRef}
        className="amber-glow"
        style={{
          width: 400,
          height: 400,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          transition: "width 0.4s ease, height 0.4s ease, opacity 0.4s ease",
        }}
      />
      <RevealSection>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 80,
              lineHeight: 0.95,
              color: "#e8edf5",
              marginBottom: 32,
            }}
          >
            YOUR BUSINESS
            <br />
            <span style={{ color: "#f59e0b" }}>DESERVES CLARITY.</span>
          </h2>
          <button
            className="btn-primary"
            style={{ fontSize: 20, padding: "20px 60px" }}
            onClick={() => navigate("/register")}
          >
            GET STARTED — IT'S FREE
          </button>
        </div>
      </RevealSection>
    </section>
  );
};

export default FinalCTA;
