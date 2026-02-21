import React, { act, useEffect, useMemo, useState } from "react";
import Table from "../components/ui/Table";
import TextInput from "../components/ui/TextInput";
import SelectBox from "../components/ui/SelectBox";
import useUnits from "../hooks/useUnits";
import useRawMaterials from "../hooks//raw-materials/useRawMaterials";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";

const RawMaterialsTable = ({ onEdit }) => {
  const { unitOptionsWithAll } = useUnits();
  const { query, actions } =
    useRawMaterials();

  const moneyFields = ["price_per_pack", "cost_per_unit"];

  const cols = useMemo(
    () => [
      ...query.columns
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
        key: "actions",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.raw_material_id}
            row={row}
            onDelete={actions.handleDelete}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete],
  );

  return (
    <>
      <Table
        columns={cols}
        data={query.data}
        page={query.page}
        totalPages={query.totalPages}
        onPageChange={query.setPage}
        toolbar={
          <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
            <TextInput
              placeholder="Search for material name..."
              value={query.search}
              onChange={query.setSearch}
            />
            <SelectBox
              placeholder="Filter Pack Unit"
              name="packUnit"
              options={unitOptionsWithAll}
              onChange={query.setSelectedUnit}
              value={query.selectedUnit}
            />
          </div>
        }
        text={"No raw material found."}
      />
    </>
  );
};

export default RawMaterialsTable;
