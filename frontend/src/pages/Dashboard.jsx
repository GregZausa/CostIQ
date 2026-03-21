import React from "react";
import Headers from "../components/layout/Headers";
import ProductsOverviewCard from "../components/cards/ProductsOverviewCard";
import useProducts from "../hooks/products/useProducts";
import {
  Box,
  CircleDollarSign,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";
import ProfitVsCOGChart from "../components/ui/charts/ProfitVsCOGChart";
import ProfitChart from "../components/ui/charts/ProfitChart";

const Dashboard = () => {
  const {
    totalProducts,
    mostExpensive,
    lowestProfitable,
    mostProfitable,
    highestROI,
    cogsVsSellingPriceChartData,
    profitChartData,
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
        <ProductsOverviewCard
          value={`₱ ${Number(mostExpensive?.total_cost).toLocaleString()}`}
          description={mostExpensive?.product_name}
          title="Highest Cost Product"
          icon={<CircleDollarSign size={18} />}
        />
        <ProductsOverviewCard
          value={`₱ ${Number(lowestProfitable?.profit).toFixed(2)}`}
          description={lowestProfitable?.product_name}
          title="Lowest Profit Product"
          textVariant="negative"
          icon={<TrendingDown size={18} />}
        />
        <ProductsOverviewCard
          value={`₱ ${Number(mostProfitable?.profit).toFixed(2)}`}
          description={mostProfitable?.product_name}
          title="Most Profit Product"
          textVariant="positive"
          icon={<TrendingUp size={18} />}
        />
        <ProductsOverviewCard
          value={`${Number(highestROI?.roi).toFixed(2)}%`}
          description={highestROI?.product_name}
          title="Highest ROI Product"
          textVariant="positive"
          icon={<Percent size={18} />}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 pt-2 shrink-0 gap-2">
          <ProfitVsCOGChart data={cogsVsSellingPriceChartData ?? []} />
          <ProfitChart data={profitChartData ?? []}/>
      </div>
    </div>
  );
};

export default Dashboard;
