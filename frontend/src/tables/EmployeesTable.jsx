import React from "react";
import useEmployee from "../hooks/useEmployee";
import Table from "../components/ui/Table";
import { useEffect } from "react";
import { useMemo } from "react";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";

const EmployeesTable = () => {
  const { loadEmployees, data, columns } = useEmployee();

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
        .filter((header) => header !== "first_name" && header !== "last_name")
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
      {
        render: (row) => <HeadlessUIDropdown row={row} />,
      },
    ],
    [columns],
  );
  return (
    <>
      <Table columns={cols} data={data} />
    </>
  );
};

export default EmployeesTable;
