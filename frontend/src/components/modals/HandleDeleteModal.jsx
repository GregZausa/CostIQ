import React from "react";
import ModalLayout from "../layout/ModalLayout";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

const HandleDeleteModal = ({ name, onDelete, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const { isDark } = useTheme();
  return (
    <>
      <ModalLayout closeModal={closeModal}>
        <h1
          className={`font-bold text-xl flex items-center text-center justify-center py-2 ${isDark ? "text-slate-100" : "text-slate-700"}`}
        >
          Are you sure you want to delete {name}?
        </h1>
        <div className="flex items-center justify-center space-x-2.5 py-2">
          <Button
            label={"Confirm"}
            onClick={onDelete}
            variant="danger"
            className={"w-full"}
          />
          <Button
            label={"Cancel"}
            onClick={closeModal}
            variant="ghost"
            className={"w-full"}
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default HandleDeleteModal;
