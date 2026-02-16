import React, { useEffect, useMemo, useState } from "react";
import Table from "../components/ui/Table";
import TextInput from "../components/ui/TextInput";
import SelectBox from "../components/ui/SelectBox";
import useUnits from "../hooks/useUnits";
import useRawMaterials from "../hooks/useRawMaterials";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";

const RawMaterialsTable = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState();
  const { unitOptionsWithAll } = useUnits();
  const { data, columns, loadRawMaterials, handleDelete, handleEdit } =
    useRawMaterials(onEdit);

  useEffect(() => {
    loadRawMaterials();
  }, [loadRawMaterials]);

  const moneyFields = ["price_per_pack", "cost_per_unit"];

  const cols = useMemo(
    () => [
      ...columns
        .filter((header) => header !== "raw_material_id")
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          render: moneyFields.includes(header)
            ? (row) =>
                `₱ ${Number(row[header])
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
            : undefined,
        })),
      {
        render: (row) => (
          <HeadlessUIDropdown
            id={row.raw_material_id}
            row={row}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ),
      },
    ],
    [columns],
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchedName = row.material_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchedPackUnit = selectedUnit
        ? row.pack_unit == selectedUnit
        : true;

      return matchedName && matchedPackUnit;
    });
  },[data, searchTerm, selectedUnit]);
  return (
    <>
      <Table
        columns={cols}
        data={filteredData}
        toolbar={
          <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
            <TextInput
              placeholder="Search for material name..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <SelectBox
              placeholder="Filter Pack Unit"
              name="packUnit"
              options={unitOptionsWithAll}
              onChange={setSelectedUnit}
              value={selectedUnit}
            />
          </div>
        }
        text={"No raw material found."}
      />
    </>
  );
};

export default RawMaterialsTable;
