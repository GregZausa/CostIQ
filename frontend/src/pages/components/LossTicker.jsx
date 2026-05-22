import { useEffect, useState } from "react";

const LossTicker = () => {
  const [loss, setLoss] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setLoss((((Date.now() - start) / 1000) * 0.093).toFixed(2));
    }, 100);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        background: "rgba(8,12,20,0.92)",
        border: "1px solid rgba(239,68,68,0.4)",
        borderRadius: 10,
        padding: "12px 20px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 40px rgba(239,68,68,0.15)",
        animation: "pulse-red 2s ease-in-out infinite",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "rgba(239,68,68,0.7)",
          letterSpacing: 2,
          marginBottom: 4,
          fontWeight: 700,
        }}
      >
        ⚠ SINCE YOU OPENED THIS PAGE
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 28,
          color: "#ef4444",
          lineHeight: 1,
        }}
      >
        ₱{loss}{" "}
        <span
          style={{
            fontSize: 13,
            fontFamily: "DM Sans, sans-serif",
            color: "rgba(239,68,68,0.6)",
            fontWeight: 400,
          }}
        >
          lost to bad pricing
        </span>
      </div>
    </div>
  );
};

export default LossTicker;