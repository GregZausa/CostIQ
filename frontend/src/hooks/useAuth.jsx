import React, { createContext, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/apiUrl";
import { authFetch } from "../utils/authFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await authFetch(`${apiUrl}/auth/me`);
      if (!res.ok) throw new Error("Not Authorized");
      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

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
      value={{ logout, loading, isAuthenticated, setIsAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
