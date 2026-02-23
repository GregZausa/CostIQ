import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../config/routes";
import RequireAuth from "../config/RequireAuth";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element, public: isPublic }) => {
        if (isPublic) {
          return <Route key={path} path={path} element={element} />;
        }

        return (
          <Route key={path} element={<RequireAuth />}>
            <Route path={path} element={element} />
          </Route>
        );
      })}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
