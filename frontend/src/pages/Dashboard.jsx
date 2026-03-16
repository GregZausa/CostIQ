import React from "react";
import Headers from "../components/layout/Headers";
import ProductsOverviewCard from "../components/cards/ProductsOverviewCard";
import useProducts from "../hooks/products/useProducts";
import { Box } from "lucide-react";
import useRawMaterials from "../hooks/raw-materials/useRawMaterials";
import useEmployee from "../hooks/employees/useEmployee";
import useOtherExpenses from "../hooks/other-expenses/useOtherExpenses";

const Dashboard = () => {
  const { totalProducts } = useProducts();
  const { totalRawMaterials } = useRawMaterials();
  const {totalEmployees} = useEmployee();
  const {totalOtherExpenses} = useOtherExpenses();

  return (
    <div>
      <Headers title="Dashboard" 
      buttonLabel="Add Product"/>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 shrink-0 py-2 gap-2">
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
    </div>
  );
};

export default Dashboard;
