import React, { useMemo, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { IdCardLanyard } from "lucide-react";
import TextInput from "../ui/TextInput";
import Table from "../ui/Table";
import Button from "../ui/Button";
import SelectorLayout from "../layout/SelectorLayout";

const SelectEmployeeModal = ({
  closeModal,
  onConfirm,
  totalSellableUnits,
  selected = [],
  employeeQuery,
}) => {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(selected) ? selected.map((s) => ({ ...s })) : [],
  );
  const isSelected = (employee_id) =>
    selectedItems.some((s) => s.employee_id === employee_id);
  const toggleSelect = (employee) => {
    if (isSelected(employee.employee_id)) {
      setSelectedItems((prev) =>
        prev.filter((s) => s.employee_id !== employee.employee_id),
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...employee, cpr: 0, cpp: 0 }]);
    }
  };

  const handlePrepTimeChange = (employee_id, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.employee_id === employee_id
          ? {
              ...item,
              prep_time: value,
              cpr: Number(item.rate_per_hr) * (value || 0),
              cpp: totalSellableUnits
                ? (Number(item.rate_per_hr) * (value || 0)) /
                  Number(totalSellableUnits || 0)
                : 0,
            }
          : item,
      ),
    );
  };

  const cols = useMemo(() => [
    {
      key: "employee_list",
      label: "Employee List",
      render: (row) =>
        `${row.first_name?.trim() || ""} ${row.last_name?.trim() || ""}`,
    },
    {
      key: "position_name",
      label: "Position Name",
      render: (row) => `${row.position_name?.trim() || ""}`,
    },
    {
      key: "rate_per_hr",
      label: "Rate Per Hr.",
      render: (row) => `₱${row.rate_per_hr?.trim() || ""}`,
    },
    {
      key: "prep_time",
      label: "Prep Time",
      render: (row) => (
        <TextInput
          type="number"
          min={1}
          value={row.prep_time ?? 0}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) =>
            handlePrepTimeChange(row.employee_id, Number(value))
          }
        />
      ),
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

  const filtered = employeeQuery.data.filter(
    (e) =>
      e.last_name.toLowerCase().includes(search.toLowerCase()) ||
      e.first_name.toLowerCase().includes(search.toLowerCase()),
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
          Icon={<IdCardLanyard size={20} className="text-gray-700" />}
          title="Select Employee"
          idKey="employee_id"
          columns={[
            {
              key: "name",
              label: "Employee Name",
              render: (e) => `${e.first_name} ${e.last_name}`,
            },
            {
              key: "position_name",
              label: "Position Name",
              render: (e) => e.position_name,
            },
            {
              key: "rate_per_hr",
              label: "Rate Per Hr.",
              render: (e) => e.rate_per_hr,
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
            <div className="overflow-x-auto">
              <Table columns={cols} data={selectedItems} />
            </div>
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

export default SelectEmployeeModal;
