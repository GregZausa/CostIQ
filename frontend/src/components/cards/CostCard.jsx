import { Package, Users, LayoutGrid, TrendingUp } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import { useTheme } from "../../context/ThemeContext";

const CostCard = ({ title, variant, computed }) => {
  const isBatch = variant === "batch";
  const { isDark } = useTheme();
  const directMaterials = isBatch
    ? computed?.materialCPB || 0
    : computed?.materialCPP || 0;
  const labor = isBatch
    ? computed?.employeeCPB || 0
    : computed?.employeeCPP || 0;
  const others = isBatch
    ? computed?.otherExpenseCPB || 0
    : computed?.otherExpenseCPP || 0;
  const total = isBatch ? computed?.totalCPB || 0 : computed?.totalCPP || 0;
  const formatPeso = (val) => `₱${Number(val).toFixed(2)}`;

  const rows = [
    {
      label: "Direct Materials",
      value: directMaterials,
      icon: Package,
      color: "text-indigo-400",
      bg: isDark ? "bg-slate-700" : "bg-indigo-100",
    },
    {
      label: "Labor",
      value: labor,
      icon: Users,
      color: "text-violet-400",
      bg: isDark ? "bg-slate-700" : "bg-violet-100",
    },
    {
      label: "Others",
      value: others,
      icon: LayoutGrid,
      color: "text-sky-400",
      bg: isDark ? "bg-slate-700" : "bg-sky-100",
    },
    {
      label: "Total",
      value: total,
      icon: TrendingUp,
      color: "text-slate-400",
      bg: isDark ? "bg-slate-700" : "bg-slate-100",
      isTotal: true,
    },
  ];

  return (
    <ProductCardLayout title={title} icon={TrendingUp}>
      <div
        className={`divide-y  ${isDark ? "divide-slate-700" : "divide-slate-100"}`}
      >
        {rows.map(({ label, value, icon: Icon, color, bg, isTotal }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-3 py-2 transition-colors duration-150
              ${isTotal ? (isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-50 hover:bg-slate-100") : isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={15} className={color} />
              </div>
              <span
                className={`text-sm font-medium ${isTotal ? `tracking-widest uppercase ${isDark ? "text-slate-100" : "text-slate-700 "}` : isDark ? "text-slate-200" : "text-slate-600"}`}
              >
                {label}
              </span>
            </div>
            <span
              className={`tabular-nums text-sm font-medium text-right ${isTotal ? isDark ? "text-slate-100" : "text-slate-700" : isDark ? "text-slate-100 text-sm" : "text-slate-700 text-sm"}`}
            >
              {formatPeso(value)}
            </span>
          </div>
        ))}
      </div>
    </ProductCardLayout>
  );
};

export default CostCard;
