import { Users } from "lucide-react";
import ProductCardLayout from "../layout/ProductCardLayout";
import NoDataLayout from "../layout/NoDataLayout";

const EmployeesCard = ({ employees = [], computed }) => {
  const batchPerDay = Number(computed?.batch_per_day ?? 1);

  return (
    <ProductCardLayout title="Employees" icon={Users}>
      {employees.length > 0 ? (
        <div className="flex flex-col max-h-47.5">
          <div className="flex-1 min-h-0 space-y-1.5 overflow-y-auto pr-1 scrollbar-none">
            {employees.map((emp, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    {emp.first_name} {emp.last_name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    ₱{Number(emp.rate_per_day).toFixed(2)}/day
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">
                    ₱{(Number(emp.rate_per_day) / batchPerDay).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-400">per batch</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
            <span className="text-xs font-semibold text-slate-300">
              Total Labor Cost
            </span>
            <span className="text-xs font-bold text-white">
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
