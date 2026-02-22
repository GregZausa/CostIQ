import React, { useState } from "react";
import AddRawMaterialsForm from "../forms/AddRawMaterialsForm";
import useUnits from "../../hooks/useUnits";

const AddRawMaterialModal = ({
  closeModal,
  form,
  actions,
  isLoading,
  setIsLoading,
}) => {
  const { unitOptions } = useUnits();
  return (
    <>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className="fixed top-1/2 left-1/2 z-60 w-96 max-w-full bg-white/80 border border-white/20 rounded-xl 
                      shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6 hover:shadow-2xl hover:scale-102 transition-all
                      duration-300 ease-in-out text-black overflow-hidden"
      >
        <h1 className="text-xl font-bold mb-4">Add Raw Products</h1>
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
      </div>
    </>
  );
};

export default AddRawMaterialModal;
