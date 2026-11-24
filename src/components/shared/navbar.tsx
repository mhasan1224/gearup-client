
"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

import { publicNavigation } from "@/lib/navigation";
import { useSession } from "@/lib/auth-client";
import MobileNav from "@/components/shared/mobile-nav";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 text-foreground shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-extrabold text-primary-foreground">
            G
          </span>

          <span className="font-heading text-xl font-extrabold tracking-tight">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {!isPending && session ? (
            <>
              <span className="max-w-32 truncate text-sm font-semibold text-foreground">
                {session.user.name}
              </span>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:brightness-95"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </>
          ) : !isPending ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:brightness-95"
              >
                Get Started
              </Link>
            </>
          ) : null}
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
