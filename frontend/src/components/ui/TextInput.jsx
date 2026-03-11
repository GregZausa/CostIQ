import React, { useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";

const TextInput = ({
  type = "text",
  value,
  onChange,
  label = "",
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
  onClick,
  min,
  max,
  error = "",
}) => {
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
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          min={min}
          max={max}
          onKeyDown={blockInvalidKeys}
          onPaste={handlePaste}
          onChange={(e) => {
            let val = e.target.value;

            if (type === "number") {
              val = val.replace(/^0+(?=\d)/, "");
              if (max !== undefined && Number(val) > Number(max)) {
                val = String(max);
              }
            }
            onChange(val);
          }}
          onClick={onClick}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 ${
            type === "password" ? "pr-10" : ""
          }${type === "search" ? "pl-9" : ""} border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {type === "search" && (
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
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

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
