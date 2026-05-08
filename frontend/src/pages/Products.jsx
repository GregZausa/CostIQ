import React, { useState } from "react";
import Headers from "../components/layout/Headers";
import ProductsModal from "../components/modals/ProductsModal";
import CostCard from "../components/cards/CostCard";
import useProducts from "../hooks/products/useProducts";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import SelectBox from "../components/ui/SelectBox";
import ProductImageCard from "../components/cards/ProductImageCard";
import FinancialCard from "../components/cards/FinancialCard";
import PricingSummaryCard from "../components/cards/PricingSummaryCard";
import MarginScenarioChart from "../components/ui/charts/MarginScenarioChart";
import PricingGuideChart from "../components/ui/charts/PricingGuideChart";
import CostPerProductChart from "../components/ui/charts/CostPerProductChart";
import WhatIfScenarioCard from "../components/cards/WhatIfScenarioCard";
import NoDataLayout from "../components/layout/NoDataLayout";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import MarketPriceCard from "../components/cards/MarketPriceCard";
import PremiumModal from "../components/modals/PremiumModal";
import PremiumCard from "../components/cards/PremiumCard";
import CostOptimizationCard from "../components/cards/CostOptimizationCard";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "analytics", label: "Analytics" },
  { key: "ai", label: "AI Insights" },
];

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { form, actions, query } = useProducts();
  const { query: materialQuery } = useRawMaterials();
  const { query: employeeQuery } = useEmployee();
  const { query: expensesQuery } = useOtherExpenses();

  const computed = query?.productDetail?.computedProduct || [];
  const { user } = useAuth();

  const isFreeLimitReached =
    !user?.is_premium && query?.productOptions?.length >= 3;

  const handleOpenModal = () => {
    if (isFreeLimitReached) {
      toast.error(
        "That's the max for free users. Upgrade to keep adding more!",
      );
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <Headers
        openModal={handleOpenModal}
        title="Products"
        buttonLabel="Add Products"
      />

      {query?.productOptions?.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-1 border-b border-slate-100 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "border-slate-800 text-slate-800"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-64">
              <SelectBox
                onChange={query.setSelectedProduct}
                options={query.productOptions}
                value={query.selectedProduct}
                placeholder="Select product"
              />
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
              <ProductImageCard src={computed?.product_image} />
              <WhatIfScenarioCard
                title="What-if Income Goal"
                computed={computed}
              />

              <div className="space-y-2">
                <FinancialCard title="Financial Metrics" computed={computed} />
                <CostCard
                  title="Cost Per Batch"
                  computed={computed}
                  variant="batch"
                />
              </div>
              <div className="space-y-2">
                <PricingSummaryCard
                  title="Pricing Summary"
                  computed={computed}
                />
                <CostCard
                  title="Cost Per Product"
                  computed={computed}
                  variant="unit"
                />
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <MarginScenarioChart computed={computed} />
              <PricingGuideChart computed={computed} />
              <CostPerProductChart computed={computed} />
            </div>
          )}

          {activeTab === "ai" && (
            <>
              {user?.is_premium ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MarketPriceCard computed={computed} />
                  <CostOptimizationCard computed={computed} />
                </div>
              ) : (
                <PremiumCard message="Unlock AI Insights for more advance insights" />
              )}
            </>
          )}
        </div>
      ) : (
        <NoDataLayout message="No products yet. Add one to get started!" />
      )}

      {isModalOpen && (
        <ProductsModal
          closeModal={() => setIsModalOpen(false)}
          actions={actions}
          form={form}
          materialQuery={materialQuery}
          employeeQuery={employeeQuery}
          expensesQuery={expensesQuery}
        />
      )}
    </div>
  );
};

export default Products;
