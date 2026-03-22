import { Inbox } from "lucide-react";
import React from "react";

const NoDataLayout = ({message = "No data available"}) => {
  return (
    <div className="flex flex-col items-center gap-2 py-20 text-slate-400">
      <Inbox size={32} strokeWidth={1.5} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default NoDataLayout;
