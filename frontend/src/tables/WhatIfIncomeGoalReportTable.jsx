import { useState } from "react";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import SelectBox from "../components/ui/SelectBox";
import { FileSpreadsheet, FileText } from "lucide-react";
import {
  downloadWhatIfPDF,
  downloadWhatIfExcel,
} from "../services/reports.api";
import { useAuth } from "../hooks/useAuth";
import PremiumModal from "../components/modals/PremiumModal";

import MobileCard from "../components/ui/MobileCard";
import { useBreakpoint } from "../hooks/useBreakpoint";
import TextInput from "../components/ui/TextInput";

const MILESTONES = [0.25, 0.5, 0.75, 1];

const computeMilestone = (product, goal, batchesPerDay, percentage) => {
  const milestoneGoal = goal * percentage;
  const profitPerBatch = Number(product.netProfit);
  const batchSize = Number(product.total_sellable_units);
  const price = Number(product.finalPrice);
  const costPerUnit = Number(product.totalCPP);
  const breakEvenUnits = Number(product.breakEvenUnits ?? 0);

  const batchesNeeded = Math.ceil(milestoneGoal / profitPerBatch);
  const unitsNeeded = Math.ceil(batchesNeeded * batchSize);
  const revenueNeeded = unitsNeeded * price;
  const totalCost = unitsNeeded * costPerUnit;
  const beBatches = Math.ceil(breakEvenUnits / batchSize);
  const profitBatches = Math.max(0, batchesNeeded - beBatches);

  let daysNeeded = null;
  let weeksNeeded = null;
  let monthsNeeded = null;
  let profitPerDay = null;
  let profitPerWeek = null;

  if (batchesPerDay > 0) {
    daysNeeded = Math.ceil(batchesNeeded / batchesPerDay);
    weeksNeeded = Math.ceil(daysNeeded / 7);
    monthsNeeded = (daysNeeded / 30).toFixed(1);
    profitPerDay = batchesPerDay * profitPerBatch;
    profitPerWeek = profitPerDay * 7;
  }

  return {
    id: `${percentage * 100}%`,
    percentage: `${percentage * 100}%`,
    milestoneGoal,
    batchesNeeded,
    unitsNeeded,
    revenueNeeded,
    totalCost,
    profitPerBatch,
    beBatches,
    profitBatches,
    daysNeeded,
    weeksNeeded,
    monthsNeeded,
    profitPerDay,
    profitPerWeek,
  };
};

const milestoneColors = [
  "text-yellow-600",
  "text-yellow-500",
  "text-amber-500",
  "text-green-600",
];

const WhatIfIncomeGoalReportTable = ({ computedProducts }) => {
  const isMobile = useBreakpoint(1400);
  const [selectedProductId, setSelectedProductId] = useState(
    computedProducts?.[0]?.product_id ?? null,
  );
  const [goal, setGoal] = useState("");
  const [batchesPerDay, setBatchesPerDay] = useState("");

  const productOptions = computedProducts.map((p) => ({
    label: p.product_name,
    value: p.product_id,
  }));

  const selectedProduct = computedProducts.find(
    (p) => p.product_id === selectedProductId,
  );

  const hasTimeline = Number(batchesPerDay) > 0;
  const hasGoal = Number(goal) > 0;

  const tableData =
    selectedProduct && hasGoal
      ? MILESTONES.map((pct) =>
          computeMilestone(
            selectedProduct,
            Number(goal),
            Number(batchesPerDay),
            pct,
          ),
        )
      : [];

  const reportColumns = [
    {
      key: "percentage",
      label: "Milestone",
      render: (row, index) => (
        <span className={`font-bold ${milestoneColors[index]}`}>
          {row.percentage}
        </span>
      ),
    },
    {
      key: "milestoneGoal",
      label: "Goal",
      render: (row) => `₱${Number(row.milestoneGoal).toFixed(2)}`,
    },
    {
      key: "batchesNeeded",
      label: "Batches",
      render: (row) => row.batchesNeeded.toLocaleString(),
    },
    {
      key: "unitsNeeded",
      label: "Units",
      render: (row) => row.unitsNeeded.toLocaleString(),
    },
    {
      key: "revenueNeeded",
      label: "Revenue",
      render: (row) => `₱${Number(row.revenueNeeded).toFixed(2)}`,
    },
    {
      key: "totalCost",
      label: "Total Cost",
      render: (row) => `₱${Number(row.totalCost).toFixed(2)}`,
    },
    {
      key: "profitPerBatch",
      label: "Profit/Batch",
      render: (row) => `₱${Number(row.profitPerBatch).toFixed(2)}`,
    },
    {
      key: "daysNeeded",
      label: "Days",
      render: (row) =>
        row.daysNeeded?.toLocaleString() ?? (
          <span className="text-slate-300">—</span>
        ),
    },
    {
      key: "weeksNeeded",
      label: "Weeks",
      render: (row) =>
        row.weeksNeeded?.toLocaleString() ?? (
          <span className="text-slate-300">—</span>
        ),
    },
    {
      key: "monthsNeeded",
      label: "Months",
      render: (row) =>
        row.monthsNeeded ? (
          `${row.monthsNeeded} mo`
        ) : (
          <span className="text-slate-300">—</span>
        ),
    },
    {
      key: "profitPerDay",
      label: "Profit/Day",
      render: (row) =>
        row.profitPerDay ? (
          `₱${Number(row.profitPerDay).toFixed(2)}`
        ) : (
          <span className="text-slate-300">—</span>
        ),
    },
    {
      key: "profitPerWeek",
      label: "Profit/Week",
      render: (row) =>
        row.profitPerWeek ? (
          `₱${Number(row.profitPerWeek).toFixed(2)}`
        ) : (
          <span className="text-slate-300">—</span>
        ),
    },
  ];

  const toolbar = (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 items-center">
      <SelectBox
        placeholder="Select Product"
        name="product"
        options={productOptions}
        onChange={setSelectedProductId}
        value={selectedProductId}
      />
      <div className="flex items-center gap-2"> 
        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
          Income Goal (₱)
        </span>
        <TextInput
          type="number"
          min={0}
          value={goal}
          onChange={setGoal}
          placeholder="e.g. 100000"
          className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
          Batches/Day
        </span>
        <TextInput
          type="number"
          min={0}
          value={batchesPerDay}
          onChange={setBatchesPerDay}
          placeholder="e.g. 10"
          className="w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div className="flex items-center justify-end gap-2 md:col-start-2 lg:col-start-auto">
        <Button
          label="Export to PDF"
          onClick={() =>
            downloadWhatIfPDF(
              selectedProductId,
              goal,
              batchesPerDay,
              selectedProduct?.product_name,
            )
          }
          variant="danger"
          icon={<FileText size={16} />}
          disabled={!hasGoal || !selectedProductId}
        />
        <Button
          label="Export to Excel"
          onClick={() =>
            downloadWhatIfExcel(
              selectedProductId,
              goal,
              batchesPerDay,
              selectedProduct?.product_name,
            )
          }
          variant="excel"
          icon={<FileSpreadsheet size={16} />}
          disabled={!hasGoal || !selectedProductId}
        />
      </div>
    </div>
  );

  const sharedProps = {
    columns: reportColumns,
    data: tableData,
    rowKey: "product_id",
    toolbar,
    text: "Select a product for what-if scenario",
  };

  return isMobile ? (
    <MobileCard
      {...sharedProps}
      avatarKeys={{ single: "product_name" }}
      previewKeys={["milestoneGoal", "batchesNeeded", "unitsNeeded", "revenueNeeded", "totalCost", "profitPerBatch"]}
    />
  ) : (
    <Table {...sharedProps} />
  );
};

export default WhatIfIncomeGoalReportTable;
