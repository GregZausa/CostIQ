import { useState } from "react";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { FileSpreadsheet, FileText } from "lucide-react";
import {
  downloadFinancialOverviewPDF,
  downloadFinancialOverviewExcel,
} from "../services/reports.api";
import SelectBox from "../components/ui/SelectBox";
import { useBreakpoint } from "../hooks/useBreakpoint";
import MobileCard from "../components/ui/MobileCard";

const FinancialOverviewTable = ({
  computedProducts,
  reportType,
  options,
  setReportType,
}) => {
  const isMobile = useBreakpoint(1400);

  const reportColumns = [
    { key: "product_name", label: "Product" },
    {
      key: "finalPrice",
      label: "Selling Price",
      render: (row) => `₱${Number(row.finalPrice).toFixed(2)}`,
    },
    {
      key: "totalCOGS",
      label: reportType === "batch" ? "Total COGS" : "COGS/Unit",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.totalCPB : row.totalCPP).toFixed(2)}`,
    },
    {
      key: "netProfit",
      label: reportType === "batch" ? "Net Profit/Batch" : "Net Profit/Unit",
      render: (row) =>
        `₱${Number(reportType === "batch" ? row.netProfitPerUnit * row.total_sellable_units : row.netProfitPerUnit).toFixed(2)}`,
    },
    {
      key: "roi",
      label: "ROI",
      render: (row) => {
        const roi = Number(row.roi);
        const color =
          roi >= 100
            ? "text-green-600"
            : roi >= 50
              ? "text-yellow-600"
              : "text-red-600";
        return <span className={`font-bold ${color}`}>{roi.toFixed(2)}%</span>;
      },
    },
    {
      key: "profit_margin",
      label: "Margin",
      render: (row) => `${Number(row.profit_margin).toFixed(2)}%`,
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
    {
      key: "discount",
      label: "Discount",
      render: (row) => `${Number(row.discount).toFixed(2)}%`,
    },
    {
      key: "sales_tax",
      label: "Tax",
      render: (row) => `${Number(row.sales_tax).toFixed(2)}%`,
    },
  ];

  const toolbar = (
    <div className="grid md:grid-cols-2 gap-2.5 mt-4">
      <SelectBox
        placeholder="Per Batch"
        name="reportType"
        options={options}
        onChange={setReportType}
        value={reportType}
      />
      <div className="flex items-center justify-end  gap-2">
        <Button
          label="Export to PDF"
          onClick={() => downloadFinancialOverviewPDF(reportType)}
          variant="danger"
          icon={<FileText size={16} />}
        />
        <Button
          label="Export to Excel"
          onClick={() => downloadFinancialOverviewExcel(reportType)}
          variant="excel"
          icon={<FileSpreadsheet size={16} />}
        />
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
      previewKeys={["finalPrice", "totalCOGS", "netProfit"]}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default FinancialOverviewTable;
