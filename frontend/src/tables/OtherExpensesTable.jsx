import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";

const OtherExpensesTable = ({ query, actions }) => {
  const cols = useMemo(
    () => [
      ...query.columns
        .filter((header) => header !== "other_expense_id")
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        })),
      {
        render: (row) => (
          <HeadlessUIDropdown
            id={row.other_expense_id}
            row={row}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns],
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
          </div>
        }
        text={"No expenses found."}
      />
    </>
  );
};

export default OtherExpensesTable;
