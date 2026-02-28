import React from "react";
import { EllipsisIcon, PencilIcon, TrashIcon, Copy } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const HeadlessUIDropdown = ({ id, onDelete, onEdit }) => {
  const buttonClassName =
    "flex w-full items-center gap-2 px-3 py-2 text-white text-sm rounded-md";
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-1 text-white hover:bg-gray-800">
        <EllipsisIcon size={20} />
      </MenuButton>
      <MenuItems className="absolute right-0 w-40 rounded-md bg-gray-800 border-gray-700 shadow-lg focus:outline-none z-100">
        <MenuItem>
          {({ active }) => (
            <button
              className={`${active ? "bg-gray-800" : ""}
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
              className={`${active ? "bg-gray-800" : ""}
            ${buttonClassName}`}
              onClick={() => onDelete(id)}
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default HeadlessUIDropdown;
