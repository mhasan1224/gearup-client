
"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";
import type { DashboardRole } from "./dashboard-nav-config";

interface DashboardHeaderProps {
  role: DashboardRole;
  onMenuClick?: () => void;
}

const roleLabels: Record<DashboardRole, string> = {
  customer: "Customer",
  owner: "Equipment Owner",
  admin: "Administrator",
};

const dashboardTitles: Record<DashboardRole, string> = {
  customer: "Customer Dashboard",
  owner: "Owner Dashboard",
  admin: "Admin Dashboard",
};

export function DashboardHeader({
  role,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[82px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#071827]/90">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open dashboard navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-[#00d6a3] hover:text-[#087f68] lg:hidden dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00d6a3]"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <Link
              href="/"
              className="transition-colors hover:text-[#087f68] dark:hover:text-[#00d6a3]"
            >
              GearUp
            </Link>

            <span>/</span>

            <span className="text-slate-500 dark:text-slate-300">
              {roleLabels[role]}
            </span>
          </div>

          <h1 className="mt-0.5 truncate text-base font-extrabold tracking-tight text-[#071827] sm:text-lg dark:text-white">
            {dashboardTitles[role]}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="hidden w-52 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-all focus-within:border-[#00d6a3] focus-within:bg-white md:flex xl:w-64 dark:border-white/10 dark:bg-white/[0.04] dark:focus-within:bg-[#102b40]">
          <Search size={17} className="shrink-0 text-slate-400" />

          <input
            type="search"
            placeholder="Search equipment..."
            aria-label="Search equipment"
            className="w-full bg-transparent text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
          />

          <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 xl:inline-block dark:border-white/10 dark:bg-white/5">
            /
          </kbd>
        </div>

        {/* Notifications */}
        <Link
          href={`/dashboard/${role}/notifications`}
          aria-label="View notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:border-[#00d6a3]/40 hover:bg-[#00d6a3]/5 hover:text-[#087f68] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00d6a3]"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#00d6a3] dark:border-[#071827]" />
        </Link>

        {/* Profile */}
        <button
          type="button"
          aria-label="Open user profile menu"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-100 sm:gap-3 dark:hover:bg-white/[0.05]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d6a3] to-[#087f68] text-sm font-extrabold text-[#071827] shadow-md shadow-[#00d6a3]/10">
            M
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-bold text-[#071827] dark:text-white">
              Member
            </p>

            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              {roleLabels[role]}
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
}
