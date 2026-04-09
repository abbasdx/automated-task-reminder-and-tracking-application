import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { LayoutDashboard, LineChart, LogOut, Menu, X } from "lucide-react";
import { isLoggedIn, getUser, clearAuth } from "../api/taskApi";

export default function Navbar() {
  const [open, setOpen] = useState(false), [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef(null), dropdownRef = useRef(null), location = useLocation();

  const closeMenus = () => { setOpen(false); setDropdownOpen(false); };
  const handleLogout = () => { clearAuth(); window.location.href = "/login"; };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const loggedIn = isLoggedIn(), user = getUser();
  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : user?.email?.[0]?.toUpperCase() ?? "U";

  useEffect(() => {
    const hClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    const hResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("mousedown", hClick); window.addEventListener("resize", hResize);
    return () => { document.removeEventListener("mousedown", hClick); window.removeEventListener("resize", hResize); };
  }, []);
  useEffect(closeMenus, [location.pathname]);

  const navClass = ({ isActive }) => `transition-all px-4 py-2 rounded-xl text-sm font-medium ${isActive ? "bg-white/[0.08] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"}`;
  const mobNavClass = ({ isActive }) => `flex w-full items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-white/[0.08] text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`;

  return (
    <nav ref={navRef} className="fixed left-1/2 top-4 z-50 w-[calc(100%_-_2rem)] max-w-[800px] -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[#030712]/40 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-[2px] sm:top-6 sm:rounded-full">
      <div className="relative flex h-11 items-center justify-between px-3 sm:px-4">
        
        <NavLink to="/" onClick={scrollToTop} className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.5 12.5L10.5 15.5L17 8.5" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs><linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#818cf8" /><stop offset="1" stopColor="#c084fc" /></linearGradient></defs>
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">TaskTracker</span>
        </NavLink>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-6">
          <ul className="flex items-center gap-1">
            <li><NavLink to="/" end className={navClass}>Home</NavLink></li>
            <li><NavLink to="/features" className={navClass}>Features</NavLink></li>
            {loggedIn && <><li><NavLink to="/dashboard" className={navClass}>Dashboard</NavLink></li><li><NavLink to="/analytics" className={navClass}>Analytics</NavLink></li></>}
          </ul>

          {loggedIn ? (
            <div className="relative border-l border-white/[0.08] pl-6" ref={dropdownRef}>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 text-xs font-bold text-white shadow-sm transition-all hover:scale-105 hover:border-white/20 focus:ring-2 focus:ring-indigo-500/50" onClick={() => setDropdownOpen(!dropdownOpen)}>{initials}</button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-56 origin-top-right rounded-2xl border border-white/[0.08] bg-[#0a0e17]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2">
                  <div className="px-3 py-3"><p className="truncate text-sm font-semibold text-slate-200">{user?.name}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div>
                  <div className="my-1 h-[1px] w-full bg-white/[0.04]" />
                  <NavLink to="/dashboard" onClick={closeMenus} className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-white"><LayoutDashboard size={16} className="text-slate-500 group-hover:text-indigo-400" /> Dashboard</NavLink>
                  <NavLink to="/analytics" onClick={closeMenus} className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-white"><LineChart size={16} className="text-slate-500 group-hover:text-indigo-400" /> Analytics</NavLink>
                  <div className="my-1 h-[1px] w-full bg-white/[0.04]" />
                  <button onClick={handleLogout} className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400"><LogOut size={16} className="text-slate-500 group-hover:text-red-400" /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-2 border-l border-white/[0.08] pl-6"><NavLink to="/login" className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-xs font-bold text-slate-950 transition-all hover:scale-105 hover:bg-slate-200">Sign In</NavLink></div>
          )}
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* ✨ COMPACT MOBILE DROPDOWN ✨ */}
        {open && (
          <div className="absolute right-0 top-full mt-3 w-56 origin-top-right rounded-2xl border border-white/[0.08] bg-[#0a0e17]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 slide-in-from-top-2 lg:hidden">
            <ul className="flex flex-col gap-1">
              <li><NavLink to="/" end className={mobNavClass} onClick={closeMenus}>Home</NavLink></li>
              <li><NavLink to="/features" className={mobNavClass} onClick={closeMenus}>Features</NavLink></li>
              {loggedIn && (
                <>
                  <li><NavLink to="/dashboard" className={mobNavClass} onClick={closeMenus}>Dashboard</NavLink></li>
                  <li><NavLink to="/analytics" className={mobNavClass} onClick={closeMenus}>Analytics</NavLink></li>
                </>
              )}
            </ul>
            <div className="my-2 h-[1px] w-full bg-white/[0.04]" />
            {loggedIn ? (
              <div className="flex flex-col gap-1">
                <div className="px-4 py-2">
                  <p className="truncate text-sm font-semibold text-slate-200">{user?.name}</p>
                  <p className="truncate text-xs text-slate-500">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="group flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-slate-200" onClick={closeMenus}>
                Sign In
              </NavLink>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}