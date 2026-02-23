import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddOtherExpensesModal from "../components/modals/AddOtherExpensesModal";
import OtherExpensesTable from "../tables/OtherExpensesTable";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";

const OtherExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { query, form, actions } = useOtherExpenses({
    closeModal,
    openModal,
    setIsLoading,
  });
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
        <AddOtherExpensesModal
          closeModal={() => {
            closeModal();
            query.load();
          }}
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
