import ContactForm from "../../components/forms/ContactForm";

const INFO_ITEMS = [
  { icon: "⚡", label: "Response Time", value: "Within 24 hours" },
  { icon: "🇵🇭", label: "Based in", value: "Philippines" },
  { icon: "💳", label: "Billing Support", value: "Premium users get priority" },
];

const ContactSection = () => (
  <section
    id="contact"
    style={{
      padding: "80px 40px 120px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      {/* Badge */}
      <div className="badge" style={{ marginBottom: 24 }}>
        Contact Us
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 56,
          color: "#e8edf5",
          marginBottom: 16,
          lineHeight: 1,
        }}
      >
        GOT QUESTIONS?{" "}
        <span style={{ color: "#f59e0b" }}>WE'VE GOT ANSWERS.</span>
      </h2>

      <p
        style={{
          fontSize: 15,
          color: "rgba(232,237,245,0.5)",
          marginBottom: 48,
          maxWidth: 480,
          margin: "0 auto 48px",
        }}
      >
        Whether it's a bug, a billing concern, or just want to say hi — we're
        here. Filipino business owners deserve real support.
      </p>

      {/* Info items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {INFO_ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)";
              e.currentTarget.style.background = "rgba(245,158,11,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            <div style={{ fontSize: 24 }}>{item.icon}</div>
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(232,237,245,0.3)",
                  marginBottom: 4,
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: 13, color: "#e8edf5", fontWeight: 500 }}>
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: 32,
          textAlign: "left",
        }}
      >
        <ContactForm compact />
      </div>
    </div>
  </section>
);

export default ContactSection;
