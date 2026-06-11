export const features = [
  {
    icon: "⚡",
    title: "Real Cost Intelligence",
    desc: "Ingredients, labor, overhead — computed with military precision. No guesswork. No spreadsheet hell.",
  },
  {
    icon: "📊",
    title: "Financial War Room",
    desc: "ROI, break-even, profit margins. See exactly where your money goes and where it should go.",
  },
  {
    icon: "🎯",
    title: "What-If Scenarios",
    desc: '"What if I hit ₱100,000?" CostIQ reverse-engineers your goal into a daily battle plan.',
  },
  {
    icon: "🤖",
    title: "AI Cost Advisor",
    desc: "Gemini-powered analysis compares your pricing to the Philippine market. Know if you're winning.",
  },
  {
    icon: "📄",
    title: "Export-Ready Reports",
    desc: "PDF and Excel reports your accountant will actually respect. Professional. Instant. Yours.",
  },
  {
    icon: "💳",
    title: "Built for Filipino SMEs",
    desc: "GCash, Maya, QRPh. Philippine peso. Philippine market. Built here, built for here.",
  },
];

export const testimonials = [
  {
    quote:
      "I didn't know I was selling at a loss for 6 months. CostIQ showed me in 5 minutes.",
    name: "Maria Santos",
    biz: "Home Baker, Quezon City",
    avatar: "MS",
  },
  {
    quote:
      "My karinderya finally makes sense on paper. I can actually plan now.",
    name: "Jun Reyes",
    biz: "Karinderya Owner, Cebu",
    avatar: "JR",
  },
  {
    quote: "The pricing guide alone saved my online store. Sobrang helpful.",
    name: "Trish Lim",
    biz: "Online Seller, Davao",
    avatar: "TL",
  },
];

export const stats = [
  {
    target: 98,
    suffix: "%",
    label: "Of SMEs don't know their real costs",
    color: "#f59e0b",
  },
  {
    target: 3,
    suffix: " mins",
    label: "To get your first cost breakdown",
    color: "#4ade80",
  },
  {
    target: 500,
    prefix: "₱",
    suffix: "+",
    label: "Saved per month by average user",
    color: "#60a5fa",
  },
];

export const pricingPlans = [
  {
    plan: "Free",
    price: "₱0",
    desc: "Forever",
    features: ["3 Products", "Basic Costing", "Basic Dashboard"],
    highlight: false,
  },
  {
    plan: "Premium",
    price: "₱299",
    desc: "/month",
    features: ["Unlimited Products", "AI Insights", "PDF & Excel Reports"],
    highlight: true,
  },
];

const landingStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Hero entrance ── */
  .hero-word {
    display: block; opacity: 0;
    transform: translateY(80px) skewY(4deg);
    transition: all 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .hero-visible .hero-word { opacity: 1; transform: translateY(0) skewY(0deg); }
  .hero-word:nth-child(1) { transition-delay: 0.05s; }
  .hero-word:nth-child(2) { transition-delay: 0.20s; }
  .hero-word:nth-child(3) { transition-delay: 0.35s; }
  .hero-word:nth-child(4) { transition-delay: 0.50s; }

  .hero-sub {
    opacity: 0; transform: translateY(24px);
    transition: all 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s;
  }
  .hero-visible .hero-sub { opacity: 1; transform: translateY(0); }

  .hero-cta {
    opacity: 0; transform: translateY(24px);
    transition: all 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s;
  }
  .hero-visible .hero-cta { opacity: 1; transform: translateY(0); }

  /* ── Buttons ── */
  .btn-primary {
    background: #f59e0b; color: #080c14; border: none;
    padding: 16px 40px; font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 2px; border-radius: 4px;
    cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
    transform: translateX(-100%); transition: transform 0.5s;
  }
  .btn-primary:hover::after { transform: translateX(100%); }
  .btn-primary:hover { background: #fbbf24; transform: translateY(-3px); box-shadow: 0 24px 50px rgba(245,158,11,0.35); }
  .btn-primary:active { transform: translateY(0); }

  .btn-ghost {
    background: transparent; color: #e8edf5;
    border: 1px solid rgba(232,237,245,0.2);
    padding: 16px 40px; font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 2px; border-radius: 4px;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: rgba(232,237,245,0.5); background: rgba(232,237,245,0.05); }

  /* ── Feature cards ── */
  .feature-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 32px;
    transition: border-color 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden; transform-style: preserve-3d;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .feature-card:hover { border-color: rgba(245,158,11,0.25); box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.1); }
  .feature-card:hover::before { opacity: 1; }

  /* ── Stats ── */
  .stat-card { text-align: center; padding: 40px 20px; border-right: 1px solid rgba(255,255,255,0.07); }
  .stat-card:last-child { border-right: none; }

  /* ── Testimonials ── */
  .testimonial-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 32px; position: relative;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s;
  }
  .testimonial-card:hover { transform: translateY(-8px); box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
  .testimonial-card::before {
    content: '"'; position: absolute; top: 16px; left: 24px;
    font-family: 'Bebas Neue', sans-serif; font-size: 80px;
    color: rgba(245,158,11,0.15); line-height: 1;
  }

  /* ── Scroll reveal ── */
  .reveal-section { opacity: 0; transform: translateY(50px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
  .reveal-section.visible { opacity: 1; transform: translateY(0); }

  /* ── Noise ── */
  .noise {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0.025; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .grid-bg {
    position: absolute; inset: 0; will-change: transform;
    background-image: linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .amber-glow {
    position: absolute; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
    will-change: transform; transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
  }

  nav a { color: rgba(232,237,245,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
  nav a:hover { color: #f59e0b; }

  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2);
    color: #f59e0b; padding: 6px 16px; border-radius: 999px;
    font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  }

  .avatar {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #080c14; flex-shrink: 0;
  }

  .floating-metric {
    position: absolute;
    background: rgba(8,12,20,0.7); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 16px 24px; backdrop-filter: blur(20px);
    will-change: transform;
  }

  /* ── Problem section ── */
  .problem-line { display: block; overflow: hidden; }
  .problem-line-inner {
    display: block; opacity: 0; transform: translateY(100%);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .problem-visible .problem-line-inner { opacity: 1; transform: translateY(0); }
  .problem-line:nth-child(2) .problem-line-inner { transition-delay: 0.15s; }
  .problem-line:nth-child(3) .problem-line-inner { transition-delay: 0.30s; }

  /* ── Animations ── */
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
  @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
  @keyframes pulse-red { 0%,100% { box-shadow: 0 0 20px rgba(239,68,68,0.15); } 50% { box-shadow: 0 0 40px rgba(239,68,68,0.35), 0 0 0 4px rgba(239,68,68,0.05); } }

  /* ══════════════════════════════════════
     MOBILE RESPONSIVE
  ══════════════════════════════════════ */

  /* ── Nav mobile ── */
  .nav-links { display: flex; gap: 32px; }
  .nav-actions { display: flex; gap: 12px; }

  /* ── Hero mobile ── */
  .hero-title-size { font-size: 96px; }
  .hero-section-padding { padding: 120px 40px 80px; }
  .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* ── Stats mobile ── */
  .stats-grid { grid-template-columns: repeat(3,1fr); }

  /* ── Features mobile ── */
  .features-grid { grid-template-columns: repeat(3,1fr); }

  /* ── Testimonials mobile ── */
  .testimonials-grid { grid-template-columns: repeat(3,1fr); }

  /* ── Contact info mobile ── */
  .contact-info-grid { grid-template-columns: repeat(3,1fr); }

  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2,1fr) !important; }
    .testimonials-grid { grid-template-columns: repeat(2,1fr) !important; }
  }

  @media (max-width: 768px) {
    /* Nav */
    .nav-links { display: none !important; }
    .nav-actions .btn-ghost { display: none !important; }

    /* Hero */
    .hero-title-size { font-size: 56px !important; }
    .hero-section-padding { padding: 100px 24px 60px !important; }
    .cta-btns { flex-direction: column !important; align-items: center !important; }
    .cta-btns .btn-primary, .cta-btns .btn-ghost { width: 100% !important; max-width: 320px !important; text-align: center !important; }
    .floating-metric { display: none !important; }

    /* Stats */
    .stats-grid { grid-template-columns: 1fr !important; }
    .stat-card { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding: 28px 20px !important; }
    .stat-card:last-child { border-bottom: none !important; }

    /* Features */
    .features-grid { grid-template-columns: 1fr !important; }

    /* Testimonials */
    .testimonials-grid { grid-template-columns: 1fr !important; }

    /* Contact */
    .contact-info-grid { grid-template-columns: 1fr !important; }

    /* Sections padding */
    .section-padding { padding: 60px 24px !important; }
    .section-padding-sm { padding: 40px 24px 60px !important; }

    /* Problem section */
    .problem-title { font-size: 36px !important; }

    /* Final CTA */
    .final-cta-title { font-size: 48px !important; }

    /* Footer */
    .footer-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
  }

  @media (max-width: 480px) {
    .hero-title-size { font-size: 44px !important; }
    .badge { font-size: 10px !important; padding: 5px 12px !important; }
  }
`;

export default landingStyles;
