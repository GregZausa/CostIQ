import React, { useState } from "react";
import { X, Menu, ChevronDown, LogOut } from "lucide-react";
import { routes } from "../../config/routes";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../../res/logo-icon-removebg-preview.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { logout, user } = useAuth();
  const location = useLocation();

  const toggleMenu = (path) =>
    setOpenMenu((prev) => (prev === path ? null : path));

  const isParentActive = (children) =>
    children?.some((child) => location.pathname.startsWith(child.path));

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const displayName = user?.first_name
    ? user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
    : "Guest";

  const navClass = (isActive) =>
    `group relative flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-all duration-150
    ${isActive
      ? "bg-slate-50 text-slate-800"
      : "text-slate-100 hover:bg-slate-100 hover:text-slate-800"
    }`;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-2 z-50 p-2 rounded-lg bg-slate-800 border border-slate-800 text-slate-100 shadow-sm"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 min-h-full w-52 md:w-60 lg:w-64
          bg-slate-800 flex flex-col
          border-r border-slate-200
          transform transition-transform duration-300 z-40 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky
        `}
      >
        <div className="flex items-center gap-3 px-5 py-5 justify-center border-b border-slate-200">
          <img
            src={logo}
            alt="Logo"
            className="w-9 h-9 rounded-lg object-cover border border-slate-800 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-200 leading-none mb-0.5">
              CostIQ
            </p>
            <p className="text-xs text-slate-200 leading-none truncate">A tool just for you</p>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-[11px] text-slate-200 mb-0.5">Signed in as</p>
          <p className="text-sm font-semibold text-slate-100 truncate">{displayName}</p>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-200 font-semibold px-3 mb-2">
            Menu
          </p>

          {routes
            .filter((r) => r.sidebar)
            .map(({ label, path, icon: Icon, children }) => {
              const isOpenMenu = openMenu === path;
              const activeParent = isParentActive(children);

              if (children) {
                return (
                  <div key={path}>
                    <button
                      onClick={() => toggleMenu(path)}
                      className={`${navClass(activeParent)} w-full`}
                      aria-expanded={isOpenMenu}
                    >
                      {activeParent && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-slate-800 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={16}
                          className={activeParent ? "text-slate-800" : "text-slate-100 group-hover:text-slate-200 transition-colors"}
                        />
                        {label}
                      </div>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 text-slate-400 hrink-0 ${isOpenMenu ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-200"
                      style={{ maxHeight: isOpenMenu ? "500px" : "0px" }}
                    >
                      <div className="ml-4 mt-0.5 mb-1 flex flex-col gap-0.5 border-l-2 border-slate-700 pl-3">
                        {children.map(({ label: childLabel, path: childPath, icon: ChildIcon }) => (
                          <NavLink
                            key={childPath}
                            to={childPath}
                            onClick={handleNavClick}
                            className={({ isActive }) => navClass(isActive)}
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-slate-800 rounded-r-full" />
                                )}
                                <div className="flex items-center gap-2">
                                  <ChildIcon
                                    size={14}
                                    className={isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600 transition-colors"}
                                  />
                                  <span className="text-xs">{childLabel}</span>
                                </div>
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleNavClick}
                  className={({ isActive }) => navClass(isActive)}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-slate-800 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={16}
                          className={isActive ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600 transition-colors"}
                        />
                        {label}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="group w-full flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium
              text-slate-100 hover:bg-red-200 hover:text-red-600 transition-all duration-150"
          >
            <LogOut
              size={16}
              className="text-slate-100 group-hover:text-red-500 transition-colors"
            />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;