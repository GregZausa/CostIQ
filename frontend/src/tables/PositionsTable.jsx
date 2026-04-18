import React, { useMemo } from "react";
import Table from "../components/ui/Table";
import HeadlessUIDropdown from "../components/ui/HeadlessUIDropdown";
import TextInput from "../components/ui/TextInput";
import { useBreakpoint } from "../hooks/useBreakpoint";
import MobileCard from "../components/ui/MobileCard";

const PositionsTable = ({ query, actions }) => {
  const isMobile = useBreakpoint(768);
  const cols = useMemo(
    () => [
      ...query.columns.map((header) => ({
        key: header,
        label: header
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      })),
      {
        key: "action",
        render: (row) => (
          <HeadlessUIDropdown
            id={row.position_id}
            onDelete={actions.handleDelete}
            onEdit={actions.handleEdit}
          />
        ),
      },
    ],
    [query.columns, actions.handleDelete, actions.handleEdit],
  );
  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 max-w-4xl mt-4">
      <TextInput
        type="search"
        placeholder="Search for position type..."
        value={query.search}
        onChange={query.setSearch}
      />
    </div>
  );

  const sharedProps = {
    columns: cols,
    data: query.data,
    rowKey: "position_id",
    page: query.page,
    totalPages: query.totalPages,
    onPageChange: query.setPage,
    toolbar,
    text: "No employee found.",
  };
  return isMobile ? (
    <MobileCard {...sharedProps} avatarKeys={{ single: "position_name" }} />
  ) : (
    <Table {...sharedProps} />
  );
};

export default PositionsTable;
