import React from "react";
import { useAuth } from "../hooks/useAuth";
import PremiumModal from "../components/modals/PremiumModal";
import WhatIfIncomeGoalReportTable from "../tables/WhatIfIncomeGoalReportTable";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import Headers from "../components/layout/Headers";

const WhatIfIncomeGoalReport = () => {
  const { computedProducts } = useProductsQuery();
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <Headers title="What-If Income Goal" />
      {!user?.is_premium ? (
        <PremiumModal message="Unlock what-if goal report to generate your desired goal reports" />
      ) : (
        <WhatIfIncomeGoalReportTable computedProducts={computedProducts} />
      )}
    </div>
  );
};

export default WhatIfIncomeGoalReport;
