import React, { useState } from "react";
import AddRawMaterialsForm from "../forms/AddRawMaterialsForm";
import useUnits from "../../hooks/useUnits";
import ModalLayout from "../layout/ModalLayout";

const RawMaterialsModal = ({
  closeModal,
  form,
  actions,
  isLoading,
  setIsLoading,
  editingId,
}) => {
  const { unitOptions } = useUnits();
  return (
    <ModalLayout closeModal={closeModal}>
      <h1 className="text-xl font-bold mb-4">
        {editingId ? "Edit Raw Materials" : "Add Raw Materials"}
      </h1>
      <AddRawMaterialsForm
        state={form.state}
        handleChange={form.handleChange}
        handleSubmit={actions.handleSubmit}
        unitsPerPackEditable={form.unitsPerPackEditable}
        closeModal={closeModal}
        unitOptions={unitOptions}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </ModalLayout>
  );
};

export default RawMaterialsModal;
