import React, { useState } from "react";
import { X, Menu, ChevronDown, LogOut, ChevronRight } from "lucide-react";
import { routes } from "../../config/routes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import logo from "../../../res/cost_iq_logo_dark_mode.png";
import ToggleButton from "../ui/ToggleButton";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

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
    `flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all
   ${
     isActive
       ? "bg-indigo-50 text-indigo-600"
       : isDark
         ? "text-slate-200 hover:bg-slate-700 hover:text-white"
         : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
   }`;

  return (
    <>
      <div
        className={`z-100
    lg:hidden fixed top-0 left-0 right-0
    h-14 px-4
    flex items-center justify-between
    border-b backdrop-blur-md
    ${
      isDark
        ? "bg-slate-900/90 border-slate-700"
        : "bg-white/90 border-slate-200"
    }
  `}
      >
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-xl" />

          <div>
            <p
              className={`text-sm font-semibold leading-none ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              CostIQ
            </p>

            <p className="text-[10px] text-slate-400">{displayName}</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
      p-2 rounded-xl transition-all
      ${isDark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}
    `}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-60
          flex flex-col
          transition-transform duration-300 z-100
          border-r
          ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky
        `}
      >
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100 ">
          <div className={`w-8 h-8 ${isDark ?  "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
            <img
              src={logo}
              alt="Logo"
              className="w-9 h-9 rounded-xl object-cover shrink-0"
            />
          </div>

          <div className="flex justify-between items-center gap-5">
            <div>
              <div
                className={`text-sm font-bold ${isDark ? "text-slate-50" : "text-slate-800"} leading-tight`}
              >
                CostIQ
              </div>

              <div className="text-[10px] text-slate-400">
                Make price right
              </div>
            </div>
            <ToggleButton isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            {displayName.charAt(0)}
          </div>

          <div className="min-w-0">
            <div
              className={`text-sm font-semibold truncate ${
                isDark ? "text-slate-50" : "text-slate-800"
              }`}
            >
              {displayName}
            </div>

            <div className="text-[10px] text-slate-400">Personal account</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-none">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold px-2 mb-2">
              Menu
            </div>

            {routes
              .filter((r) => r.sidebar)
              .map(({ label, path, icon: Icon, children }) => {
                const isOpenMenu = openMenu === path;
                const activeParent = isParentActive(children);

                if (children) {
                  return (
                    <div className="space-y-1" key={path}>
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
                              className={
                                activeParent
                                  ? "text-slate-800"
                                  : "text-slate-100 group-hover:text-slate-200 transition-colors"
                              }
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
                            {children.map(
                              ({
                                label: childLabel,
                                path: childPath,
                                icon: ChildIcon,
                              }) => (
                                <NavLink
                                  key={childPath}
                                  to={childPath}
                                  onClick={handleNavClick}
                                  className={({ isActive }) =>
                                    navClass(isActive)
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-slate-800 rounded-r-full" />
                                      )}
                                      <div className="flex items-center gap-2">
                                        <ChildIcon
                                          size={14}
                                          className={
                                            isActive
                                              ? "text-slate-800"
                                              : "text-slate-400 group-hover:text-slate-600 transition-colors"
                                          }
                                        />
                                        <span className="text-xs">
                                          {childLabel}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </NavLink>
                              ),
                            )}
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
                        <div className="flex items-center gap-2.5">
                          <Icon
                            size={16}
                            className={
                              isActive
                                ? "text-indigo-500"
                                : isDark
                                  ? "text-slate-300"
                                  : "text-slate-500"
                            }
                          />

                          <span>{label}</span>
                        </div>

                        {isActive && (
                          <ChevronRight size={13} className="text-indigo-400" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
          </div>
        </nav>
        <div className="p-4">
          <div
            className={`rounded-2xl p-4 ${
              isDark ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-800"
            }`}
          >
            <div className="text-sm font-semibold">
              {user?.is_premium ? "Premium Plan" : "Free Plan"}
            </div>

            <div className="text-xs text-slate-400 mt-1">
              {user?.is_premium
                ? "All premium features unlocked"
                : "Unlock AI insights & reports"}
            </div>

            {!user?.is_premium && (
              <button
                onClick={() => navigate("/pricing")}
                className="mt-3 w-full rounded-xl bg-indigo-500 text-white py-2 text-xs font-medium hover:bg-indigo-600 transition-colors"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        <div className="px-3 py-4 border-t border-slate-100">
          <button
            onClick={logout}
            className={`
    flex items-center gap-2.5
    px-4 py-2 text-sm rounded-xl mx-3 mb-4
    transition-all
    ${
      isDark
        ? "text-slate-300 hover:bg-slate-700 hover:text-red-400"
        : "text-slate-500 hover:bg-red-50 hover:text-red-500"
    }
  `}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
