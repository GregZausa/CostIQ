import React from "react";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

const Headers = ({
  title,
  subTitle,
  icon: Icon,
  openModal,
  buttonLabel,
  buttonIcon: ButtonIcon,
  buttonStyle = "default",
}) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1
          className={`flex items-center gap-2 text-2xl font-bold ${
            isDark ? "text-slate-50" : "text-slate-800"
          }`}
        >
          {Icon}
          {title}
        </h1>

        {subTitle && <p className="text-sm text-slate-400 mt-1">{subTitle}</p>}
      </div>

      {buttonLabel && (
        <Button onClick={openModal} label={buttonLabel} icon={<ButtonIcon size={14} />} />
      )}
    </div>
  );
};

export default Headers;
