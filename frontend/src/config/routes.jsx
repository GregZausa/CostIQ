import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layout/MainLayout";
import { Box, Calculator, LayoutDashboardIcon } from "lucide-react";
import RawMaterials from "../pages/RawMaterials";

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
    icon: Calculator,
    sidebar: true,
    label: "Cost Management",
    children: [
      { path: "/cost-management/raw-materials", label: "Raw Materials", icon: Box, },
    ],
  },
  {
    path: "/cost-management/raw-materials",
    icon: Box,
    element: (
      <MainLayout>
        <RawMaterials />
      </MainLayout>
    ),
  },
];
