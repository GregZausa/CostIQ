import { Package, Users, LayoutGrid, TrendingUp } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";

const CostCard = ({
  title,
  directMaterials = 0,
  labor = 0,
  others = 0,
  total = 0,
}) => {
  const formatPeso = (val) =>
    `₱${Number(val).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

  const rows = [
    {
      label: "Direct Materials",
      value: directMaterials,
      icon: Package,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      label: "Labor",
      value: labor,
      icon: Users,
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      label: "Others",
      value: others,
      icon: LayoutGrid,
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
    {
      label: "Total",
      value: total,
      icon: TrendingUp,
      color: "text-white",
      bg: "bg-slate-800",
      isTotal: true,
    },
  ];

  return (
    <ProductCardLayout title={title} icon={TrendingUp}>
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, value, icon: Icon, color, bg, isTotal }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-3 py-2 transition-colors duration-150
              ${isTotal ? "bg-slate-800 hover:bg-slate-700" : "hover:bg-slate-50"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={15} className={color} />
              </div>
              <span className={`text-sm font-medium ${isTotal ? "text-white tracking-widest uppercase" : "text-slate-600"}`}>
                {label}
              </span>
            </div>
            <span className={`tabular-nums text-sm font-medium text-right ${isTotal ? "text-white" : "text-slate-800 text-sm"}`}>
              {formatPeso(value)}
            </span>
          </div>
        ))}
      </div>
    </ProductCardLayout>
  );
};

export default CostCard;