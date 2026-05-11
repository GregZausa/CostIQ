import { Receipt } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import NoDataLayout from "../layout/NoDataLayout";

const expenseTypeLabel = {
  per_unit: "Per Unit",
  per_batch: "Per Batch",
  one_time: "One Time",
  one_month: "Monthly",
};

const expenseTypeColor = {
  per_unit: "bg-blue-50 text-blue-600 border-blue-100",
  per_batch: "bg-purple-50 text-purple-600 border-purple-100",
  one_time: "bg-amber-50 text-amber-600 border-amber-100",
  one_month: "bg-green-50 text-green-600 border-green-100",
};

const OtherExpensesCard = ({ expenses = [] }) => {
  return (
    <ProductCardLayout title="Other Expenses" icon={Receipt}>
      {expenses.length > 0 ? (
        <div className="flex flex-col max-h-47.5">
          <div className="flex-1 min-h-0 space-y-1.5 overflow-y-auto pr-1 scrollbar-none">
            {expenses.map((exp, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {exp.category_name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${expenseTypeColor[exp.expense_type] ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
                    >
                      {expenseTypeLabel[exp.expense_type] ?? exp.expense_type}
                    </span>
                    {exp.quantity > 1 && (
                      <span className="text-[10px] text-slate-400">
                        ×{exp.quantity}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">
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

          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
            <span className="text-xs font-semibold text-slate-300">
              Total Expenses
            </span>
            <span className="text-xs font-bold text-white">
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
