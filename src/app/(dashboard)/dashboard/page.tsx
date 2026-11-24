
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  ShieldCheck,
  UserRound,
  Users,
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Wallet,
  TrendingUp,
  CalendarDays,
  ArrowRight,
  CreditCard,
  Heart,
  ShoppingBag,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { getMyRentals } from "@/services/booking-service";
import { getOwnerAnalytics } from "@/services/owner-analytics-service";
import { getAdminAnalytics } from "@/services/admin-analytics-service";

import type { Booking, BookingStatus } from "@/types/booking";
import type { OwnerAnalytics } from "@/types/owner-analytics";
import type { AdminAnalytics } from "@/types/admin-analytics";

type DashboardUser = {
  role?: string;
};

type AnalyticsCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  description: string;
};

type QuickAction = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const roleDescriptions: Record<string, string> = {
  customer: "Manage your rentals and explore equipment available for rent.",
  owner: "Manage your equipment listings and keep track of rental activity.",
  admin: "Manage platform users, equipment listings, and rental activity.",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const formatMonth = (year: number, month: number) =>
  new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
};

function AnalyticsCards({ cards }: { cards: AnalyticsCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                {card.label}
              </p>

              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={19} />
              </div>
            </div>

            <p className="mt-4 break-words font-heading text-2xl font-extrabold text-foreground">
              {card.value}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function MonthlyBreakdown({
  title,
  description,
  data,
  valueKey,
}: {
  title: string;
  description: string;
  data: {
    year: number;
    month: number;
    earnings?: number;
    revenue?: number;
  }[];
  valueKey: "earnings" | "revenue";
}) {
  const monthlyData = data.slice(-6);

  const maximumValue = Math.max(
    ...monthlyData.map((item) => item[valueKey] ?? 0),
    0,
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="font-heading text-lg font-bold text-foreground">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {monthlyData.length === 0 ? (
        <div className="flex min-h-36 items-center justify-center rounded-xl bg-muted/40 px-4 text-center">
          <p className="text-sm text-muted-foreground">
            No monthly earnings available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {monthlyData.map((item) => {
            const amount = item[valueKey] ?? 0;

            const percentage =
              maximumValue > 0 ? (amount / maximumValue) * 100 : 0;

            return (
              <div key={`${item.year}-${item.month}`}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {formatMonth(item.year, item.month)}
                  </span>

                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(amount)}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AnalyticsLoading() {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border bg-card">
      <div className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}

function AnalyticsError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
      <p className="text-sm font-medium text-destructive">{message}</p>
    </div>
  );
}

function CustomerStatusOverview({ bookings }: { bookings: Booking[] }) {
  const statuses: {
    label: string;
    value: BookingStatus;
    color: string;
  }[] = [
    { label: "Pending", value: "pending", color: "bg-amber-500" },
    { label: "Confirmed", value: "confirmed", color: "bg-blue-500" },
    { label: "Active", value: "active", color: "bg-emerald-500" },
    { label: "Completed", value: "completed", color: "bg-slate-500" },
    { label: "Cancelled", value: "cancelled", color: "bg-red-500" },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Booking Status
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your rental booking statuses.
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Your booking status will appear here after your first rental.
        </p>
      ) : (
        <div className="space-y-5">
          {statuses.map((status) => {
            const count = bookings.filter(
              (booking) => booking.status === status.value,
            ).length;

            const percentage = (count / bookings.length) * 100;

            return (
              <div key={status.value}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {status.label}
                  </span>

                  <span className="text-sm font-semibold text-foreground">
                    {count}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${status.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


function RecentRentals({ bookings }: { bookings: Booking[] }) {
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <section className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Recent Rentals
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your latest equipment bookings.
          </p>
        </div>

        <Link
          href="/dashboard/my-rentals"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:opacity-75"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {recentBookings.length === 0 ? (
        <div className="flex min-h-52 flex-col items-center justify-center rounded-xl bg-muted/30 px-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag size={26} />
          </div>

          <h3 className="mt-4 font-heading font-bold text-foreground">
            No rentals yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            You have not booked any equipment yet. Explore our equipment
            collection and find what you need.
          </p>

          <Link
            href="/equipment"
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Equipment
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentBookings.map((booking) => (
            <div
              key={booking._id}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/30 sm:gap-4"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-20">
                {booking.equipment?.image ? (
                  <Image
                    src={booking.equipment.image}
                    alt={booking.equipment.name || "Rental equipment"}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Package size={24} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-primary">
                  {booking.equipment?.category || "Equipment"}
                </p>

                <h3 className="mt-1 truncate text-sm font-bold text-foreground sm:text-base">
                  {booking.equipment?.name || "Equipment unavailable"}
                </h3>

                <p className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays size={13} className="shrink-0" />
                  <span className="truncate">
                    {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                  </span>
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
                  <span className="text-sm font-extrabold text-foreground">
                    {formatCurrency(booking.totalAmount)}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[booking.status]}`}
                  >
                    {formatLabel(booking.status)}
                  </span>
                </div>
              </div>

              <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
                <p className="font-heading text-sm font-extrabold text-foreground">
                  {formatCurrency(booking.totalAmount)}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[booking.status]}`}
                >
                  {formatLabel(booking.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


function CustomerQuickActions() {
  const actions: QuickAction[] = [
    {
      label: "Browse Equipment",
      description: "Find equipment for your next project.",
      href: "/equipment",
      icon: Package,
    },
    {
      label: "My Rentals",
      description: "Track and manage your bookings.",
      href: "/dashboard/my-rentals",
      icon: CalendarCheck,
    },
    {
      label: "My Favorites",
      description: "Explore your saved equipment.",
      href: "/dashboard/favorites",
      icon: Heart,
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Quick Actions
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Quickly access the features you use most.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-foreground">
                  {action.label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {action.description}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = (user as DashboardUser | undefined)?.role ?? "customer";

  const [ownerAnalytics, setOwnerAnalytics] =
    useState<OwnerAnalytics | null>(null);

  const [adminAnalytics, setAdminAnalytics] =
    useState<AdminAnalytics | null>(null);

  const [ownerLoading, setOwnerLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  const [ownerError, setOwnerError] = useState("");
  const [adminError, setAdminError] = useState("");

  const [customerBookings, setCustomerBookings] = useState<Booking[]>([]);
  const [customerTotal, setCustomerTotal] = useState(0);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerError, setCustomerError] = useState("");

  useEffect(() => {
    if (isPending || role !== "customer") {
      return;
    }

    let isActive = true;

    const fetchRentals = async () => {
      try {
        const response = await getMyRentals();

        if (isActive) {
          setCustomerBookings(response.data);
          setCustomerTotal(response.meta.total);
          setCustomerError("");
        }
      } catch (error) {
        if (isActive) {
          setCustomerError(
            error instanceof Error
              ? error.message
              : "Failed to load your rental information.",
          );
        }
      } finally {
        if (isActive) {
          setCustomerLoading(false);
        }
      }
    };

    void fetchRentals();

    return () => {
      isActive = false;
    };
  }, [isPending, role]);

  useEffect(() => {
    if (isPending || role !== "owner") {
      return;
    }

    let isActive = true;

    const fetchAnalytics = async () => {
      try {
        const response = await getOwnerAnalytics();

        if (isActive) {
          setOwnerAnalytics(response.data);
          setOwnerError("");
        }
      } catch (error) {
        if (isActive) {
          setOwnerError(
            error instanceof Error
              ? error.message
              : "Failed to load owner analytics.",
          );
        }
      } finally {
        if (isActive) {
          setOwnerLoading(false);
        }
      }
    };

    void fetchAnalytics();

    return () => {
      isActive = false;
    };
  }, [isPending, role]);

  useEffect(() => {
    if (isPending || role !== "admin") {
      return;
    }

    let isActive = true;

    const fetchAnalytics = async () => {
      try {
        const response = await getAdminAnalytics();

        if (isActive) {
          setAdminAnalytics(response.data);
          setAdminError("");
        }
      } catch (error) {
        if (isActive) {
          setAdminError(
            error instanceof Error
              ? error.message
              : "Failed to load admin analytics.",
          );
        }
      } finally {
        if (isActive) {
          setAdminLoading(false);
        }
      }
    };

    void fetchAnalytics();

    return () => {
      isActive = false;
    };
  }, [isPending, role]);

  const ownerCards: AnalyticsCard[] = ownerAnalytics
    ? [
        {
          label: "Total Equipment",
          value: ownerAnalytics.equipment.total.toLocaleString("en-BD"),
          icon: Package,
          description: "All your equipment listings",
        },
        {
          label: "Pending Equipment",
          value: ownerAnalytics.equipment.pending.toLocaleString("en-BD"),
          icon: Clock3,
          description: "Waiting for approval",
        },
        {
          label: "Approved Equipment",
          value: ownerAnalytics.equipment.approved.toLocaleString("en-BD"),
          icon: CheckCircle2,
          description: "Approved listings",
        },
        {
          label: "Rejected Equipment",
          value: ownerAnalytics.equipment.rejected.toLocaleString("en-BD"),
          icon: XCircle,
          description: "Rejected listings",
        },
        {
          label: "Completed Rentals",
          value: ownerAnalytics.rentals.completed.toLocaleString("en-BD"),
          icon: CalendarCheck,
          description: "Successfully completed rentals",
        },
        {
          label: "Total Earnings",
          value: formatCurrency(ownerAnalytics.earnings.total),
          icon: Wallet,
          description: "Total paid booking earnings",
        },
        {
          label: "This Month",
          value: formatCurrency(ownerAnalytics.earnings.monthly),
          icon: TrendingUp,
          description: "Current month's earnings",
        },
      ]
    : [];

  const adminCards: AnalyticsCard[] = adminAnalytics
    ? [
        {
          label: "Total Users",
          value: adminAnalytics.users.total.toLocaleString("en-BD"),
          icon: Users,
          description: "All registered users",
        },
        {
          label: "Customers",
          value: adminAnalytics.users.customers.toLocaleString("en-BD"),
          icon: UserRound,
          description: "Registered customer accounts",
        },
        {
          label: "Owners",
          value: adminAnalytics.users.owners.toLocaleString("en-BD"),
          icon: Package,
          description: "Registered owner accounts",
        },
        {
          label: "Admins",
          value: adminAnalytics.users.admins.toLocaleString("en-BD"),
          icon: ShieldCheck,
          description: "Platform administrator accounts",
        },
        {
          label: "Total Equipment",
          value: adminAnalytics.equipment.total.toLocaleString("en-BD"),
          icon: Package,
          description: "All equipment listings",
        },
        {
          label: "Pending Equipment",
          value: adminAnalytics.equipment.pending.toLocaleString("en-BD"),
          icon: Clock3,
          description: "Waiting for approval",
        },
        {
          label: "Approved Equipment",
          value: adminAnalytics.equipment.approved.toLocaleString("en-BD"),
          icon: CheckCircle2,
          description: "Approved listings",
        },
        {
          label: "Rejected Equipment",
          value: adminAnalytics.equipment.rejected.toLocaleString("en-BD"),
          icon: XCircle,
          description: "Rejected listings",
        },
        {
          label: "Total Bookings",
          value: adminAnalytics.bookings.total.toLocaleString("en-BD"),
          icon: CalendarCheck,
          description: "All rental bookings",
        },
        {
          label: "Pending Bookings",
          value: adminAnalytics.bookings.pending.toLocaleString("en-BD"),
          icon: Clock3,
          description: "Bookings awaiting processing",
        },
        {
          label: "Completed Bookings",
          value: adminAnalytics.bookings.completed.toLocaleString("en-BD"),
          icon: CheckCircle2,
          description: "Successfully completed bookings",
        },
        {
          label: "Total Revenue",
          value: formatCurrency(adminAnalytics.revenue.total),
          icon: Wallet,
          description: "Total paid booking revenue",
        },
        {
          label: "This Month",
          value: formatCurrency(adminAnalytics.revenue.monthly),
          icon: TrendingUp,
          description: "Current month's revenue",
        },
      ]
    : [];

  const customerCards: AnalyticsCard[] = [
    {
      label: "Total Rentals",
      value: customerTotal.toLocaleString("en-BD"),
      icon: Package,
      description: "All your rental bookings",
    },
    {
      label: "Active Rentals",
      value: customerBookings
        .filter((booking) => booking.status === "active")
        .length.toLocaleString("en-BD"),
      icon: CalendarCheck,
      description: "Currently active rentals",
    },
    {
      label: "Pending Bookings",
      value: customerBookings
        .filter((booking) => booking.status === "pending")
        .length.toLocaleString("en-BD"),
      icon: Clock3,
      description: "Waiting for confirmation",
    },
    {
      label: "Total Spent",
      value: formatCurrency(
        customerBookings
          .filter((booking) => booking.paymentStatus === "paid")
          .reduce((total, booking) => total + booking.totalAmount, 0),
      ),
      icon: Wallet,
      description: "Total amount from paid bookings",
    },
  ];

  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
        <div className="flex items-center gap-2 text-sm font-semibold opacity-80">
          <LayoutDashboard size={17} />
          Dashboard Overview
        </div>

        <h1 className="mt-4 font-heading text-2xl font-extrabold sm:text-3xl">
          Welcome back, {user?.name || "User"}!
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 opacity-85 sm:text-base">
          {roleDescriptions[role] || roleDescriptions.customer}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold capitalize">
          {role === "admin" ? (
            <ShieldCheck size={17} />
          ) : (
            <UserRound size={17} />
          )}
          {role} Account
        </div>
      </section>

      {role === "customer" && (
        <section className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Your Rental Summary
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Keep track of your bookings, rental activity, and payments.
            </p>
          </div>

          {customerLoading ? (
            <AnalyticsLoading />
          ) : customerError ? (
            <AnalyticsError message={customerError} />
          ) : (
            <>
              <AnalyticsCards cards={customerCards} />

              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <RecentRentals bookings={customerBookings} />

                <CustomerStatusOverview bookings={customerBookings} />
              </div>

              <CustomerQuickActions />
            </>
          )}
        </section>
      )}

      {role === "owner" && (
        <section className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Owner Analytics
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Track your equipment listings, completed rentals, and earnings.
            </p>
          </div>

          {ownerLoading ? (
            <AnalyticsLoading />
          ) : ownerError ? (
            <AnalyticsError message={ownerError} />
          ) : ownerAnalytics ? (
            <>
              <AnalyticsCards cards={ownerCards} />

              <MonthlyBreakdown
                title="Monthly Earnings"
                description="Your paid booking earnings over recent months."
                data={ownerAnalytics.earnings.monthlyBreakdown}
                valueKey="earnings"
              />
            </>
          ) : null}
        </section>
      )}

      {role === "admin" && (
        <section className="space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Admin Analytics
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Monitor platform users, equipment, bookings, and revenue.
            </p>
          </div>

          {adminLoading ? (
            <AnalyticsLoading />
          ) : adminError ? (
            <AnalyticsError message={adminError} />
          ) : adminAnalytics ? (
            <>
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  User Statistics
                </h3>

                <AnalyticsCards cards={adminCards.slice(0, 4)} />
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Equipment Statistics
                </h3>

                <AnalyticsCards cards={adminCards.slice(4, 8)} />
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Booking Statistics
                </h3>

                <AnalyticsCards cards={adminCards.slice(8, 11)} />
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Revenue Statistics
                </h3>

                <AnalyticsCards cards={adminCards.slice(11)} />

                <MonthlyBreakdown
                  title="Monthly Revenue"
                  description="Platform revenue from paid bookings over recent months."
                  data={adminAnalytics.revenue.monthlyBreakdown}
                  valueKey="revenue"
                />
              </div>
            </>
          ) : null}
        </section>
      )}
    </div>
  );
}
