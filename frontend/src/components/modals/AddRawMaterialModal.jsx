import React from "react";
import AddRawMaterialsForm from "../forms/AddRawMaterialsForm";
import useUnits from "../../hooks/useUnits";
import useRawMaterials from "../../hooks/useRawMaterials";


const AddRawMaterialModal = ({ closeModal }) => {
  const { unitOptions } = useUnits();
  const {state, handleChange, handleSubmit, isLoading, unitsPerPackEditable} = useRawMaterials(closeModal);
  return (
    <>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="fixed top-1/2 left-1/2 z-60 w-96 max-w-full bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6">
        <h1 className="text-xl font-bold mb-4">Add Raw Products</h1>
        <AddRawMaterialsForm
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          unitsPerPackEditable={unitsPerPackEditable}
          closeModal={closeModal}
          unitOptions={unitOptions}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default AddRawMaterialModal;
