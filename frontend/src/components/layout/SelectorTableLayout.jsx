import React from "react";
import Table from "../ui/Table";

const SelectorTableLayout = ({ selectedItems, cols }) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden mb-5">
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Selected ({selectedItems.length})
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table columns={cols} data={selectedItems} />
      </div>
    </div>
  );
};

export default SelectorTableLayout;
