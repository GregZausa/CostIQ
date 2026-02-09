import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../config/routes";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="/" element={<Navigate to="/login" replace/>}/>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
  );
};

export default AppRouter;
