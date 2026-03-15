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
import MarginScenarioChart from "../components/ui/MarginScenarioChart";
import PricingGuideChart from "../components/ui/PricingGuideChart";
import CostPerProductChart from "../components/ui/CostPerProductChart";
import WhatIfScenarioCard from "../components/cards/WhatIfScenarioCard";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, actions, query } = useProducts();
  const { query: materialQuery } = useRawMaterials();
  const { query: employeeQuery } = useEmployee();
  const { query: expensesQuery } = useOtherExpenses();

  const computed = query?.productDetail?.computedProduct;

  return (
    <div className="relative">
      <Headers
        openModal={() => setIsModalOpen(true)}
        title="Products"
        buttonLabel="Add Products"
      />

      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        <div className="space-y-2">
          <SelectBox
            onChange={query.setSelectedProduct}
            options={query.productOptions}
            value={query.selectedProduct}
            placeholder="Select product"
          />
          <ProductImageCard src={computed?.product_image} />
        </div>
        <div>
        <WhatIfScenarioCard title="What-if Income Goal" computed={computed}/>
        </div>
        <div className="space-y-2">
          <FinancialCard
            title="Financial Metrics"
            breakEvenUnits={computed?.breakEvenUnits}
            BreakEvenRevenue={computed?.breakEvenRevenue}
            NetProfitPerUnit={computed?.netProfitPerUnit}
            ROI={computed?.roi}
          />
          <CostCard
            title="Cost Per Batch"
            total={computed?.totalCPB}
            directMaterials={computed?.materialCPB}
            labor={computed?.employeeCPB}
            others={computed?.otherExpenseCPB}
          />
        </div>
        <div className="space-y-2">
          <PricingSummaryCard
            title="Pricing Summary"
            profit={computed?.profit}
            profitMargin={computed?.profit_margin}
            discount={computed?.discountCost}
            discountPercent={computed?.discount}
            salesTaxPercent={computed?.sales_tax}
            salesTax={computed?.tax}
            finalPrice={computed?.finalPrice}
            sellingPrice={computed?.sellingPrice}
            discountedPrice={computed?.discountedPrice}
            totalCPP={computed?.totalCPP}
          />
          <CostCard
            title="Cost Per Product"
            total={computed?.totalCPP}
            directMaterials={computed?.materialCPP}
            labor={computed?.employeeCPP}
            others={computed?.otherExpenseCPP}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        <MarginScenarioChart computed={computed} />
        <PricingGuideChart computed={computed} />
        <CostPerProductChart computed={computed} />
      </div>

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
