import { useState } from "react";
import Headers from "../components/layout/Headers";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import PricingGuideTable from "../tables/PricingGuideReportTable";
import { useAuth } from "../context/useAuth";
import PremiumModal from "../components/modals/PremiumModal";

const PricingGuide = () => {
  const { computedProducts } = useProductsQuery();
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <Headers title="Pricing Guide" />
      {!user?.is_premium ? (
        <PremiumModal message="Unlock pricing guide to generate reports for different prices"/>
      ) : (
        <PricingGuideTable computedProducts={computedProducts} />
      )}
    </div>
  );
};

export default PricingGuide;
