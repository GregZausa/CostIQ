import React, { useState } from "react";
import { EllipsisIcon, PencilIcon, TrashIcon, Copy } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import HandleDeleteModal from "../modals/HandleDeleteModal";

const HeadlessUIDropdown = ({ id, onDelete, onEdit, name }) => {
  const buttonClassName =
    "flex w-full items-center gap-2 px-3 py-2 text-white text-sm rounded-md";

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex items-center justify-center rounded-md bg-slate-800 p-1 text-white hover:bg-slate-800">
          <EllipsisIcon size={20} />
        </MenuButton>
        <MenuItems className="absolute right-0 w-40 rounded-md bg-slate-800 border-slate-700 shadow-lg focus:outline-none z-100">
          <MenuItem>
            {({ active }) => (
              <button
                className={`${active ? "bg-slate-800" : ""}
            ${buttonClassName}`}
                onClick={() => onEdit(id)}
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                className={`${active ? "bg-slate-800" : ""}
            ${buttonClassName}`}
                onClick={() => setIsOpen(true)}
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
      {isOpen && (
        <HandleDeleteModal
        onDelete={() => onDelete(id)}
        setIsOpen={setIsOpen}
        name={name}
        />
      ) }
    </div>
  );
};

export default HeadlessUIDropdown;
