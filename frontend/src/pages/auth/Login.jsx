import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import toast from "react-hot-toast";
import { apiUrl } from "../../config/apiUrl";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Invalid email or password!");
        return;
      }
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      toast.success("Logged In Successfully!");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Something went wrong, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full min-h-screen">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Login;
