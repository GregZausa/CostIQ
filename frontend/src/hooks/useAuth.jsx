import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const logout = () => {
    const toastId = toast.loading("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("token");
      toast.success("Logged Out", { id: toastId });
      setTimeout(() => navigate("/"), 0);
    }, 1500);
  };
  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
