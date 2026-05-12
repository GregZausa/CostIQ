import { Receipt } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import NoDataLayout from "../layout/NoDataLayout";
import { useTheme } from "../../context/ThemeContext";

const expenseTypeLabel = {
  per_unit: "Per Unit",
  per_batch: "Per Batch",
  one_time: "One Time",
  one_month: "Monthly",
};

const expenseTypeColor = {
  per_unit:"bg-blue-50 text-blue-400 border-blue-100",
  per_batch: "bg-purple-50 text-purple-400 border-purple-100",
  one_time: "bg-amber-50 text-amber-400 border-amber-100",
  one_month: "bg-green-50 text-green-400 border-green-100",
};
const expenseTypeColorDark = {
  per_unit:"bg-slate-700 text-blue-400 border-blue-700",
  per_batch: "bg-slate-700 text-purple-400 border-purple-700",
  one_time: "bg-slate-700 text-amber-400 border-amber-700",
  one_month: "bg-slate-700 text-green-400 border-green-700",
};

const OtherExpensesCard = ({ expenses = [] }) => {
  const { isDark } = useTheme();

  return (
    <ProductCardLayout title="Other Expenses" icon={Receipt}>
      {expenses.length > 0 ? (
        <div className="flex flex-col max-h-47.5">
          <div className="flex-1 min-h-0 space-y-1.5 overflow-y-auto pr-1 scrollbar-none">
            {expenses.map((exp, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  `}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-slate-700"} `}
                  >
                    {exp.category_name}
                  </p>
                  <div className="flex items-center mt-0.5">
                    <span
                      className={`text-[10px] px-1.5 rounded-full border font-medium ${isDark ? expenseTypeColorDark[exp.expense_type] :expenseTypeColor[exp.expense_type] ?? isDark ? "bg-slate-800 text-slate-400 border-slate-700" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                    >
                      {expenseTypeLabel[exp.expense_type] ?? exp.expense_type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
                  >
                    ₱
                    {(
                      Number(exp.expense_cost) * Number(exp.quantity ?? 1)
                    ).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400">total</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-1.5 flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-600 border-slate-700" : "bg-slate-200 border-slate-100"}`}
          >
            <span className="text-xs font-semibold text-slate-400">
              Total Expenses
            </span>
            <span
              className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
            >
              ₱
              {expenses
                .reduce(
                  (sum, exp) =>
                    sum + Number(exp.expense_cost) * Number(exp.quantity ?? 1),
                  0,
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <NoDataLayout message="No expenses assigned." />
      )}
    </ProductCardLayout>
  );
};

export default OtherExpensesCard;
