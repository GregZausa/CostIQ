import React, { useRef, useState } from "react";
import AddEmployeeForm from "../forms/AddEmployeeForm";
import usePosition from "../../hooks/positions/usePosition";
import PositionModal from "./PositionModal";
import ModalLayout from "../layout/ModalLayout";

const EmployeeModal = ({
  closeModal,
  form,
  actions,
  isLoading,
  setIsLoading,
  editingId,
}) => {
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [opened, setOpened] = useState("");

  const onSuccessRef = useRef(null);

  const openPositionModal = (params) => {
    setIsPositionModalOpen(true);
    setOpened(params);
  };

  const { positionQuery, positionActions, positionForm } = usePosition({
    openPositionModal,
    onSuccess: () => onSuccessRef.current?.(),
  });

  const closePositionModal = () => {
    setIsPositionModalOpen(false);
    positionForm.resetForm();
    positionQuery.loadPosition();
  };

  onSuccessRef.current = closePositionModal;
  return (
    <>
      <ModalLayout closeModal={closeModal} widthStyle={"w-150"}>
        <h1 className="text-xl font-bold mb-4">
          {editingId !== null ? "Edit Employee" : "Add Employee"}
        </h1>
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
      </ModalLayout>

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
