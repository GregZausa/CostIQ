import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,12,20,0.75)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22, letterSpacing: 2, color: "#e8edf5",
          }}>
            COST<span style={{ color: "#f59e0b" }}>IQ</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Desktop actions */}
        <div className="nav-actions">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            color: "#e8edf5", padding: 4,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8,12,20,0.98)",
          backdropFilter: "blur(24px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 32,
        }}>
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 40, letterSpacing: 4,
                color: "#e8edf5", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.color = "#f59e0b"}
              onMouseLeave={(e) => e.target.style.color = "#e8edf5"}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "80%", maxWidth: 280 }}>
            <button
              className="btn-ghost"
              style={{ width: "100%", textAlign: "center" }}
              onClick={() => { navigate("/login"); setMenuOpen(false); }}
            >
              LOG IN
            </button>
            <button
              className="btn-primary"
              style={{ width: "100%", textAlign: "center" }}
              onClick={() => { navigate("/register"); setMenuOpen(false); }}
            >
              START FREE
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-actions { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          nav { padding: 16px 24px !important; }
        }
      `}</style>
    </>
  );
};

export default Nav;