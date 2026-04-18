import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";
import SelectBox from "../components/ui/SelectBox";
import { EXPENSE_TYPES_WITH_ALL } from "../constants/expense-types";
import { useBreakpoint } from "../hooks/useBreakpoint";
import MobileCard from "../components/ui/MobileCard";

const OtherExpensesTable = ({ query, actions }) => {
  const isMobile = useBreakpoint(768);
  const expenseTypeWithAll = EXPENSE_TYPES_WITH_ALL;
  const cols = useMemo(
    () => [
      ...query.columns
        .filter((header) => header !== "other_expense_id")
        .map((header) => ({
          key: header,
          label: header
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          render:
            header === "expense_type"
              ? (row) =>
                  row.expense_type
                    ?.replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
              : undefined,
        })),
      {
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.other_expense_id}
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
        placeholder="Search for category name..."
        value={query.search}
        onChange={query.setSearch}
      />
    </div>
  );

  const sharedProps = {
    columns: cols,
    data: query.data,
    rowKey: "other_expense_id",
    page: query.page,
    totalPages: query.totalPages,
    onPageChange: query.setPage,
    toolbar,
    text: "No employee found.",
  };
  return isMobile ? (
    <MobileCard {...sharedProps} avatarKeys={{ single: "category_name" }}  />
  ) : (
    <Table {...sharedProps} />
  );
};

export default OtherExpensesTable;
