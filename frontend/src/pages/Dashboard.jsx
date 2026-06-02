import React, { useState } from "react";
import Headers from "../components/layout/Headers";
import ProductsOverviewCard from "../components/cards/ProductsOverviewCard";
import useProducts from "../hooks/products/useProducts";
import {
  Box,
  DollarSign,
  LayoutDashboardIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import ProfitVsCOGChart from "../components/ui/charts/ProfitVsCOGChart";
import HorizontalChart from "../components/ui/charts/HorizontalChart";
import ProductPerformanceChart from "../components/ui/charts/ProductPerformanceChart";
import RevenueGapChart from "../components/ui/charts/RevenueGapChart";
import CostEfficiencyRadarChart from "../components/ui/charts/CostEfficiencyRadarChart";
import NoDataLayout from "../components/layout/NoDataLayout";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/useAuth";
import OnboardingModal from "../components/modals/OnboardingModal";
import EmptyDashboard from "./EmptyDashboard";
import { useProductsQuery } from "../hooks/products/useProductsQuery";
import { SkeletonDashboard } from "../components/ui/Skeleton";

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
    radarChartData,
    products,
    mostExpensiveProduct,
  } = useProducts();
  const { totalRawMaterials } = useRawMaterials();
  const { totalEmployees } = useEmployee();
  const { totalOtherExpenses } = useOtherExpenses();

  const { isDark } = useTheme();
  const { user, fetchCurrentUser } = useAuth();
  const { computedProducts, loading } = useProductsQuery();
  const [showOnboarding, setShowOnboarding] = useState(!user?.has_onboarded);

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    await fetchCurrentUser();
  };

  const isEmpty = computedProducts.length === 0;

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
    (cogsVsSellingPriceChartData?.length ?? 0) > 0 ||
    (performanceMatrixData?.length ?? 0) > 0 ||
    avgProfit > 0 ||
    avgCOGS > 0 ||
    (radarChartData?.length ?? 0) > 0 ||
    (products?.length ?? 0) > 0;

  if (loading) return <SkeletonDashboard />;

  return (
    <div>
      {showOnboarding && (
        <OnboardingModal user={user} onComplete={handleOnboardingComplete} />
      )}
      {isEmpty && !showOnboarding ? (
        <EmptyDashboard user={user} />
      ) : (
        <>
          <Headers
            subTitle="Monitor your business performance and product insights."
            icon={<LayoutDashboardIcon size={20} className="text-indigo-500" />}
            title="Dashboard"
          />

          {!hasData && !hasCharts ? (
            <NoDataLayout message="No products yet, Add one to get started!" />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 pt-2 shrink-0 gap-2">
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
                  icon={DollarSign}
                  fillType="neutral"
                  formatter={(value) => `₱${value.toFixed(2)}`}
                  title={`Top ${mostExpensiveProduct?.length} Most Expensive`}
                />
                <HorizontalChart
                  data={bottom5LeastProfitableProduct ?? []}
                  icon={TrendingDown}
                  fillType="negative"
                  formatter={(value) => `₱${value.toFixed(2)}`}
                  title={`Bottom ${bottom5LeastProfitableProduct?.length} Least Profitable`}
                />
                <HorizontalChart
                  data={top5ProfitableProduct ?? []}
                  icon={TrendingUp}
                  formatter={(value) => `₱${value.toFixed(2)}`}
                  fillType="positive"
                  title={`Top ${top5ProfitableProduct?.length} Most Profitable`}
                />
                <HorizontalChart
                  data={top5ROIProduct ?? []}
                  icon={TrendingUp}
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
                <CostEfficiencyRadarChart
                  data={radarChartData ?? []}
                  products={products ?? []}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
