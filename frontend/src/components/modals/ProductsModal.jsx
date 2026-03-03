import React from "react";
import ModalLayout from "../layout/ModalLayout";
import AddProductForm from "../forms/AddProductForm";

const ProductsModal = ({ closeModal, form }) => {
  return (
    <ModalLayout closeModal={closeModal} widthStyle={"w-170"}>
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <AddProductForm 
      handleChange={form.handleChange}
      state={form.state}/>
    </ModalLayout>
  );
};

export default ProductsModal;
