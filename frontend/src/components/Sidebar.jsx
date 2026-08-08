import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  Users,
  IndianRupee,
  BarChart3,
  UserRound,
  Settings,
  X,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Courses", icon: BookOpen },
  { label: "Create Course", icon: PlusSquare },
  { label: "Students", icon: Users },
  { label: "Earnings", icon: IndianRupee },
  { label: "Analytics", icon: BarChart3 },
  { label: "Profile", icon: UserRound },
  { label: "Settings", icon: Settings },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-slate-950 text-white
        transition-transform duration-300 lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
                <GraduationCap size={22} />
              </div>

              <div>
                <h2 className="font-bold tracking-wide">EduLearn</h2>
                <p className="text-xs text-slate-400">Educator</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-5 flex-1 px-3">
            {menuItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="m-3 rounded-xl bg-slate-900 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-semibold">
                H
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Himanshu</p>
                <p className="text-xs text-slate-400">Educator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
