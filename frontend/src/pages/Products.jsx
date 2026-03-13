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

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const { form, actions, query } = useProducts();
  const { query: materialQuery } = useRawMaterials();
  const { query: employeeQuery } = useEmployee();
  const { query: expensesQuery } = useOtherExpenses();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative">
      <Headers
        openModal={openModal}
        title={"Products"}
        buttonLabel={"Add Products"}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-5 shrink-0 py-4 gap-4">
        <div className="space-y-2">
          <SelectBox
            onChange={query.setSelectedProduct}
            options={query.productOptions}
            value={query.selectedProduct}
            placeholder="Select product to view"
          />
          <ProductImageCard
            src={query?.productDetail?.computedProduct?.product_image}
          />
        </div>

        <div className="space-y-2">
          <CostCard
            title="Cost Per Batch"
            total={query?.productDetail?.computedProduct?.totalCPB}
            directMaterials={query?.productDetail?.computedProduct?.materialCPB}
            labor={query?.productDetail?.computedProduct?.employeeCPB}
            others={query?.productDetail?.computedProduct?.otherExpenseCPB}
          />
          <CostCard
            title="Cost Per Product"
            total={query?.productDetail?.computedProduct?.totalCPP}
            directMaterials={query?.productDetail?.computedProduct?.materialCPP}
            labor={query?.productDetail?.computedProduct?.employeeCPP}
            others={query?.productDetail?.computedProduct?.otherExpenseCPP}
          />
        </div>
        <div className="space-y-2">
          <FinancialCard
            title="Financial Metrics"
            breakEvenUnits={
              query?.productDetail?.computedProduct?.breakEvenUnits
            }
            BreakEvenRevenue={
              query?.productDetail?.computedProduct?.breakEvenRevenue
            }
            NetProfitPerUnit={
              query?.productDetail?.computedProduct?.netProfitPerUnit
            }
            ROI={query?.productDetail?.computedProduct?.roi}
          />
          <div className="space-y-2">
            <PricingSummaryCard
              title="Pricing Summary"
              profit={query?.productDetail?.computedProduct?.profit}
              profitMargin={
                query?.productDetail?.computedProduct?.profit_margin
              }
              discount={query?.productDetail?.computedProduct?.discountCost}
              discountPercent={query?.productDetail?.computedProduct?.discount}
              salesTaxPercent={query?.productDetail?.computedProduct?.sales_tax}
              salesTax={query?.productDetail?.computedProduct?.tax}
              finalPrice={query?.productDetail?.computedProduct?.finalPrice}
            />
          </div>
          <div className="space-y-2"></div>
        </div>
      </div>

      {isModalOpen && (
        <ProductsModal
          closeModal={closeModal}
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
