import React, { useRef, useState } from "react";
import OtherExpensesModal from "../components/modals/OtherExpensesModal";
import OtherExpensesTable from "../tables/OtherExpensesTable";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import Headers from "../components/layout/Headers";
import HeaderCard from "../components/cards/HeaderCard";
import { Box } from "lucide-react";

const OtherExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSuccessRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const { query, form, actions, totalOtherExpenses, mostUsedExpense } =
    useOtherExpenses({
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-2 gap-2">
        <HeaderCard
          title="Total Expense"
          value={totalOtherExpenses}
          description="All expenses currently registered"
          icon={<Box size={18} />}
        />
        <HeaderCard
          title="Most used expense"
          value={
            mostUsedExpense
              ? `${Number(mostUsedExpense.usage_count).toLocaleString()}`
              : "-"
          }
          description={mostUsedExpense?.category_name}
          icon={<Box size={18} />}
        />
      </div>
      <OtherExpensesTable query={query} actions={actions} />
    </div>
  );
};

export default OtherExpenses;
