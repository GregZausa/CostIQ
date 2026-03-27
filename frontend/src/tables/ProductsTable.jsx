import React, { useMemo } from "react";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import Table from "../components/ui/Table";

const ProductsTable = ({ query, actions }) => {
  const cols = useMemo(() => [
    ...query.columns.map((header) => ({
      key: header,
      label: header.replace(/_/g, " ").replace(/b\w/g, (c) => c.toUpperCase()),
    })),
    {
      key: "action",
      render: (row) => <HeadlessUIDropdown id={row.product_id} />,
    },
  ]);
  return (
    <>
      <Table 
      columns={cols}/>
    </>
  );
};

export default ProductsTable;
