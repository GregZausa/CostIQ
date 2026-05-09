import React from "react";
import { useAuth } from "../context/useAuth";
import PremiumModal from "../components/modals/PremiumModal";
import WhatIfIncomeGoalReportTable from "../tables/WhatIfIncomeGoalReportTable";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import Headers from "../components/layout/Headers";
import { Target } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const WhatIfIncomeGoalReport = () => {
  const { computedProducts } = useProductsQuery();
  const { isDark } = useTheme();
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <Headers
        title="What-If Income Goal"
        subTitle="Placeholder subtitle"
        icon={<Target size={20} className="text-indigo-500" />}
      />
      {!user?.is_premium ? (
        <PremiumModal message="Unlock what-if goal report to generate your desired goal reports" />
      ) : (
        <WhatIfIncomeGoalReportTable computedProducts={computedProducts} />
      )}
    </div>
  );
};

export default WhatIfIncomeGoalReport;
