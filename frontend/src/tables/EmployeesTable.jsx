import React, { useState } from "react";
import useEmployee from "../hooks/useEmployee";
import Table from "../components/ui/Table";
import { useEffect } from "react";
import { useMemo } from "react";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

const EmployeesTable = () => {
  const { handleDelete, data, columns, totalPages, page, setPage, search, setSearch } = useEmployee();

  const cols = useMemo(
    () => [
      {
        key: "full_name",
        label: "Full Name",
        render: (row) =>
          `${row.first_name?.trim() || ""} ${row.last_name?.trim() || ""}`,
      },
      ...(columns || [])
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
        render: (row) => (
          <HeadlessUIDropdown
            id={row.employee_id}
            row={row}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [columns],
  );
  return (
    <>
      <Table
        columns={cols}
        data={data}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        toolbar={
          <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
            <TextInput
              placeholder="Search for material name..."
              value={search}
              onChange={setSearch}
            />
          </div>
        }
        text={"No employee found."}
      />
    </>
  );
};

export default EmployeesTable;
