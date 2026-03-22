import React from "react";
import Headers from "../components/layout/Headers";
import ProductsOverviewCard from "../components/cards/ProductsOverviewCard";
import useProducts from "../hooks/products/useProducts";
import {
  Box,
} from "lucide-react";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import ProfitVsCOGChart from "../components/ui/charts/ProfitVsCOGChart";
import HorizontalChart from "../components/ui/charts/HorizontalChart";
import NoDataLayout from "../components/layout/NoDataLayout";

const Dashboard = () => {
  const {
    totalProducts,
    cogsVsSellingPriceChartData,
    mostExpensiveProduct,
    top5ProfitableProduct,
    bottom5LeastProfitableProduct,
    top5ROIProduct,
  } = useProducts();
  const { totalRawMaterials } = useRawMaterials();
  const { totalEmployees } = useEmployee();
  const { totalOtherExpenses } = useOtherExpenses();

  const hasData =
    totalProducts > 0 ||
    totalRawMaterials > 0 ||
    totalEmployees > 0 ||
    totalOtherExpenses > 0;

  const hasCharts =
    (mostExpensiveProduct?.length ?? 0) > 0 ||
    (bottom5LeastProfitableProduct?.length ?? 0) > 0 ||
    (top5ProfitableProduct?.length ?? 0) > 0 ||
    (top5ROIProduct?.length ?? 0) > 0 ||
    (cogsVsSellingPriceChartData?.length ?? 0) > 0;

  return (
    <div>
      <Headers title="Dashboard" buttonLabel="Add Product" />

      {hasData ? (
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
      ) : (
        <NoDataLayout message="No data available"/>
      )}
      {hasCharts ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 pt-2 gap-2">
          {mostExpensiveProduct?.length > 0 && (
            <HorizontalChart
              data={mostExpensiveProduct ?? []}
              fillType="neutral"
              formatter={(value) => `₱${value.toFixed(2)}`}
              title={`Top ${mostExpensiveProduct.length} Most Expensive Product`}
            />
          )}
          {bottom5LeastProfitableProduct?.length > 0 && (
            <HorizontalChart
              data={bottom5LeastProfitableProduct ?? []}
              fillType="negative"
              formatter={(value) => `₱${value.toFixed(2)}`}
              title={`Bottom ${bottom5LeastProfitableProduct.length} Least Profitable`}
            />
          )}
          {top5ProfitableProduct?.length > 0 && (
            <HorizontalChart
              data={top5ProfitableProduct ?? []}
              formatter={(value) => `₱${value.toFixed(2)}`}
              fillType="positive"
              title={`Top ${top5ProfitableProduct.length} Most Profitable`}
            />
          )}
          {top5ROIProduct?.length > 0 && (
            <HorizontalChart
              data={top5ROIProduct ?? []}
              formatter={(value) => `${value.toFixed(2)}%`}
              fillType="positive"
              title={`Top ${top5ROIProduct.length} MOST ROI Product`}
            />
          )}
        </div>
      ) : (
        <NoDataLayout message="No chart data available"/>
      )}
      {cogsVsSellingPriceChartData?.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 pt-2 shrink-0 gap-2">
          <div className="col-span-2">
            <ProfitVsCOGChart data={cogsVsSellingPriceChartData ?? []} />
          </div>
          <div className="col-span-1"></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
