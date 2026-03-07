import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

const EmployeesTable = ({ query, actions }) => {
  const cols = useMemo(
    () => [
      {
        key: "full_name",
        label: "Full Name",
        render: (row) =>
          `${row.first_name?.trim() || ""} ${row.last_name?.trim() || ""}`,
      },
      ...(query.columns || [])
        .filter(
          (header) =>
            header !== "first_name" &&
            header !== "last_name" &&
            header !== "employee_id",
        )
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
      {
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.employee_id}
            row={row}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete, actions.handleSubmit],
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
            type="search"
              placeholder="Search for employee name..."
              value={query.search}
              onChange={query.setSearch}
            />
          </div>
        }
        text={"No employee found."}
      />
    </>
  );
};

export default EmployeesTable;
