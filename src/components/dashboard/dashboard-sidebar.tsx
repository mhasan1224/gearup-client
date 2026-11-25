"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  Heart,
  ClipboardList,
  Package,
  PackagePlus,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  Star,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";
import type { ElementType } from "react";

type UserRole = "customer" | "owner" | "admin";

type NavigationItem = {
  label: string;
  href: string;
  icon: ElementType;
};

const navigationByRole: Record<UserRole, NavigationItem[]> = {
  customer: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Rentals",
      href: "/dashboard/my-rentals",
      icon: ClipboardList,
    },
    {
      label: "My Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  owner: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Add Equipment",
      href: "/dashboard/add-equipment",
      icon: PackagePlus,
    },
    {
      label: "My Equipment",
      href: "/dashboard/my-equipment",
      icon: Package,
    },
    {
      label: "Rental Requests",
      href: "/dashboard/rentals",
      icon: ClipboardList,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  admin: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Manage Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      label: "Manage Equipment",
      href: "/dashboard/equipment",
      icon: Package,
    },

    {
      label: "Manage Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const userRole = (session?.user as { role?: string } | undefined)?.role;

  const role: UserRole =
    userRole === "owner" || userRole === "admin" ? userRole : "customer";

  const navigationItems = navigationByRole[role];

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="flex min-h-full w-full flex-col border-r border-border bg-card">
      <div className="border-b border-border p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-extrabold text-primary-foreground">
            G
          </span>

          <span className="font-heading text-xl font-extrabold tracking-tight">
            Gear<span className="text-primary">Up</span>
          </span>
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            {role === "admin" ? (
              <ShieldCheck size={21} />
            ) : (
              <UserRound size={21} />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">
              {isPending ? "Loading..." : session?.user.name}
            </p>

            <p className="text-xs font-medium capitalize text-muted-foreground">
              {role}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/dashboard/settings"
          className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Settings size={19} />
          Settings
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
