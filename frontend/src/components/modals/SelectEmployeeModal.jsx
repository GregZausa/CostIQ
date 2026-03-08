import React, { useMemo, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { IdCardLanyard } from "lucide-react";
import TextInput from "../ui/TextInput";
import Table from "../ui/Table";
import SelectBox from "../ui/SelectBox";
import Button from "../ui/Button";

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
      setSelectedItems((prev) => [
        ...prev,
        { ...employee, prepTime: "", cpr: 0, cpp: 0 },
      ]);
    }
  };

  const handlePrepTimeChange = (employee_id, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.employee_id === employee_id
          ? {
              ...item,
              prepTime: value,
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
      render: (row) => `${row.position_name || ""}`,
    },
    {
      key: "rate_per_hr",
      label: "Rate Per Hr.",
      render: (row) => `${row.rate_per_hr || ""}`,
    },
    {
      key: "prep_time",
      label: "Prep Time",
      render: (row) => (
        <TextInput
          type="number"
          min={1}
          value={row.prepTime ?? 1}
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
        <div className="flex items-center gap-2 mb-5">
          <IdCardLanyard size={20} className="text-gray-700" />
          <h1 className="text-xl font-bold">Select Employees</h1>
        </div>

        <div className="relative mb-4">
          <TextInput type="search" value={search} onChange={setSearch} />
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
          <div className="bg-gray-50 px-4 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Employee Name
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Position Name
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Rate Per Hr.
              </span>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <span className="text-center py-10 text-gray-500 italic font-semibold text-sm">
                No employee found
              </span>
            ) : (
              filtered.map((employee) => (
                <div
                  key={employee.employee_id}
                  onClick={() => toggleSelect(employee)}
                  className={`flex items-center text-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${
                    isSelected(employee.employee_id)
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors 
                        ${
                          isSelected(employee.employee_id)
                            ? "bg-white border-white"
                            : "border-gray-300"
                        }`}
                  >
                    {isSelected(employee.employee_id) && (
                      <svg
                        className="w-2.5 h-2.5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M10 3L5 8.5 2 5.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {`${employee.first_name} ${employee.last_name}`}
                  </span>
                  <span className="text-sm font-medium">
                    {employee.position_name}
                  </span>
                  <span className="text-sm font-medium">
                    {employee.rate_per_hr}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
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
          <Button onClick={closeModal} label="Cancel" />
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
