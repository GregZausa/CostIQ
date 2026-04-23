import { useState } from "react";
import Headers from "../components/layout/Headers";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import FinancialOverviewTable from "../tables/FinancialOverviewTable";
import { RATE_TYPES } from "../constants/options-type";
import SummaryCard from "../components/cards/SummaryCard";

const getSummaryCards = (products, type) => {
  if (!products.length) return null;

  const totalProducts = products.length;
  const avgROI =
    products.reduce((sum, p) => sum + Number(p.roi), 0) / totalProducts;
  const avgMargin =
    products.reduce((sum, p) => sum + Number(p.profit_margin), 0) /
    totalProducts;
  const mostProfitable = products.reduce((a, b) =>
    Number(a.roi) > Number(b.roi) ? a : b,
  );
  const leastProfitable = products.reduce((a, b) =>
    Number(a.roi) < Number(b.roi) ? a : b,
  );
  const totalProjectedRevenue = products.reduce((sum, p) => {
    const revenue =
      type === "batch"
        ? Number(p.finalPrice) * Number(p.total_sellable_units)
        : Number(p.finalPrice);
    return sum + revenue;
  }, 0);
  const totalProjectedProfit = products.reduce((sum, p) => {
    const netProfit =
      type === "batch"
        ? Number(p.netProfitPerUnit) * Number(p.total_sellable_units)
        : Number(p.netProfitPerUnit);
    return sum + netProfit;
  }, 0);
  const totalCOGS = products.reduce((sum, p) => {
    return sum + (type === "batch" ? Number(p.totalCPB) : Number(p.totalCPP));
  }, 0);

  return {
    totalProducts,
    avgROI,
    avgMargin,
    mostProfitable,
    leastProfitable,
    totalProjectedRevenue,
    totalProjectedProfit,
    totalCOGS,
  };
};


const FinancialOverview = () => {
  const { computedProducts } = useProductsQuery();
  const [reportType, setReportType] = useState("batch");
  const s = getSummaryCards(computedProducts, reportType);
  return (
    <div>
      <Headers title="Financial Overview" />
      {s && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <SummaryCard label="Total Products" value={s.totalProducts} />
          <SummaryCard label="Avg ROI" value={`${s.avgROI.toFixed(2)}%`} />
          <SummaryCard
            label="Avg Margin"
            value={`${s.avgMargin.toFixed(2)}%`}
          />
          <SummaryCard
            label="Projected Revenue"
            value={`₱${s.totalProjectedRevenue.toFixed(2)}`}
          />
          <SummaryCard
            label="Projected Profit"
            value={`₱${s.totalProjectedProfit.toFixed(2)}`}
          />
          <SummaryCard
            label="Total COGS"
            value={`₱${s.totalCOGS.toFixed(2)}`}
          />
          <SummaryCard
            label="Most Profitable"
            value={s.mostProfitable.product_name}
            sub={`${Number(s.mostProfitable.roi).toFixed(2)}% ROI`}
            color="green"
          />
          <SummaryCard
            label="Least Profitable"
            value={s.leastProfitable.product_name}
            sub={`${Number(s.leastProfitable.roi).toFixed(2)}% ROI`}
            color="red"
          />
        </div>
      )}
      <FinancialOverviewTable
        computedProducts={computedProducts}
        reportType={reportType}
        options={RATE_TYPES}
        setReportType={setReportType}
      />
    </div>
  );
};

export default FinancialOverview;
