import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import useOtherExpenses from "../hooks/useOtherExpenses";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

const OtherExpensesTable = () => {
  const { data, columns, search, setSearch, setPage, page, totalPages, handleDelete } =
    useOtherExpenses();

  const cols = useMemo(
    () => [
      ...columns
        .filter((header) => header !== "other_expense_id")
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
      {
        render: (row) => (
          <HeadlessUIDropdown id={row.other_expense_id} row={row} onDelete={handleDelete}/>
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
        text={"No expenses found."}
      />
    </>
  );
};

export default OtherExpensesTable;
