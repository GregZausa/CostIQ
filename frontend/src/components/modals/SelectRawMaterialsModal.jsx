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
                cpb: Number(item.cost_per_unit) * Number(value || 0),
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
          `${row.total_units_per_pack?.trim() || ""} ${row.base_unit || ""} `,
      },
      {
        key: "cost_per_unit",
        label: "Cost Per Unit",
        render: (row) => `${Number(row.cost_per_unit).toFixed(2) || ""}`,
      },
      {
        key: "units_needed",
        label: "Units Needed",
        render: (row) => (
          <TextInput
            type="number"
            min={1}
            value={row.units_needed ?? 0}
            onClick={(e) => e.stopPropagation()}
            onChange={(value) =>
              handleUnitsNeededChange(row.raw_material_id, value)
            }
          />
        ),
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
      setSelectedItems((prev) => [...prev, { ...material, cpb: 0, cpp: 0 }]);
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
        Icon={<Box size={20} className="text-slate-700" />}
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
            render: (e) => `${e.total_units_per_pack} ${e.base_unit}`,
          },
          {
            key: "cost_per_unit",
            label: "Cost Per Unit",
            render: (e) => Number(e.cost_per_unit).toFixed(2),
          },
        ]}
      />
      {selectedItems.length > 0 && (
        <SelectorTableLayout selectedItems={selectedItems} cols={cols} />
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          onClick={closeModal}
          variant="ghost"
          label="Cancel"
        />
        <Button
          onClick={handleConfirm}
          label="Confirm"
        />
      </div>
    </ModalLayout>
  );
};

export default SelectRawMaterialsModal;
