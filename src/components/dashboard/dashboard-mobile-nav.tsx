
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { DashboardRole } from "./dashboard-nav-config";

interface DashboardMobileNavProps {
  role: DashboardRole;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardMobileNav({
  role,
  isOpen,
  onClose,
}: DashboardMobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[#071827]/70 backdrop-blur-sm"
          />

          {/* Mobile Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
            }}
            className="absolute inset-y-0 left-0 w-[270px] max-w-[85vw]"
          >
            <DashboardSidebar
              role={role}
              isOpen={isOpen}
              onClose={onClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
