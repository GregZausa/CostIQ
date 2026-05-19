import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../config/routes";
import RequireAuth from "../config/RequireAuth";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element, public: isPublic, authRedirect }) => {
        if (isPublic) {
          if (authRedirect) {
            return (
              <Route
                key={path}
                path={path}
                element={<PublicRoute>{element}</PublicRoute>}
              />
            );
          }
          return <Route key={path} path={path} element={element} />;
        }

        return (
          <Route key={path} element={<RequireAuth />}>
            <Route path={path} element={element} />
          </Route>
        );
      })}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
