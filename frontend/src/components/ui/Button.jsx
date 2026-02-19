import React from "react";

const Button = ({
  label,
  onClick,
  disabled,
  className,
  backgroundAndText,
  type = "button",
}) => {
  return (
    <div className="relative">
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`border rounded-md p-3 py-2 cursor-pointer transition ${
          disabled ? "bg-gray-400 cursor-not-allowed" : backgroundAndText
        } ${className}`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
