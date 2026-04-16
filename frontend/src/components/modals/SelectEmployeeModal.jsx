import React, { useCallback, useEffect, useMemo, useState } from "react";
import ModalLayout from "../layout/ModalLayout";
import { IdCardLanyard } from "lucide-react";
import Button from "../ui/Button";
import SelectorLayout from "../layout/SelectorLayout";
import SelectorTableLayout from "../layout/SelectorTableLayout";
import HeadlessUICheckbox from "../ui/HeadlessUICheckbox";

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
        { ...employee, cpb: 0, cpp: 0, multi_product_handling: false },
      ]);
    }
  };
  useEffect(() => {
    setSelectedItems((prev) =>
      prev.map((item) => ({
        ...item,
        cpp:
          totalSellableUnits && item.prep_time
            ? (Number(item.rate_per_day) * Number(item.prep_time)) /
              Number(totalSellableUnits)
            : 0,
      })),
    );
  }, [totalSellableUnits]);

  useEffect(() => {
    console.log("selectedItems updated:", selectedItems);
  }, [selectedItems]);

  const handleMultiProductChange = useCallback((employee_id, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.employee_id === employee_id
          ? {
              ...item,
              multi_product_handling: value,
            }
          : item,
      ),
    );
  });

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
      key: "rate_per_day",
      label: "Rate Per Day.",
      render: (row) => `₱${row.rate_per_day?.trim() || ""}`,
    },
    {
      key: "multi_product_handling",
      label: "Multi-Product Handling?",
      render: (row) => (
        <HeadlessUICheckbox
          checked={row.multi_product_handling ?? false}
          onChange={(value) => handleMultiProductChange(row.employee_id, value)}
        />
      ),
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
          Icon={<IdCardLanyard size={20} className="text-slate-700" />}
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
              key: "rate_per_day",
              label: "Rate Per Hr.",
              render: (e) => e.rate_per_day,
            },
          ]}
        />
        {selectedItems.length > 0 && (
          <SelectorTableLayout cols={cols} selectedItems={selectedItems} />
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={closeModal} label="Cancel" />
          <Button onClick={handleConfirm} label="Confirm" />
        </div>
      </ModalLayout>
    </>
  );
};

export default SelectEmployeeModal;
