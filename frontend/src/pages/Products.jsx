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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-4 gap-4">
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
