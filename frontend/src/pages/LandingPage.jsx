import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import costIQLogo from "../../res/logo-icon-removebg-preview.png"

const LandingPage = () => {
  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount1(Math.round(ease * 98));
      setCount2(Math.round(ease * 3));
      setCount3(Math.round(ease * 500));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const features = [
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

  const testimonials = [
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

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#080c14",
        color: "#e8edf5",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
 
        * { box-sizing: border-box; margin: 0; padding: 0; }
 
        .hero-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(60px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-visible .hero-word { opacity: 1; transform: translateY(0); }
        .hero-word:nth-child(1) { transition-delay: 0.1s; }
        .hero-word:nth-child(2) { transition-delay: 0.2s; }
        .hero-word:nth-child(3) { transition-delay: 0.3s; }
        .hero-word:nth-child(4) { transition-delay: 0.4s; }
        .hero-word:nth-child(5) { transition-delay: 0.5s; }
 
        .hero-sub {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
        }
        .hero-visible .hero-sub { opacity: 1; transform: translateY(0); }
 
        .hero-cta {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s;
        }
        .hero-visible .hero-cta { opacity: 1; transform: translateY(0); }
 
        .btn-primary {
          background: #f59e0b;
          color: #080c14;
          border: none;
          padding: 16px 40px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          background: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3);
        }
        .btn-primary:active { transform: translateY(0); }
 
        .btn-ghost {
          background: transparent;
          color: #e8edf5;
          border: 1px solid rgba(232, 237, 245, 0.2);
          padding: 16px 40px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          border-color: rgba(232, 237, 245, 0.5);
          background: rgba(232, 237, 245, 0.05);
        }
 
        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(245,158,11,0.2);
          transform: translateY(-4px);
        }
        .feature-card:hover::before { opacity: 1; }
 
        .stat-card {
          text-align: center;
          padding: 40px 20px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .stat-card:last-child { border-right: none; }
 
        .testimonial-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 32px;
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px; left: 24px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 80px;
          color: rgba(245,158,11,0.15);
          line-height: 1;
        }
 
        .noise {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
 
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
 
        .amber-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
 
        nav a {
          color: rgba(232,237,245,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        nav a:hover { color: #f59e0b; }
 
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          color: #f59e0b;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
 
        .avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #080c14;
          flex-shrink: 0;
        }
 
        @media (max-width: 768px) {
          .hero-title { font-size: 56px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .stat-card { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .cta-btns { flex-direction: column !important; }
        }
      `}</style>

      <div className="noise" />

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
          background: "rgba(8,12,20,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 900,
              color: "#080c14",
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            <img src={costIQLogo} alt="" />
          </div>
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

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 40px 80px",
          overflow: "hidden",
        }}
      >
        <div className="grid-bg" />
        <div
          className="amber-glow"
          style={{ top: -200, left: "50%", transform: "translateX(-50%)" }}
        />

        <div
          className={heroVisible ? "hero-visible" : ""}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="badge" style={{ marginBottom: 32 }}>
            <span>⚡</span> Built for Filipino Entrepreneurs
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 96,
              lineHeight: 0.95,
              letterSpacing: 2,
              marginBottom: 32,
              maxWidth: 900,
            }}
          >
            {["STOP", "GUESSING.", "START", "WINNING."].map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{
                  display: "block",
                  color: i === 1 || i === 3 ? "#f59e0b" : "#e8edf5",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="hero-sub"
            style={{
              fontSize: 18,
              color: "rgba(232,237,245,0.6)",
              maxWidth: 560,
              margin: "0 auto 48px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            CostIQ is the business costing platform that tells you{" "}
            <strong style={{ color: "#e8edf5" }}>exactly</strong> what your
            product costs, what to charge, and how to profit — built for
            Philippine small businesses.
          </p>

          <div
            className="hero-cta cta-btns"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              START FOR FREE — IT'S ₱0
            </button>
            <button className="btn-ghost" onClick={() => navigate("/pricing")}>
              SEE PREMIUM PLANS
            </button>
          </div>

          <p
            className="hero-sub"
            style={{
              marginTop: 24,
              fontSize: 13,
              color: "rgba(232,237,245,0.3)",
            }}
          >
            No credit card. No tricks. Just clarity.
          </p>
        </div>

        {/* Floating metrics */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "10%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "16px 24px",
            backdropFilter: "blur(10px)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(232,237,245,0.4)",
              marginBottom: 4,
            }}
          >
            NET PROFIT/UNIT
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "'Bebas Neue'",
              color: "#4ade80",
            }}
          >
            ₱29.00
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: "10%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "16px 24px",
            backdropFilter: "blur(10px)",
            animation: "float 6s ease-in-out infinite 2s",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "rgba(232,237,245,0.4)",
              marginBottom: 4,
            }}
          >
            ROI
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "'Bebas Neue'",
              color: "#f59e0b",
            }}
          >
            185.71%
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}</style>
      </section>

      {/* STATS */}
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
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
          className="stats-grid"
        >
          {[
            {
              value: `${count1}%`,
              label: "Of SMEs don't know their real costs",
              color: "#f59e0b",
            },
            {
              value: `${count2} mins`,
              label: "To get your first cost breakdown",
              color: "#4ade80",
            },
            {
              value: `₱${count3}+`,
              label: "Saved per month by average user",
              color: "#60a5fa",
            },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 64,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(232,237,245,0.5)",
                  fontWeight: 400,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section
        style={{
          padding: "120px 40px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div className="badge" style={{ marginBottom: 32 }}>
          The Problem
        </div>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 56,
            lineHeight: 1,
            marginBottom: 32,
            color: "#e8edf5",
          }}
        >
          MOST FILIPINO BUSINESSES{" "}
          <span style={{ color: "#f59e0b" }}>PRICE BY FEEL.</span>
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "rgba(232,237,245,0.6)",
            lineHeight: 1.8,
          }}
        >
          You open a spreadsheet. You add some numbers. You guess. Maybe you
          make a profit. Maybe you don't. You won't know until it's too late.
          <br />
          <br />
          <strong style={{ color: "#e8edf5" }}>
            CostIQ ends the guessing.
          </strong>
        </p>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{ padding: "80px 40px 120px", position: "relative" }}
      >
        <div className="amber-glow" style={{ bottom: -200, right: -200 }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {features.map((f, i) => (
              <div key={i} className="feature-card">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          padding: "80px 40px 120px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
          <div
            className="testimonials-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
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
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e8edf5",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "rgba(232,237,245,0.4)" }}
                    >
                      {t.biz}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section
        id="pricing"
        style={{
          padding: "80px 40px 120px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            Pricing
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              color: "#e8edf5",
              marginBottom: 16,
            }}
          >
            START FREE. SCALE SMART.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(232,237,245,0.5)",
              marginBottom: 48,
            }}
          >
            Free forever for the basics. Premium when you're ready to go all in.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              maxWidth: 600,
              margin: "0 auto 48px",
            }}
          >
            {[
              {
                plan: "Free",
                price: "₱0",
                desc: "Forever",
                features: ["3 Products", "Basic Costing", "Basic Dashboard"],
              },
              {
                plan: "Premium",
                price: "₱299",
                desc: "/month",
                features: [
                  "Unlimited Products",
                  "AI Insights",
                  "PDF & Excel Reports",
                ],
                highlight: true,
              },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  background: p.highlight
                    ? "rgba(245,158,11,0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${p.highlight ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 12,
                  padding: 32,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 18,
                    letterSpacing: 2,
                    color: p.highlight ? "#f59e0b" : "rgba(232,237,245,0.5)",
                    marginBottom: 8,
                  }}
                >
                  {p.plan}
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 48,
                    color: "#e8edf5",
                    lineHeight: 1,
                  }}
                >
                  {p.price}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(232,237,245,0.4)",
                    marginBottom: 24,
                  }}
                >
                  {p.desc}
                </div>
                {p.features.map((f, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      fontSize: 14,
                      color: "rgba(232,237,245,0.6)",
                    }}
                  >
                    <span style={{ color: "#f59e0b" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            className="btn-primary"
            style={{ fontSize: 18 }}
            onClick={() => navigate("/register")}
          >
            START FREE TODAY
          </button>
        </div>
      </section>

      {/* FINAL CTA */}
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
          className="amber-glow"
          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        />
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
      </section>

      {/* FOOTER */}
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
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
