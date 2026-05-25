const Footer = () => (
  <footer
    style={{
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
    }}
  >
    <span
      style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2 }}
    >
      COST<span style={{ color: "#f59e0b" }}>IQ</span>
    </span>
    <span style={{ fontSize: 13, color: "rgba(232,237,245,0.3)" }}>
      © 2026 CostIQ. Built in the Philippines. 🇵🇭
    </span>
    <div style={{ display: "flex", gap: 24 }}>
      <a
        href="/pricing"
        style={{
          fontSize: 13,
          color: "rgba(232,237,245,0.4)",
          textDecoration: "none",
        }}
      >
        Pricing
      </a>
      <a
        href="/login"
        style={{
          fontSize: 13,
          color: "rgba(232,237,245,0.4)",
          textDecoration: "none",
        }}
      >
        Login
      </a>
      <a
        href="/contact"
        style={{
          fontSize: 13,
          color: "rgba(232,237,245,0.4)",
          textDecoration: "none",
        }}
      >
        Contact
      </a>
    </div>
  </footer>
);

export default Footer;
