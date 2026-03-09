import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import { Lock, Mail } from "lucide-react";
import Button from "../ui/Button";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onLogin,
  onRegister,
}) => {
  return (
    <div className="space-y-8 border backdrop-blur-xl bg-white/10 border-white/5 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out text-black overflow-hidden w-full max-w-sm mx-4">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Log In</h1>
      </div>
      <div className="flex items-center space-x-2.5">
        <Mail className="text-gray-500 shrink-0" />
        <FloatingLabelInput
          type={"text"}
          label={"Email"}
          value={email}
          onChange={setEmail}
          className={"w-full"}
          required
        />
      </div>
      <div className="flex items-center space-x-2.5">
        <Lock className="text-gray-500 shrink-0" />
        <FloatingLabelInput
          type={"password"}
          label={"Password"}
          value={password}
          onChange={setPassword}
          className={"w-full"}
          required
        />
      </div>
      <div className="flex items-center justify-center space-x-2.5">
        <Button
          label={"Login"}
          onClick={onLogin}
          disabled={isLoading}
          className={"w-full"}
          backgroundAndText={"bg-gray-800 hover:gray-500 text-white"}
        />
        <Button
          label={"Register"}
          onClick={onRegister}
          disabled={isLoading}
          className={"w-full"}
          backgroundAndText={
            "bg-white hover:bg-gray-400 text-black border-none"
          }
        />
      </div>
    </div>
  );
};

export default LoginForm;