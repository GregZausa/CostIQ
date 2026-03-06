import React, { useRef, useState } from "react";
import OtherExpensesModal from "../components/modals/OtherExpensesModal";
import OtherExpensesTable from "../tables/OtherExpensesTable";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import Headers from "../components/layout/Headers";

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
      <Headers
        title={"Other Expenses"}
        buttonLabel={"Add Other Expenses"}
        openModal={openModal}
      />
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
