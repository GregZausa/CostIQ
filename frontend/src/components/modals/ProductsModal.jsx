import React, { useCallback, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import AddProductForm from "../forms/AddProductForm";
import toast from "react-hot-toast";

const ProductsModal = ({
  closeModal,
  form,
  actions,
  materialQuery,
  employeeQuery,
  expensesQuery,
}) => {
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
  const clamped = useCallback((val, min = 0, max = 100) =>
    Math.min(max, Math.max(min, Number(val))),[]);
  const handleOpenModal = (params) => {
    if (form.state?.totalSellableUnits === 0) {
      toast.error("Total sellable units must not be 0");
      return;
    }
    setOpenModal(params);
  };
  return (
    <ModalLayout closeModal={closeModal} widthStyle={"w-250"}>
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <AddProductForm
      handleSubmit={actions.handleSubmit}
        closeModal={closeModal}
        handleChange={form.handleChange}
        state={form.state}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleEmployeesConfirm={handleEmployeesConfirm}
        handleMaterialsConfirm={handleMaterialsConfirm}
        handleExpensesConfirm={handleExpensesConfirm}
        clamped={clamped}
        form={form}
        materialQuery={materialQuery}
        employeeQuery={employeeQuery}
        expensesQuery={expensesQuery}
        handleOpenModal={handleOpenModal}
      />
    </ModalLayout>
  );
};

export default ProductsModal;
