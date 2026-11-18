
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { DashboardMobileNav } from "./dashboard-mobile-nav";
import type { DashboardRole } from "./dashboard-nav-config";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getDashboardRole(pathname: string): DashboardRole {
  const segments = pathname.split("/");

  const role = segments[2];

  if (role === "owner" || role === "admin") {
    return role;
  }

  return "customer";
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const role = getDashboardRole(pathname);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileNavOpen]);

  return (
    <div className="min-h-screen bg-[#f5f8fa] dark:bg-[#071827]">
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <DashboardSidebar role={role} />
      </div>

      {/* Mobile Navigation */}
      <DashboardMobileNav
        role={role}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main Dashboard Area */}
      <div className="min-h-screen lg:ml-[270px]">
        <DashboardHeader
          role={role}
          onMenuClick={() => setIsMobileNavOpen(true)}
        />

        <main className="min-h-[calc(100vh-82px)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
