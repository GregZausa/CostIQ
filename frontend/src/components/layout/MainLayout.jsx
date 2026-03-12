import Sidebar from "./Sidebar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-12 md:ml-6 p-6 space-y-5">{children}</main>
    </div>
  );
};

export default MainLayout;
