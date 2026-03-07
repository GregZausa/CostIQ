import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

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
      <Table columns={cols} data={query.data} 
      page={query.page}
      totalPages={query.totalPages}
      onPageChange={query.setPage}
      toolbar={
        <div>
          <TextInput
          type="search"
          placeholder="Search position..."
          value={query.search}
          onChange={query.setSearch}/>
        </div>
      }/>
    </>
  );
};

export default PositionsTable;
