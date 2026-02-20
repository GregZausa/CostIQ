import React, { useState } from "react";
import Button from "../components/ui/Button";
import AddUtilitiesModal from "../components/modals/AddOtherExpensesModal";
import OtherExpensesTable from "../tables/OtherExpensesTable";

const OtherExpenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const openModal = (id = null) => {
    setEditingId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };
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
        <AddUtilitiesModal
          closeModal={() => {
            closeModal();
            loadRawMaterials();
          }}
          editingId={editingId}
        />
      )}
      <OtherExpensesTable />
    </div>
  );
};

export default OtherExpenses;
