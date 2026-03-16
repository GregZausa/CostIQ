import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import { apiUrl } from "../../config/apiUrl";

const Register = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || !lastName || !firstName || !confirmPassword) {
      toast.error("Please fill up all required fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, lastName, firstName }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration Failed");
        return;
      }
      localStorage.setItem("token", data.token);
      toast.success("User Account Registered Successfully!");
      navigate("/login");
    } catch {
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    navigate("/login");
  };
  return (
    <div className="relative flex justify-center items-center w-full min-h-screen">
      <RegisterForm
        lastName={lastName}
        setLastName={setLastName}
        firstName={firstName}
        setFirstName={setFirstName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;
