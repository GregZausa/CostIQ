import React, { useState } from "react";
import { Eye, EyeOff, Search, AlertCircle } from "lucide-react";

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
  const [isFocused, setIsFocused] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const blockInvalidKeys = (e) => {
    if (type === "number" && ["e", "E", "+", "-", "="].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (type === "number" && !/^\d*\.?\d*$/.test(pasted)) e.preventDefault();
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (type === "number") {
      val = val.replace(/^0+(?=\d)/, "");
      if (max !== undefined && Number(val) > Number(max)) val = String(max);
    }
    onChange(val);
  };

  const hasLeftIcon = type === "search";
  const hasRightIcon = type === "password" || error;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">
          {label}
          {required && <span className="text-rose-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {hasLeftIcon && (
          <Search
            size={14}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              isFocused ? "text-indigo-400" : "text-slate-400"
            }`}
          />
        )}

        <input
          type={inputType}
          value={value}
          min={min}
          max={max}
          onKeyDown={blockInvalidKeys}
          onPaste={handlePaste}
          onChange={handleChange}
          onClick={onClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full text-sm text-slate-800 placeholder:text-slate-400
            px-4 py-2.5 rounded-xl border outline-none
            transition-all duration-200
            ${hasLeftIcon ? "pl-9" : ""}
            ${hasRightIcon ? "pr-10" : ""}
            ${disabled
              ? "bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200"
              : error
                ? "bg-white border-rose-300 ring-4 ring-rose-100"
                : isFocused
                  ? "bg-white border-slate-800/50 ring-4 ring-indigo-100 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
            }
          `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors duration-150"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
        {error && type !== "password" && (
          <AlertCircle
            size={15}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-400"
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;