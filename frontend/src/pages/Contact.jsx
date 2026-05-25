import { useNavigate } from "react-router-dom";
import ContactForm from "../components/forms/ContactForm";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080c14] text-[#e8edf5] px-6 py-20 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .bebas { font-family: 'Bebas Neue', sans-serif; }
        .ps-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      <div className="ps-grid" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back
        </button>

        <div className="mb-10">
          <div
            onClick={() => navigate("/")}
            className="bebas text-lg tracking-[3px] text-slate-500 hover:text-amber-400 transition-colors cursor-pointer mb-6 inline-block"
          >
            COST<span className="text-amber-400">IQ</span>
          </div>

          <h1 className="bebas text-5xl tracking-[2px] text-slate-100 leading-none mb-3">
            CONTACT US
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            Got a question, concern, or feedback? Send us a message and we'll
            get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { icon: "⚡", text: "24hr response time" },
            { icon: "🇵🇭", text: "Philippine-based support" },
            { icon: "💳", text: "Priority for Premium users" },
          ].map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-full px-4 py-1.5 text-xs text-slate-400"
            >
              <span>{chip.icon}</span>
              <span>{chip.text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
