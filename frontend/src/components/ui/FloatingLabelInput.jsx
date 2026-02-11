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
  
}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;
  return (
    <div className="relative">
      <input
        type={inputType}
        value={value}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        readOnly = {readOnly}
      />
      <label
        className={`absolute left-3 transition-all duration-300 ${
          onFocus || value
            ? "top-0 -translate-y-1/2 text-xs text-blue-500 bg-white px-2"
            : "top-1/2 -translate-y-1/2 text-gray-500"
        }`}
      >
        {label} {required && <span className="text-red-500"></span>}
      </label>
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
