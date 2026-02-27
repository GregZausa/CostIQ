import React, { act, useRef, useState } from "react";
import Button from "../components/ui/Button";
import OtherExpensesModal from "../components/modals/OtherExpensesModal";
import OtherExpensesTable from "../tables/OtherExpensesTable";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";

const OtherExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSuccessRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { query, form, actions } = useOtherExpenses({
    openModal,
    setIsLoading,
    onSuccess: () => onSuccessRef.current?.(),
  });
  
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetForm();
    actions.setEditingId(null);
    query.load();
  };

  onSuccessRef.current = closeModal;

  return (
    <div>
      <div className="flex items-center text-center justify-between">
        <h1 className="font-bold text-2xl">Other Expenses</h1>
        <Button
          label="Add Other Expenses"
          onClick={openModal}
          backgroundAndText={"bg-gray-800 text-white"}
        />
      </div>
      {isModalOpen && (
        <OtherExpensesModal
          editingId={actions.editingId}
          closeModal={closeModal}
          form={form}
          actions={actions}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <OtherExpensesTable query={query} actions={actions} />
    </div>
  );
};

export default OtherExpenses;
