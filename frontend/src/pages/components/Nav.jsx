import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(8,12,20,0.75)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: 2,
            color: "#e8edf5",
          }}
        >
          COST<span style={{ color: "#f59e0b" }}>IQ</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          className="btn-ghost"
          style={{ padding: "10px 24px", fontSize: 14 }}
          onClick={() => navigate("/login")}
        >
          LOG IN
        </button>
        <button
          className="btn-primary"
          style={{ padding: "10px 24px", fontSize: 14 }}
          onClick={() => navigate("/register")}
        >
          START FREE
        </button>
      </div>
    </nav>
  );
};

export default Nav;
