import React from "react";
import FloatingLabelInput from "../ui/FloatingLabelInput";
import Button from "../ui/Button";

const RegisterForm = ({
  lastName,
  setLastName,
  firstName,
  setFirstName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  return (
    <div className="space-y-8 border backdrop-blur-xl bg-white/10 border-white/5 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out text-black overflow-hidden w-full max-w-md mx-4">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Sign Up</h1>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <FloatingLabelInput
          type={"text"}
          label={"Last Name"}
          value={lastName}
          onChange={setLastName}
          className={"w-full"}
        />
        <FloatingLabelInput
          type={"text"}
          label={"First Name"}
          value={firstName}
          onChange={setFirstName}
          className={"w-full"}
        />
      </div>
      <div>
        <FloatingLabelInput
          type={"text"}
          label={"Email"}
          value={email}
          onChange={setEmail}
          className={"w-full"}
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <FloatingLabelInput
          type={"password"}
          label={"Set Password"}
          value={password}
          onChange={setPassword}
          className={"w-full"}
        />
        <FloatingLabelInput
          type={"password"}
          label={"Confirm Password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
          className={"w-full"}
        />
      </div>
      <div className="flex items-center justify-center space-x-2.5">
        <Button
          label={"Confirm"}
          onClick={onSubmit}
          disabled={isLoading}
          className={"w-full"}
        />
        <Button
          label={"Cancel"}
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
          className={"w-full"}
        />
      </div>
    </div>
  );
};

export default RegisterForm;