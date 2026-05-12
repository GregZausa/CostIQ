import { Package } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import { useTheme } from "../../context/ThemeContext";

const ProductDetailsCard = ({ product, computed }) => {
  const { isDark } = useTheme();
  const details = [
    { label: "Batch Per Day", value: product?.batch_per_day ?? "—" },
    { label: "Total Input", value: product?.total_input ?? "—" },
    { label: "Units Per Product", value: product?.units_per_product ?? "—" },
    {
      label: "Total Sellable Units",
      value: product?.total_sellable_units ?? "—",
    },
    {
      label: "Profit Margin",
      value: `${Number(product?.profit_margin ?? 0).toFixed(2)}%`,
    },
    {
      label: "Discount",
      value: `${Number(product?.discount ?? 0).toFixed(2)}%`,
    },
    {
      label: "Sales Tax",
      value: `${Number(product?.sales_tax ?? 0).toFixed(2)}%`,
    },
    {
      label: "Selling Price",
      value: `₱${Number(computed?.finalPrice ?? 0).toFixed(2)}`,
    },
  ];

  return (
    <ProductCardLayout title="Product Details" icon={Package}>
      <div className="space-y-1.5  max-h-47.5 overflow-y-auto pr-1 scrollbar-none">
        {details.map(({ label, value }) => (
          <div
            key={label}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  `}
          >
            <span className="text-xs text-slate-400">{label}</span>
            <span
              className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </ProductCardLayout>
  );
};

export default ProductDetailsCard;
