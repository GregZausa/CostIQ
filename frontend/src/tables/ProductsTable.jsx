import React, { useMemo } from "react";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import Table from "../components/ui/Table";
import TextInput from "../components/ui/TextInput";
import MobileCard from "../components/ui/MobileCard";
import { useBreakpoint } from "../hooks/useBreakpoint";

const ProductsTable = ({ query, actions }) => {
  const percentFields = ["profit_margin", "discount", "sales_tax"];
  const isMobile = useBreakpoint(1400);

  const cols = useMemo(
    () => [
      ...query.columns
        .filter((header) => header !== "product_id")
        .map((header) => {
          if (header === "ingredients") {
            return {
              key: header,
              label: "Ingredients",
              render: (row) =>
                row.ingredients?.map((i) => i.material_name).join(", ") || "-",
            };
          }

          if (header === "employees") {
            return {
              key: header,
              label: "Employees",
              render: (row) =>
                row.employees
                  ?.map((e) => `${e.first_name} ${e.last_name}`)
                  .join(", ") || "-",
            };
          }

          if (header === "other_expenses") {
            return {
              key: header,
              label: "Expenses",
              render: (row) =>
                row.other_expenses?.map((e) => e.category_name).join(", ") ||
                "-",
            };
          }

          return {
            key: header,
            label: header
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            render: percentFields.includes(header)
              ? (row) => `${Number(row[header]).toFixed(2)} %`
              : undefined,
          };
        }),

      {
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.product_id}
            onDelete={actions.handleDelete}
          />
        ),
      },
    ],
    [query.columns],
  );
  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
      <TextInput
        type="search"
        placeholder="Search for product name..."
        value={query.search}
        onChange={query.setSearch}
      />
    </div>
  );

  const sharedProps = {
    columns: cols,
    data: query.data,
    rowKey: "product_id",
    page: query.page,
    totalPages: query.totalPages,
    onPageChange: query.setPage,
    toolbar,
    text: "No product found.",
  };
  return isMobile ? (
    <MobileCard
      {...sharedProps}
      avatarKeys={{ single: "product_name" }}
      previewKeys={[
        "profit_margin",
        "discount",
        "sales_tax",
        "ingredients",
        "employees",
        "other_expenses",
      ]}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default ProductsTable;
