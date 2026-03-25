import React from "react";
import Headers from "../components/layout/Headers";
import ProductsOverviewCard from "../components/cards/ProductsOverviewCard";
import useProducts from "../hooks/products/useProducts";
import { Box } from "lucide-react";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import ProfitVsCOGChart from "../components/ui/charts/ProfitVsCOGChart";
import HorizontalChart from "../components/ui/charts/HorizontalChart";
import ProductPerformanceChart from "../components/ui/charts/ProductPerformanceChart";
import RevenueGapChart from "../components/ui/charts/RevenueGapChart";

const Dashboard = () => {
  const {
    totalProducts,
    cogsVsSellingPriceChartData,
    top5ProfitableProduct,
    bottom5LeastProfitableProduct,
    top5ROIProduct,
    avgProfit,
    avgCOGS,
    performanceMatrixData,
    revenueGapChartData,
    mostExpensiveProduct,
  } = useProducts();
  const { totalRawMaterials } = useRawMaterials();
  const { totalEmployees } = useEmployee();
  const { totalOtherExpenses } = useOtherExpenses();

  return (
    <div>
      <Headers title="Dashboard" buttonLabel="Add Product" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 pt-2 shrink-0 gap-2">
        <ProductsOverviewCard
          value={totalProducts}
          title="Total Products"
          description="All products currently registered"
          icon={<Box size={18} />}
        />
        <ProductsOverviewCard
          value={totalRawMaterials}
          description="All raw materials currently registered"
          title="Total Raw Materials"
          icon={<Box size={18} />}
        />
        <ProductsOverviewCard
          value={totalEmployees}
          description="All employees currently registered"
          title="Total Employees"
          icon={<Box size={18} />}
        />
        <ProductsOverviewCard
          value={totalOtherExpenses}
          description="All other expenses currently registered"
          title="Total Other Expenses"
          icon={<Box size={18} />}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 pt-2 gap-2">
        <HorizontalChart
          data={mostExpensiveProduct ?? []}
          fillType="neutral"
          formatter={(value) => `₱${value.toFixed(2)}`}
          title={`Top ${mostExpensiveProduct?.length} Most Expensive`}
        />
        <HorizontalChart
          data={bottom5LeastProfitableProduct ?? []}
          fillType="negative"
          formatter={(value) => `₱${value.toFixed(2)}`}
          title={`Bottom ${bottom5LeastProfitableProduct?.length} Least Profitable`}
        />
        <HorizontalChart
          data={top5ProfitableProduct ?? []}
          formatter={(value) => `₱${value.toFixed(2)}`}
          fillType="positive"
          title={`Top ${top5ProfitableProduct?.length} Most Profitable`}
        />
        <HorizontalChart
          data={top5ROIProduct ?? []}
          formatter={(value) => `${value.toFixed(2)}%`}
          fillType="positive"
          title={`Top ${top5ROIProduct?.length} MOST ROI Product`}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 pt-2 shrink-0 gap-2">
        <ProfitVsCOGChart data={cogsVsSellingPriceChartData ?? []} />
        <ProductPerformanceChart
          data={performanceMatrixData ?? []}
          avgX={avgCOGS}
          avgY={avgProfit}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 pt-2 shrink-0 gap-2">
        <RevenueGapChart data={revenueGapChartData ?? []} />
      </div>
    </div>
  );
};

export default Dashboard;
