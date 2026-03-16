import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/apiUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const logout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
    } finally {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      toast.success("Logged Out", { id: toastId });
      setTimeout(() => navigate("/login", { replace: true }), 300);
    }
  };
  return (
    <AuthContext.Provider
      value={{ logout, loading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
