import React, { useState } from "react";
import Headers from "../components/layout/Headers";
import ProductsModal from "../components/modals/ProductsModal";
import useProducts from "../hooks/products/useProducts";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import SelectBox from "../components/ui/SelectBox";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        <SelectBox
          onChange={actions.setSelectedProduct}
          options={query.productOptions}
          value={actions.selectedProduct}
          placeholder="Select product to view"
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
