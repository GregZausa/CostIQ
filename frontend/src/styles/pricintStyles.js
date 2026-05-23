const pricingStyles = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .pricing-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .pricing-glow {
          position: fixed; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
        }

        .plan-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 36px;
          position: relative;
          transition: all 0.3s ease;
        }

        .plan-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .plan-card.premium {
          border-color: rgba(245,158,11,0.3);
          background: rgba(245,158,11,0.04);
        }

        .plan-card.premium:hover {
          border-color: rgba(245,158,11,0.5);
          box-shadow: 0 40px 80px rgba(245,158,11,0.1);
        }

        .plan-card.dimmed {
          opacity: 0.5;
          pointer-events: none;
        }

        .billing-toggle {
          display: inline-flex;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
        }

        .billing-btn {
          padding: 8px 20px;
          border-radius: 7px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .billing-btn.active {
          background: #f59e0b;
          color: #080c14;
        }

        .billing-btn.inactive {
          background: transparent;
          color: rgba(232,237,245,0.5);
        }

        .billing-btn.inactive:hover {
          color: #e8edf5;
        }

        .feature-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 13px;
        }

        .feature-row:last-child { border-bottom: none; }

        .check-yes {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(74,222,128,0.15);
          border: 1px solid rgba(74,222,128,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 10px; color: #4ade80;
        }

        .check-no {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 10px; color: rgba(232,237,245,0.2);
        }

        .upgrade-btn {
          width: 100%;
          background: #f59e0b;
          color: #080c14;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          margin-top: 24px;
        }

        .upgrade-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .upgrade-btn:hover::after { transform: translateX(100%); }
        .upgrade-btn:hover { background: #fbbf24; transform: translateY(-2px); box-shadow: 0 20px 40px rgba(245,158,11,0.3); }
        .upgrade-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

        .dashboard-btn {
          width: 100%;
          background: rgba(74,222,128,0.1);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.3);
          border-radius: 10px;
          padding: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 24px;
        }

        .dashboard-btn:hover {
          background: rgba(74,222,128,0.15);
          border-color: rgba(74,222,128,0.5);
        }

        .disabled-btn {
          width: 100%;
          background: rgba(255,255,255,0.03);
          color: rgba(232,237,245,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2px;
          cursor: not-allowed;
          margin-top: 24px;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.25);
          color: #f59e0b; padding: 5px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
        }

        .recommended-tag {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: #f59e0b; color: #080c14;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 2px;
          padding: 4px 16px; border-radius: 999px;
          white-space: nowrap;
        }

        .premium-active-tag {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          background: #4ade80; color: #080c14;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px; letter-spacing: 2px;
          padding: 4px 16px; border-radius: 999px;
          white-space: nowrap;
        }

        .noise {
          position: fixed; inset: 0; opacity: 0.025; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `;

export default pricingStyles;
