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
  Sparkles,
  Toolbox,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
import RawMaterials from "../pages/RawMaterials";
import Employee from "../pages/Employee";
import OtherExpenses from "../pages/OtherExpenses";
import Products from "../pages/Products";
import ProductList from "../pages/ProductList";
import ProductCostSummary from "../pages/ProductCostSummary";
import PricingGuideReport from "../pages/PricingGuideReport";
import FinancialOverview from "../pages/FinancialOverview";
import Pricing from "../pages/paymongo/Pricing";
import PaymentSuccess from "../pages/paymongo/PaymentSuccess";
import WhatIfIncomeGoalReport from "../pages/WhatIfIncomeGoalReport";
import LandingPage from "../pages/LandingPage";
import Contact from "../pages/Contact";
import OAuthCallback from "../pages/auth/OAuthCallback";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Sales from "../pages/Sales";
import SalesHistory from "../pages/SalesHistory";
import SalesAIAnalysis from "../pages/SalesAIAnalysis";

export const routes = [
  {
    path: "/contact",
    element: <Contact />,
    public: true,
  },
  {
    path: "/home",
    element: <LandingPage />,
    public: true,
  },
  {
    path: "/login",
    element: <Login />,
    public: true,
    authRedirect: true,
  },
  {
    path: "/oauth/callback",
    element: <OAuthCallback />,
    public: true,
    authRedirect: false,
  },
  { path: "/verify-email", element: <VerifyEmail />, public: true },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    public: true,
    authRedirect: true,
  },
  { path: "/reset-password", element: <ResetPassword />, public: true },
  {
    path: "/register",
    element: <Register />,
    public: true,
    authRedirect: true,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    public: true,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
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
    path: "/sales",
    icon: TrendingUpIcon,
    sidebar: true,
    label: "Sales Tracker",
    element: (
      <MainLayout>
        <Sales />
      </MainLayout>
    ),
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
        path: "/reports/what-if-income-goal-report",
        label: "What-if Income Goal Report",
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
    path: "/reports/what-if-income-goal-report",
    element: (
      <MainLayout>
        <WhatIfIncomeGoalReport />
      </MainLayout>
    ),
  },

];
