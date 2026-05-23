import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ModalLayout = ({
  children,
  closeModal,
  widthStyle,
  editingId = null,
  header,
}) => {
  const { isDark } = useTheme();
  return (
    <div>
      <div
        className="z-50 fixed inset-0 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className={`fixed top-1/2 left-1/2 z-60 ${widthStyle ? widthStyle : "w-96"} max-w-full mx-4 ${isDark ? "bg-slate-800 border-slate-800/20" : "bg-slate-50 border border-slate-50/20"}  rounded-xl 
              shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6 hover:shadow-2xl transition-all
              duration-300 ease-in-out text-black`}
      >
        <h1
          className={`text-xl font-bold mb-4 ${isDark ? "text-slate-50" : "text-slate-800"}`}
        >
          {header
            ? editingId !== null
              ? `Edit ${header}`
              : `Add ${header}`
            : ""}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
