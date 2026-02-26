import React, { useState } from "react";
import AddEmployeeForm from "../forms/AddEmployeeForm";
import usePosition from "../../hooks/positions/usePosition";
import PositionModal from "./PositionModal";

const EmployeeModal = ({
  closeModal,
  form,
  actions,
  isLoading,
  setIsLoading,
}) => {
  const { positionQuery, positionActions, positionForm } = usePosition();
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [opened, setOpened] = useState("");

  const openPositionModal = (params) => {
    setIsPositionModalOpen(true);
    setOpened(params);
  };
  const closePositionModal = () => {
    setIsPositionModalOpen(false);
  };
  return (
    <>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className="fixed top-1/2 left-1/2 z-60 w-150 max-w-full bg-white/80 border border-white/20 rounded-xl 
                      shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6 hover:shadow-2xl hover:scale-102 transition-all
                      duration-300 ease-in-out text-black overflow-hidden"
      >
        <h1 className="text-xl font-bold mb-4">Add Employee</h1>
        <AddEmployeeForm
          openPositionModal={openPositionModal}
          closeModal={closeModal}
          state={form.state}
          handleChange={form.handleChange}
          handleSubmit={actions.handleSubmit}
          isLoading={isLoading}
          positionOptions={positionQuery.positionOptions}
          setIsLoading={setIsLoading}
        />
      </div>
      {isPositionModalOpen && (
        <PositionModal
          opened={opened}
          closePositionModal={closePositionModal}
          query={positionQuery}
          form={positionForm}
          actions={positionActions}
        />
      )}
    </>
  );
};

export default EmployeeModal;
