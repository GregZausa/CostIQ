import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";
import { useBreakpoint } from "../hooks/useBreakpoint";
import MoibleCard from "../components/ui/MobileCard";

const EmployeesTable = ({ query, actions }) => {
  const isMobile = useBreakpoint(768);

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
          name={`${row.first_name} ${row.last_name}`}
            id={row.employee_id}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete, actions.handleSubmit],
  );
  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
      <TextInput
        type="search"
        placeholder="Search for employee name..."
        value={query.search}
        onChange={query.setSearch}
      />
    </div>
  );

  const sharedProps = {
    columns: cols,
    data: query.data,
    rowKey: "employee_id",
    page: query.page,
    totalPages: query.totalPages,
    onPageChange: query.setPage,
    toolbar,
    text: "No employee found.",
  };
  return isMobile ? (
    <MoibleCard
      {...sharedProps}
      avatarKeys={{ first: "first_name", last: "last_name" }}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default EmployeesTable;
