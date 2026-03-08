import React, { useState } from "react";
import Headers from "../components/layout/Headers";
import ProductsModal from "../components/modals/ProductsModal";
import useProducts from "../hooks/products/useProducts";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const { form } = useProducts();
  const { query: materialQuery } = useRawMaterials();
  const { query: employeeQuery } = useEmployee();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Headers
        openModal={openModal}
        title={"Products"}
        buttonLabel={"Add Products"}
      />
      {isModalOpen && (
        <ProductsModal
          closeModal={closeModal}
          form={form}
          materialQuery={materialQuery}
          employeeQuery={employeeQuery}
        />
      )}
    </div>
  );
};

export default Products;
