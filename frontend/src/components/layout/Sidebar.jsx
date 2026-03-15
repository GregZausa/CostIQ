import React, { useState } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { routes } from "../../config/routes";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../../res/logo-icon-removebg-preview.png";
import Button from "../ui/Button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const { logout } = useAuth();

  const toggleMenu = (path) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const navBar = ({ isActive }) =>
    `flex items-center space-x-2 py-4 px-3 rounded-xl transition font-bold ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`;
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col p-4 space-y-6 transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}
      >
        <img
          src={logo}
          alt=""
          className="rounded-full border border-gray-400/20"
        />
        {routes
          .filter((route) => route.sidebar)
          .map(({ label, path, icon: Icon, children }) => (
            <div key={path}>
              {children ? (
                <div
                  className={navBar({ isActive: false })}
                  onClick={() => toggleMenu(path)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                  <div
                    className={`transform-transition duration-300 ${openMenus[path] ? "rotate-180" : "rotate-0"}`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>
              ) : (
                <NavLink key={path} to={path} className={navBar}>
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              )}
              {children && openMenus[path] && (
                <div className="ml-6 mt-2 space-y-1">
                  {children.map(
                    ({ label: childrenLabel, path: childPath, icon: Icon }) => (
                      <NavLink
                        key={childPath}
                        to={childPath}
                        className={navBar}
                      >
                        <Icon size={14} />
                        <span className="text-sm">{childrenLabel}</span>
                      </NavLink>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        <Button
          onClick={logout}
          size="lg"
          variant="danger"
          label="Logout"
          className="w-full mt-auto"
        />
      </div>
    </div>
  );
};

export default Sidebar;
