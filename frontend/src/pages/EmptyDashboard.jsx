// EmptyDashboard.jsx
import { useNavigate } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: "📦",
    title: "Add Raw Materials",
    desc: "Add the ingredients or materials you use in your products.",
    path: "/cost-management/raw-materials",
    color: "amber",
  },
  {
    num: "02",
    icon: "👷",
    title: "Add Employees",
    desc: "Assign labor costs to your products accurately.",
    path: "/cost-management/employees",
    color: "blue",
  },
  {
    num: "03",
    icon: "🧾",
    title: "Add Other Expenses",
    desc: "Packaging, utilities, rent — track every overhead cost.",
    path: "/cost-management/other-expenses",
    color: "purple",
  },
  {
    num: "04",
    icon: "⚡",
    title: "Create Your First Product",
    desc: "CostIQ computes your costs, ROI, and pricing instantly.",
    path: "/product-management/products",
    color: "green",
    primary: true,
  },
];

const colorMap = {
  amber: {
    icon: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    label: "text-amber-400",
    ring: "hover:border-amber-400/30",
  },
  blue: {
    icon: "bg-blue-400/10 border-blue-400/20 text-blue-400",
    label: "text-blue-400",
    ring: "hover:border-blue-400/30",
  },
  purple: {
    icon: "bg-purple-400/10 border-purple-400/20 text-purple-400",
    label: "text-purple-400",
    ring: "hover:border-purple-400/30",
  },
  green: {
    icon: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    label: "text-emerald-400",
    ring: "hover:border-emerald-400/30",
  },
};

const EmptyDashboard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 relative">
      {/* Floating metrics preview */}
      <div className="flex items-center gap-3 mb-10 animate-bounce-slow">
        {[
          { label: "NET PROFIT", value: "₱0.00", color: "text-emerald-400" },
          { label: "ROI", value: "0%", color: "text-amber-400" },
          { label: "BREAK-EVEN", value: "— units", color: "text-blue-400" },
        ].map((m, i) => (
          <div
            key={i}
            className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-center"
          >
            <div className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mb-1">
              {m.label}
            </div>
            <div className={`text-base font-bold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-12 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 leading-tight mb-3">
          Your war room awaits,{" "}
          <span className="text-amber-400">{user?.first_name}</span> 👋
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          You're 4 steps away from knowing exactly what your business makes —
          and how to make more.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
        {steps.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <div
              key={i}
              onClick={() => navigate(s.path)}
              className={`
                group bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5
                cursor-pointer transition-all duration-200
                hover:-translate-y-1 hover:shadow-xl hover:bg-slate-800/60
                ${c.ring}
                ${s.primary ? "border-emerald-400/20 bg-emerald-400/5" : ""}
              `}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl shrink-0 ${c.icon}`}
                >
                  {s.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${c.label}`}
                  >
                    Step {s.num}
                  </p>
                  <h3 className="text-sm font-bold text-slate-200 mb-1 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                  {s.primary && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                      Start here →
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate("/product-management/products")}
          className="bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20"
        >
          ⚡ Add My First Product
        </button>
        <p className="text-xs text-slate-600 mt-3 max-w-xs mx-auto">
          You can skip steps — but we recommend doing them in order for the most
          accurate costing.
        </p>
      </div>
    </div>
  );
};

export default EmptyDashboard;
