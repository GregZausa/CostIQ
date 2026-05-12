import { FlaskConical } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import NoDataLayout from "../layout/NoDataLayout";
import { useTheme } from "../../context/ThemeContext";

const MaterialsCard = ({ ingredients = [] }) => {
  const { isDark } = useTheme();
  return (
    <ProductCardLayout title="Materials Used" icon={FlaskConical}>
      {ingredients.length > 0 ? (
        <div className="flex flex-col max-h-47.5">
          <div className="flex-1 space-y-1.5 overflow-y-auto pr-1 scrollbar-none">
            {ingredients.map((ing, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  `}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}`}
                  >
                    {ing.material_name}
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1">
                    {ing.units_needed} {ing.base_unit} needed · ₱
                    {Number(ing.cost_per_unit).toFixed(2)}/unit
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
                  >
                    ₱
                    {(
                      Number(ing.cost_per_unit) * Number(ing.units_needed)
                    ).toFixed(2)}
                  </p>

                  <p className="text-[10px] text-slate-400">total cost</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-1.5 flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-600 border-slate-700" : "bg-slate-200 border-slate-100"}`}
          >
            <span className="text-xs font-semibold text-slate-400">
              Total Materials Cost
            </span>

            <span
              className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
            >
              ₱
              {ingredients
                .reduce(
                  (sum, ing) =>
                    sum + Number(ing.cost_per_unit) * Number(ing.units_needed),
                  0,
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <NoDataLayout message="No materials assigned." />
      )}
    </ProductCardLayout>
  );
};

export default MaterialsCard;
