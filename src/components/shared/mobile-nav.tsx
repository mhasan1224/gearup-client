
"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Menu, X } from "lucide-react";

import { publicNavigation } from "@/lib/navigation";
import { useSession } from "@/lib/auth-client";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
      >
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-20 border-b border-border bg-card p-5 shadow-lg">
          <nav className="flex flex-col gap-2">
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 border-t border-border" />

            {!isPending && session ? (
              <>
                <p className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                  Signed in as {session.user.name}
                </p>

                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-95"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>
              </>
            ) : !isPending ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:brightness-95"
                >
                  Get Started
                </Link>
              </>
            ) : null}
          </nav>
        </div>
      )}
    </div>
  );
}
