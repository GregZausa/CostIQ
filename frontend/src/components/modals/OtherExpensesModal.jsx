import React, { useState } from "react";
import AddOtherExpensesForm from "../forms/AddOtherExpensesForm";
import ModalLayout from "../layout/ModalLayout";

const OtherExpensesModal = ({
  closeModal,
  form,
  actions,
  isLoading,
  setIsLoading,
  editingId,
}) => {
  return (
    <ModalLayout closeModal={closeModal}>
      <h1 className="text-xl font-bold mb-4">
        {editingId ? "Edit Expenses" : "Add Expenses"}
      </h1>
      <AddOtherExpensesForm
        closeModal={closeModal}
        handleSubmit={actions.handleSubmit}
        handleChange={form.handleChange}
        state={form.state}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </ModalLayout>
  );
};

export default OtherExpensesModal;
