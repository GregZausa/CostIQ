import React, { useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import AddProductForm from "../forms/AddProductForm";

const ProductsModal = ({ closeModal, form, query }) => {
  const [openModal, setOpenModal] = useState(null);
  const { handleChange } = form;

  const handleMaterialsConfirm = (items) => {
    handleChange({ target: { name: "directMaterials", value: items } });
  };

  const handleEmployeesConfirm = (items) => {
    handleChange({ target: { name: "employees", value: items } });
  };

  const handleExpensesConfirm = (items) => {
    handleChange({ target: { name: "otherExpenses", value: items } });
  };
  const clamped = (val, min = 0, max = 100) =>
    Math.min(max, Math.max(min, Number(val)));
  return (
    <ModalLayout closeModal={closeModal} widthStyle={"w-170"}>
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <AddProductForm
        handleChange={form.handleChange}
        state={form.state}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleEmployeesConfirm={handleEmployeesConfirm}
        handleMaterialsConfirm={handleMaterialsConfirm}
        handleExpensesConfirm={handleExpensesConfirm}
        clamped={clamped}
        form={form}
        query={query}
      />
    </ModalLayout>
  );
};

export default ProductsModal;
