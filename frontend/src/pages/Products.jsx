import React, { useState } from "react";
import Headers from "../components/layout/Headers";
import ProductsModal from "../components/modals/ProductsModal";
import useProducts from "../hooks/products/useProducts";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const {form} = useProducts();
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
      {isModalOpen && <ProductsModal closeModal={closeModal} form={form}/>}
    </div>
  );
};

export default Products;
