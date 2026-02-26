import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";

const PositionsTable = ({ query, actions }) => {
  const cols = useMemo(
    () => [
      ...query.columns.map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
      {
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.position_id}
            row={row}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete, actions.handleEdit],
  );
  return (
    <>
      <Table columns={cols} data={query.data} />
    </>
  );
};

export default PositionsTable;
