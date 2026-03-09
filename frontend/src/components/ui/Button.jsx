import React from "react";

const Button = ({
  label,
  onClick,
  disabled,
  className,
  backgroundAndText,
  type = "button",
  icon
}) => {
  return (
    <div className="relative">
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`border rounded-md p-3 py-2 cursor-pointer font-bold transition
          inline-flex items-center justify-center gap-2 ${
          disabled ? "bg-gray-400 cursor-not-allowed" : backgroundAndText
        } ${className}`}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{label}</span>
      </button>
    </div>
  );
};

export default Button;
