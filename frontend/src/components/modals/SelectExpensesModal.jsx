import React, { useMemo, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { Toolbox } from "lucide-react";
import Table from "../ui/Table";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import SelectorLayout from "../layout/SelectorLayout";

const SelectExpensesModal = ({
  closeModal,
  selected = [],
  totalSellableUnits,
  expensesQuery,
  onConfirm,
}) => {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selected) ? selected.map((s) => ({ ...s })) : [],
  );
  const handleQuantityChange = (other_expense_id, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.other_expense_id === other_expense_id
          ? {
              ...item,
              quantity: value,
              cpr: Number(item.expense_cost) * Number(value || 0),
              cpp: totalSellableUnits
                ? (Number(item.expense_cost) * Number(value || 0)) /
                  Number(totalSellableUnits)
                : 0,
            }
          : item,
      ),
    );
  };

  const cols = useMemo(() => [
    {
      key: "category_name",
      label: "Category Name",
      render: (row) => `${row.category_name?.trim() || ""}`,
    },
    {
      key: "quantity",
      label: "Quantity",
      render: (row) => (
        <TextInput
          type="number"
          min={1}
          value={row.quantity ?? 0}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) =>
            handleQuantityChange(row.other_expense_id, Number(value))
          }
        />
      ),
    },
    {
      key: "expense_cost",
      label: "Expense Cost",
      render: (row) => `₱${row.expense_cost?.trim() || ""}`,
    },
    {
      key: "cpr",
      label: "Cost Per Recipe",
      render: (row) => `₱${(row.cpr || 0).toFixed(2)}`,
    },
    {
      key: "cpp",
      label: "Cost Per Product",
      render: (row) => `₱${(row.cpp || 0).toFixed(2)}`,
    },
  ]);

  const isSelected = (other_expense_id) =>
    selectedItems.some((s) => s.other_expense_id === other_expense_id);

  const toggleSelect = (expense) => {
    if (isSelected(expense.other_expense_id)) {
      setSelectedItems((prev) =>
        prev.filter((s) => s.other_expense_id !== expense.other_expense_id),
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...expense, cpr: 0, cpp: 0 }]);
    }
  };

  const filtered = expensesQuery.data.filter((e) =>
    e.category_name.toLowerCase().includes(search.toLowerCase() || ""),
  );

  const handleConfirm = () => {
    onConfirm(selectedItems);
    closeModal();
  };
  return (
    <>
      <div
        className="z-60 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <ModalLayout widthStyle={"w-300"}>
        <SelectorLayout
          search={search}
          setSearch={setSearch}
          filtered={filtered}
          isSelected={isSelected}
          toggleSelect={toggleSelect}
          Icon={<Toolbox size={20} className="text-gray-700" />}
          title="Select Other Expenses"
          idKey="other_expense_id"
          columns={[
            {
              key: "category_name",
              label: "Category Name",
              render: (e) => e.category_name,
            },
            {
              key: "expense_cost",
              label: "Expense Cost",
              render: (e) => e.expense_cost,
            },
          ]}
        />
        {selectedItems.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Selected({selectedItems.length})
              </span>
            </div>
            <Table columns={cols} data={selectedItems} />
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            onClick={closeModal}
            label="Cancel"
            backgroundAndText={
              "bg-white hover:bg-gray-400 text-black border-none"
            }
          />
          <Button
            onClick={handleConfirm}
            label="Confirm"
            backgroundAndText={"bg-gray-800 hover:bg-blue-500 text-white"}
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default SelectExpensesModal;
