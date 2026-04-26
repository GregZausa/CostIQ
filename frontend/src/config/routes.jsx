import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Calculator,
  FileBarChart,
  FileBarChart2,
  IdCardLanyard,
  LayoutDashboardIcon,
  ShoppingBagIcon,
  Toolbox,
} from "lucide-react";
import RawMaterials from "../pages/RawMaterials";
import Employee from "../pages/Employee";
import OtherExpenses from "../pages/OtherExpenses";
import Products from "../pages/Products";
import ProductList from "../pages/ProductList";
import ProductCostSummary from "../pages/ProductCostSummary";
import PricingGuideReport from "../pages/PricingGuideReport";
import OtherExpensesReport from "../pages/OtherExpensesReport";
import FinancialOverview from "../pages/FinancialOverview";

export const routes = [
  {
    path: "/login",
    element: <Login />,
    public: true,
  },
  {
    path: "/register",
    element: <Register />,
    public: true,
  },
  {
    path: "/dashboard",
    icon: LayoutDashboardIcon,
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
    sidebar: true,
    label: "Dashboard",
  },
  {
    path: "product-management",
    icon: ShoppingBagIcon,
    sidebar: true,
    label: "Product Management",
    children: [
      {
        path: "/product-management/products",
        label: "Products",
        icon: ShoppingBagIcon,
      },
      {
        path: "/product-management/product-list",
        label: "Product List",
        icon: ShoppingBagIcon,
      },
    ],
  },

  {
    path: "cost-management",
    icon: Calculator,
    sidebar: true,
    label: "Cost Management",
    children: [
      {
        path: "/cost-management/raw-materials",
        label: "Raw Materials",
        icon: Box,
      },
      {
        path: "/cost-management/employees",
        label: "Employees",
        icon: IdCardLanyard,
      },
      {
        path: "/cost-management/other-expenses",
        label: "Other Expenses",
        icon: Toolbox,
      },
    ],
  },
  {
    path: "reports",
    icon: FileBarChart2,
    sidebar: true,
    label: "Reports Management",
    children: [
      {
        path: "/reports/product-cost-summary",
        label: "Products Cost Summary",
        icon: FileBarChart,
      },
      {
        path: "/reports/financial-overview",
        label: "Financial Overview",
        icon: FileBarChart,
      },
      {
        path: "/reports/pricing-guide",
        label: "Pricing Guide Report",
        icon: FileBarChart,
      },
      {
        path: "/reports/other-expenses-report",
        label: "Other Expenses Report",
        icon: FileBarChart,
      },
    ],
  },
  {
    path: "/product-management/products",
    element: (
      <MainLayout>
        <Products />
      </MainLayout>
    ),
  },
  {
    path: "/product-management/product-list",
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    ),
  },
  {
    path: "/cost-management/raw-materials",
    element: (
      <MainLayout>
        <RawMaterials />
      </MainLayout>
    ),
  },
  {
    path: "/cost-management/employees",
    element: (
      <MainLayout>
        <Employee />
      </MainLayout>
    ),
  },
  {
    path: "/cost-management/other-expenses",
    element: (
      <MainLayout>
        <OtherExpenses />
      </MainLayout>
    ),
  },
  {
    path: "/reports/product-cost-summary",
    element: (
      <MainLayout>
        <ProductCostSummary />
      </MainLayout>
    ),
  },
  {
    path: "/reports/pricing-guide",
    element: (
      <MainLayout>
        <PricingGuideReport />
      </MainLayout>
    ),
  },
  {
    path: "/reports/financial-overview",
    element: (
      <MainLayout>
        <FinancialOverview />
      </MainLayout>
    ),
  },
  {
    path: "/reports/other-expenses-report",
    element: (
      <MainLayout>
        <OtherExpensesReport />
      </MainLayout>
    ),
  },
];
