import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;
