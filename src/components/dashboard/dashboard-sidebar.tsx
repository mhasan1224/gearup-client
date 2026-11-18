
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Headset,
  LogOut,
  Zap,
} from "lucide-react";
import type { DashboardRole } from "./dashboard-nav-config";
import { dashboardNavConfig } from "./dashboard-nav-config";

interface DashboardSidebarProps {
  role: DashboardRole;
  isOpen?: boolean;
  onClose?: () => void;
}

const roleLabels: Record<DashboardRole, string> = {
  customer: "Customer Portal",
  owner: "Owner Workspace",
  admin: "Admin Console",
};

export function DashboardSidebar({
  role,
  isOpen = true,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const navigation = dashboardNavConfig[role];

  return (
    <aside
      className={`flex h-full w-[270px] shrink-0 flex-col border-r border-white/10 bg-[#071827] text-white ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      {/* Brand */}
      <div className="flex h-[82px] items-center border-b border-white/10 px-6">
        <Link
          href="/"
          onClick={onClose}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d6a3] to-[#087f68] shadow-lg shadow-[#00d6a3]/20">
            <Zap size={23} className="fill-[#071827] text-[#071827]" />
          </div>

          <div>
            <p className="text-xl font-black tracking-tight">
              Gear<span className="text-[#00d6a3]">Up</span>
            </p>
            <p className="text-[9px] font-bold tracking-[0.25em] text-slate-400">
              RENTALS
            </p>
          </div>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-5 pb-5 pt-6">
        <div className="rounded-xl border border-[#00d6a3]/15 bg-[#00d6a3]/[0.07] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00d6a3]">
            Workspace
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {roleLabels[role]}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-4 pb-6">
        {navigation.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {group.title}
            </p>

            <div className="space-y-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== `/dashboard/${role}` &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-[13px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#00d6a3] text-[#071827] shadow-lg shadow-[#00d6a3]/10"
                        : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dashboard-active-indicator"
                        className="absolute inset-0 rounded-xl bg-[#00d6a3]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon
                      size={18}
                      className={`relative z-10 shrink-0 ${
                        isActive
                          ? "text-[#071827]"
                          : "text-slate-500 transition-colors group-hover:text-[#00d6a3]"
                      }`}
                    />

                    <span className="relative z-10 flex-1">
                      {item.label}
                    </span>

                    {isActive && (
                      <ArrowUpRight
                        size={15}
                        className="relative z-10"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Support Card */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#102b40] to-[#0b2133] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00d6a3]/10 text-[#00d6a3]">
            <Headset size={19} />
          </div>

          <h3 className="mt-3 text-sm font-bold text-white">
            Need a hand?
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Our support team is here to help you.
          </p>

          <Link
            href="/contact"
            onClick={onClose}
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#00d6a3] transition-colors hover:text-white"
          >
            Get Support
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Bottom Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          onClick={() => {
            // Authentication integration will be added later.
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
