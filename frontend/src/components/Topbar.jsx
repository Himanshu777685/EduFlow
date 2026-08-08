import React from "react";
import { Menu, Search, Bell } from "lucide-react";

const Topbar = ({ search, setSearch, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-700">Educator Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-56 sm:block md:w-72 lg:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <button className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-600" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
          H
        </div>
      </div>
    </header>
  );
};

export default Topbar;
