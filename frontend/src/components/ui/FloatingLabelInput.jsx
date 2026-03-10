import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const FloatingLabelInput = ({
  type,
  value,
  onChange,
  label,
  className,
  required = false,
  readOnly = false,
  min,
  max,
  step,
  suffix,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const blockInvalidKeys = (e) => {
    if (type === "number" && ["e", "E", "+", "-", "="].includes(e.key)) {
      e.preventDefault();
    }
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d*\.?\d*$/.test(pasted)) e.preventDefault();
  };
  return (
    <div className="relative w-full">
      <input
        type={inputType}
        value={value}
        onKeyDown={blockInvalidKeys}
        onPaste={handlePaste}
        min={min}
        max={max}
        step={step}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-transparent ${suffix ? "pr-10" : ""} ${className}`}
        readOnly={readOnly}
      />
      <label
        className={`absolute left-3 transition-all duration-300 pointer-events-none ${
          onFocus || value
            ? "top-0 -translate-y-1/2 text-xs text-blue-500 bg-transparent px-2 z-10"
            : "top-1/2 -translate-y-1/2 text-gray-500 font-medium"
        }`}
      >
        {label} {required && <span className="text-red-500"></span>}
      </label>
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {suffix}
        </span>
      )}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;
