
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  UserRound,
  Package,
  ClipboardList,
  Wallet,
  Users,
  Settings,
  ChartNoAxesCombined,
  Bell,
  type LucideIcon,
} from "lucide-react";

export type DashboardRole = "customer" | "owner" | "admin";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export const dashboardNavConfig: Record<
  DashboardRole,
  DashboardNavGroup[]
> = {
  customer: [
    {
      title: "Workspace",
      items: [
        {
          label: "Overview",
          href: "/dashboard/customer",
          icon: LayoutDashboard,
        },
        {
          label: "My Bookings",
          href: "/dashboard/customer/bookings",
          icon: CalendarDays,
        },
        {
          label: "Saved Equipment",
          href: "/dashboard/customer/saved",
          icon: Heart,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/customer/profile",
          icon: UserRound,
        },
        {
          label: "Notifications",
          href: "/dashboard/customer/notifications",
          icon: Bell,
        },
        {
          label: "Settings",
          href: "/dashboard/customer/settings",
          icon: Settings,
        },
      ],
    },
  ],

  owner: [
    {
      title: "Workspace",
      items: [
        {
          label: "Overview",
          href: "/dashboard/owner",
          icon: LayoutDashboard,
        },
        {
          label: "My Equipment",
          href: "/dashboard/owner/equipment",
          icon: Package,
        },
        {
          label: "Rental Requests",
          href: "/dashboard/owner/requests",
          icon: ClipboardList,
        },
        {
          label: "My Earnings",
          href: "/dashboard/owner/earnings",
          icon: Wallet,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/owner/profile",
          icon: UserRound,
        },
        {
          label: "Notifications",
          href: "/dashboard/owner/notifications",
          icon: Bell,
        },
        {
          label: "Settings",
          href: "/dashboard/owner/settings",
          icon: Settings,
        },
      ],
    },
  ],

  admin: [
    {
      title: "Management",
      items: [
        {
          label: "Overview",
          href: "/dashboard/admin",
          icon: LayoutDashboard,
        },
        {
          label: "All Users",
          href: "/dashboard/admin/users",
          icon: Users,
        },
        {
          label: "Equipment",
          href: "/dashboard/admin/equipment",
          icon: Package,
        },
        {
          label: "All Rentals",
          href: "/dashboard/admin/rentals",
          icon: CalendarDays,
        },
        {
          label: "Reports & Analytics",
          href: "/dashboard/admin/reports",
          icon: ChartNoAxesCombined,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/admin/profile",
          icon: UserRound,
        },
        {
          label: "Notifications",
          href: "/dashboard/admin/notifications",
          icon: Bell,
        },
        {
          label: "Settings",
          href: "/dashboard/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
