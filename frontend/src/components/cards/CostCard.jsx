import { Package, Users, LayoutGrid, TrendingUp } from "lucide-react";

const CostCard = ({
  title,
  directMaterials = 0,
  labor = 0,
  others = 0,
  total,
}) => {

  const rows = [
    { label: "Direct Materials", value: directMaterials, icon: Package, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Labor", value: labor, icon: Users, color: "text-violet-500", bg: "bg-violet-50" },
    { label: "Others", value: others, icon: LayoutGrid, color: "text-sky-500", bg: "bg-sky-50" },
  ];

  const formatPeso = (val) =>
    `₱${Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            {title}
          </p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500">
          <TrendingUp size={15} />
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
                <Icon size={14} />
              </div>
              <span className="text-sm font-medium text-slate-600">{label}</span>
            </div>
            <span className="text-sm font-semibold text-slate-800 tabular-nums">
              {formatPeso(value)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 py-4 bg-gray-800 mt-0">
        <span className="text-sm font-bold tracking-widest uppercase text-indigo-100">
          Total
        </span>
        <span className="text-lg font-bold text-white tabular-nums">
          {formatPeso(total)}
        </span>
      </div>
    </div>
  );
};

export default CostCard;