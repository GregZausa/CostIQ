import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ModalLayout from "../layout/ModalLayout";
import { Box } from "lucide-react";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import SelectorLayout from "../layout/SelectorLayout";
import SelectorTableLayout from "../layout/SelectorTableLayout";

const SelectRawMaterialsModal = ({
  closeModal,
  onConfirm,
  selected = [],
  totalSellableUnits,
  materialQuery,
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
          totalSellableUnits && item.units_needed
            ? (Number(item.cost_per_unit) * Number(item.units_needed)) /
              Number(totalSellableUnits)
            : 0,
      })),
    );
  }, [totalSellableUnits]);

  const handleUnitsNeededChange = useCallback(
    (raw_material_id, value) => {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.raw_material_id === raw_material_id
            ? {
                ...item,
                units_needed: value,
                cpr: Number(item.cost_per_unit) * Number(value || 0),
                cpp: totalSellableUnits
                  ? (Number(item.cost_per_unit) * Number(value || 0)) /
                    Number(totalSellableUnits || 0)
                  : 0,
              }
            : item,
        ),
      );
    },
    [totalSellableUnits],
  );
  const cols = useMemo(
    () => [
      {
        key: "list_of_ingredients",
        label: "List of Ingredients",
        render: (row) => `${row.material_name?.trim() || ""}`,
      },
      {
        key: "price",
        label: "Price",
        render: (row) => `${row.price_per_pack?.trim() || ""}`,
      },
      {
        key: "number_of_units",
        label: "Number of Units",
        render: (row) =>
          `${row.units_per_pack?.trim() || ""} ${row.base_unit || ""} `,
      },
      {
        key: "cost_per_unit",
        label: "Cost Per Unit",
        render: (row) => `${row.cost_per_unit || ""}`,
      },
      {
        key: "units_needed",
        label: "Units Needed",
        render: (row) => (
          <TextInput
            type="number"
            min={1}
            max={Number(row.units_per_pack)}
            value={row.units_needed ?? 0}
            onClick={(e) => e.stopPropagation()}
            onChange={(value) =>
              handleUnitsNeededChange(row.raw_material_id, value)
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
    ],
    [handleUnitsNeededChange],
  );
  const filtered = materialQuery.data.filter((d) =>
    d.material_name.toLowerCase().includes(search.toLowerCase()),
  );
  const isSelected = (raw_material_id) =>
    selectedItems.some((s) => s.raw_material_id === raw_material_id);

  const toggleSelect = (material) => {
    if (isSelected(material.raw_material_id)) {
      setSelectedItems((prev) =>
        prev.filter((s) => s.raw_material_id !== material.raw_material_id),
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...material, cpr: 0, cpp: 0 }]);
    }
  };
  const handleConfirm = () => {
    const hasValid = selectedItems.some(
      (item) => !item.units_needed || Number(item.units_needed) <= 0,
    );
    if (hasValid) {
      toast.error("Units needed to be greated than 0");
      return;
    }
    onConfirm(selectedItems);
    closeModal();
  };
  return (
    <ModalLayout widthStyle={"w-300"} closeModal={closeModal}>
      <SelectorLayout
        search={search}
        setSearch={setSearch}
        filtered={filtered}
        toggleSelect={toggleSelect}
        isSelected={isSelected}
        Icon={<Box size={20} className="text-gray-700" />}
        title="Select Raw Materials"
        idKey="raw_material_id"
        columns={[
          {
            key: "material_name",
            label: "Available Materials",
            render: (e) => e.material_name,
          },
          {
            key: "number_of_units",
            label: "Number of Units",
            render: (e) => `${e.units_per_pack} ${e.base_unit}`,
          },
          {
            key: "cost_per_unit",
            label: "Cost Per Unit",
            render: (e) => e.cost_per_unit,
          },
        ]}
      />
      {selectedItems.length > 0 && (
        <SelectorTableLayout selectedItems={selectedItems} cols={cols} />
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
  );
};

export default SelectRawMaterialsModal;
