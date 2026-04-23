import React, { useState } from "react";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { FileSpreadsheet, FileText } from "lucide-react";
import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";
import {
  downloadProductCostSummaryExcel,
  downloadProductCostSummaryPDF,
} from "../services/reports.api";
import SelectBox from "../components/ui/SelectBox";
import MobileCard from "../components/ui/MobileCard";
import { useBreakpoint } from "../hooks/useBreakpoint";

const ProductCostSummaryTable = ({ computedProducts, reportType, setReportType, options }) => {
  const isMobile = useBreakpoint(1400);
  const reportColumns = [
    { key: "product_name", label: "Product" },
    {
      key: "ingredients_cost",
      label: "Ingredients",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.ingredients_cost : row.materialCPP).toFixed(2)}`,
    },
    {
      key: "labor_cost",
      label: "Labor",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.labor_cost : row.employeeCPP).toFixed(2)}`,
    },
    {
      key: "expense_cost",
      label: "Expenses",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.expense_cost : row.otherExpenseCPP).toFixed(2)}`,
    },
    {
      key: "totalCPB",
      label: reportType === "batch" ? "Total COGS" : "COGS per Unit",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.totalCPB : row.totalCPP).toFixed(2)}`,
    },
    {
      key: "finalPrice",
      label: "Selling Price",
      render: (row) => `₱${Number(row.finalPrice).toFixed(2)}`,
    },
    {
      key: "netProfitPerUnit",
      label: reportType === "batch" ? "Net Profit/Batch" : "Net Profit/Unit",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.netProfitPerUnit * row.total_sellable_units : row.netProfitPerUnit).toFixed(2)}`,
    },
    {
      key: "roi",
      label: "ROI",
      render: (row) => `${Number(row.roi).toFixed(2)}%`,
    },
    {
      key: "breakEvenUnits",
      label: "BE Units",
      render: (row) => row.breakEvenUnits ?? "N/A",
    },
    {
      key: "breakEvenRevenue",
      label: "BE Revenue",
      render: (row) =>
        row.breakEvenRevenue
          ? `₱${Number(row.breakEvenRevenue).toFixed(2)}`
          : "N/A",
    },
  ];
  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 mt-4">
      <SelectBox
        placeholder="Per Batch"
        name="sizeFilter"
        options={options}
        onChange={setReportType}
        value={reportType}
      />

      <div className="flex items-center justify-end  gap-2">
        <div className="flex items-center justify-between">
          <Button
            label="Export to PDF"
            onClick={() => downloadProductCostSummaryPDF(reportType)}
            variant="danger"
            icon={<FileText size={16} />}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            label="Export to Excel"
            onClick={() => downloadProductCostSummaryExcel(reportType)}
            variant="excel"
            icon={<FileSpreadsheet size={16} />}
          />
        </div>
      </div>
    </div>
  );
  const sharedProps = {
    columns: reportColumns,
    data: computedProducts,
    rowKey: "product_id",
    toolbar,
    text: "No products found.",
  };
  return isMobile ? (
    <MobileCard
      {...sharedProps}
      avatarKeys={{ single: "product_name" }}
      previewKeys={["finalPrice", "netProfitPerUnit", "breakEvenRevenue"]}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default ProductCostSummaryTable;
