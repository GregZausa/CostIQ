import React from "react";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { FileSpreadsheet, FileText } from "lucide-react";
import { authFetch } from "../utils/authFetch";
import { apiUrl } from "../config/apiUrl";
import { downloadProductCostSummaryExcel, downloadProductCostSummaryPDF } from "../services/reports.api";
const reportColumns = [
  { key: "product_name", label: "Product" },
  {
    key: "ingredients_cost",
    label: "Ingredients",
    render: (row) =>
      `₱${Number(row.ingredients_cost).toFixed(2)}`,
  },
  {
    key: "labor_cost",
    label: "Labor",
    render: (row) =>
      `₱${Number(row.labor_cost).toFixed(2)}`,
  },
  {
    key: "expense_cost",
    label: "Expenses",
    render: (row) => `₱${Number(row.expense_cost).toFixed(2)}`,
  },
  {
    key: "totalCPB",
    label: "Total COGS",
    render: (row) => `₱${Number(row.totalCPB).toFixed(2)}`,
  },
  {
    key: "finalPrice",
    label: "Selling Price",
    render: (row) => `₱${Number(row.finalPrice).toFixed(2)}`,
  },
  {
    key: "netProfitPerUnit",
    label: "Net Profit/Unit",
    render: (row) => `₱${Number(row.netProfitPerUnit).toFixed(2)}`,
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
const ProductCostSummaryTable = ({ computedProducts }) => {
  return (
    <Table
      columns={reportColumns}
      data={computedProducts}
      toolbar={
        <div className="flex justify-end space-x-2">
          <div className="flex items-center justify-between">
            <Button
              label="Export to PDF"
              onClick={downloadProductCostSummaryPDF}
              variant="danger"
              icon={<FileText size={16} />}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              label="Export to Excel"
              onClick={downloadProductCostSummaryExcel}
              variant="excel"
              icon={<FileSpreadsheet size={16} />}
            />
          </div>
        </div>
      }
    />
  );
};

export default ProductCostSummaryTable;
