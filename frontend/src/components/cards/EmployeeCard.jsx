import { Users } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import NoDataLayout from "../layout/NoDataLayout";
import { useTheme } from "../../context/ThemeContext";

const EmployeesCard = ({ employees = [], computed }) => {
  const { isDark } = useTheme();
  const batchPerDay = Number(computed?.batch_per_day ?? 1);

  return (
    <ProductCardLayout title="Employees" icon={Users}>
      {employees.length > 0 ? (
        <div className="flex flex-col max-h-47.5">
          <div className="flex-1 min-h-0 space-y-1.5 overflow-y-auto pr-1 scrollbar-none">
            {employees.map((emp, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"}  `}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-slate-700"}`}
                  >
                    {emp.first_name} {emp.last_name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    ₱{Number(emp.rate_per_day).toFixed(2)}/day
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
                  >
                    ₱{(Number(emp.rate_per_day) / batchPerDay).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400">per batch</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-1.5 flex items-center justify-between px-3 py-1.5 rounded-lg border ${isDark ? "bg-slate-600 border-slate-700" : "bg-slate-200 border-slate-100"}`}
          >
            <span className="text-xs font-semibold text-slate-400">
              Total Labor Cost
            </span>
            <span
              className={`text-xs font-bold ${isDark ? "text-slate-50" : "text-slate-800"}`}
            >
              ₱
              {employees
                .reduce(
                  (sum, emp) => sum + Number(emp.rate_per_day) / batchPerDay,
                  0,
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <NoDataLayout message="No employees assigned." />
      )}
    </ProductCardLayout>
  );
};

export default EmployeesCard;
