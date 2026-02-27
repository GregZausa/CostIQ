import React, { useState } from "react";
import Headers from "../components/layout/Headers";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div>
      <Headers
      openModal={openModal}
      title={"Products"}
      buttonLabel={"Add Products"}/>
    </div>
  );
};

export default Products;
