import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import TextInput from "../components/ui/TextInput";
import SelectBox from "../components/ui/SelectBox";
import useUnits from "../hooks/useUnits";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import { useBreakpoint } from "../hooks/useBreakpoint";
import MoibleCard from "../components/ui/MobileCard";

const RawMaterialsTable = ({ query, actions }) => {
  const isMobile = useBreakpoint(768);
  const { unitOptionsWithAll } = useUnits();

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
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
          name={row.material_name}
            id={row.raw_material_id}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete, actions.handleEdit],
  );
  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
      <TextInput
        type="search"
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
  );

  const sharedProps = {
    columns: cols,
    data: query.data,
    rowKey: "raw_material_id",
    page: query.page,
    totalPages: query.totalPages,
    onPageChange: query.setPage,
    toolbar,
    text: "No material found.",
  };

  return isMobile ? (
    <MoibleCard
      {...sharedProps}
      avatarKeys={{ single: "material_name" }}
      previewKeys={["price_per_pack", "total_units_per_pack","cost_per_unit"]}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default RawMaterialsTable;
