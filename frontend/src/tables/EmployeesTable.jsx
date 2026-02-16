import React, { useState } from "react";
import useEmployee from "../hooks/useEmployee";
import Table from "../components/ui/Table";
import { useEffect } from "react";
import { useMemo } from "react";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

const EmployeesTable = () => {
  const { handleDelete, loadEmployees, data, columns } = useEmployee();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

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
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchedName =
        row.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.last_name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchedName;
    });
  },[data, searchTerm]);
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
          </div>
        }
        text={"No employee found."}
      />
    </>
  );
};

export default EmployeesTable;
