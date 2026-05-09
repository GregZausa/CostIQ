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
    <ModalLayout
      closeModal={closeModal}
      header="Raw Material"
      editingId={editingId}
    >
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
