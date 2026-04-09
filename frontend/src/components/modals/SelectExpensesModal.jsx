import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { Toolbox } from "lucide-react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import SelectorLayout from "../layout/SelectorLayout";
import SelectorTableLayout from "../layout/SelectorTableLayout";
import toast from "react-hot-toast";

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

  useEffect(() => {
    setSelectedItems((prev) =>
      prev.map((item) => ({
        ...item,
        cpp:
          totalSellableUnits && item.quantity
            ? (Number(item.expense_cost) * Number(item.quantity)) /
              Number(totalSellableUnits)
            : 0,
      })),
    );
  }, [totalSellableUnits]);
  const handleQuantityChange = useCallback(
    (other_expense_id, value) => {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.other_expense_id === other_expense_id
            ? {
                ...item,
                quantity: value,
                cpb: Number(item.expense_cost) * Number(value || 0),
                cpp: totalSellableUnits
                  ? (Number(item.expense_cost) * Number(value || 0)) /
                    Number(totalSellableUnits)
                  : 0,
              }
            : item,
        ),
      );
    },
    [totalSellableUnits],
  );

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
            handleQuantityChange(row.other_expense_id, value)
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
      key: "expense_type",
      label: "Expense Type",
      render: (row) =>
        row.expense_type
          ?.replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
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
      setSelectedItems((prev) => [...prev, { ...expense, cpb: 0, cpp: 0 }]);
    }
  };

  const filtered = expensesQuery.data.filter((e) =>
    e.category_name.toLowerCase().includes(search.toLowerCase() || ""),
  );

  const handleConfirm = () => {
    const hasValid = selectedItems.some(
      (item) => !item.quantity || Number(item.quantity) <= 0,
    );
    if (hasValid) {
      toast.error("Quantity needed to be greated than 0");
      return;
    }
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
          Icon={<Toolbox size={20} className="text-slate-700" />}
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
            {
              key: "expense_type",
              label: "Expense Type",
              render: (row) =>
                row.expense_type
                  ?.replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase()),
            },
          ]}
        />
        {selectedItems.length > 0 && (
          <SelectorTableLayout selectedItems={selectedItems} cols={cols} />
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={closeModal} variant="ghost" label="Cancel" />
          <Button onClick={handleConfirm} label="Confirm" />
        </div>
      </ModalLayout>
    </>
  );
};

export default SelectExpensesModal;
