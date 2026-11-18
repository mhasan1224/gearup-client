
"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Package,
  Plus,
  Sparkles,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Bookings",
    value: "12",
    change: "+2 this month",
    icon: CalendarDays,
    iconStyle: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    trend: "up",
  },
  {
    label: "Active Rentals",
    value: "03",
    change: "Currently renting",
    icon: Package,
    iconStyle: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
    trend: "up",
  },
  {
    label: "Completed Rentals",
    value: "08",
    change: "Successfully completed",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    trend: "up",
  },
  {
    label: "Total Spent",
    value: "$2,450",
    change: "Across all bookings",
    icon: Wallet,
    iconStyle: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    trend: "down",
  },
];

const bookings = [
  {
    id: "GR-2026-001",
    name: "CAT Excavator 320D",
    category: "Construction",
    dates: "Nov 20 – Nov 24, 2026",
    amount: "$850",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "GR-2026-002",
    name: "Professional DSLR Camera",
    category: "Photography",
    dates: "Nov 25 – Nov 27, 2026",
    amount: "$180",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "GR-2026-003",
    name: "Industrial Power Generator",
    category: "Electronics",
    dates: "Nov 10 – Nov 12, 2026",
    amount: "$240",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=240&auto=format&fit=crop&q=80",
  },
];

const upcomingRentals = [
  {
    name: "Professional DSLR Camera",
    date: "Nov 25, 2026",
    daysLeft: "Starts in 6 days",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Industrial Power Generator",
    date: "Dec 02, 2026",
    daysLeft: "Starts in 13 days",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=240&auto=format&fit=crop&q=80",
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
  Confirmed:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
};

function SectionHeading({
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-[#071827] dark:text-white sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#087f68] transition-colors hover:text-[#00a982] dark:text-[#00d6a3]"
        >
          {linkLabel}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#071827] via-[#102b40] to-[#087f68] p-6 text-white shadow-xl shadow-[#071827]/10 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-[#00d6a3]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-1/3 -z-10 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-teal-100 backdrop-blur-md">
              <Sparkles size={14} className="text-[#00d6a3]" />
              Your rental workspace
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, <span className="text-[#00d6a3]">Alex!</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
              Manage your equipment rentals, track upcoming bookings, and
              discover the tools you need for your next project.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00d6a3]/20 transition-all hover:-translate-y-0.5 hover:bg-[#20e5b5]"
              >
                <Plus size={17} />
                Explore Equipment
              </Link>

              <Link
                href="/dashboard/customer/bookings"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15"
              >
                My Bookings
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hidden shrink-0 md:block">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-inner backdrop-blur-xl lg:h-44 lg:w-44">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#00d6a3]/30 bg-[#00d6a3]/10 lg:h-36 lg:w-36">
                <Package size={62} strokeWidth={1.2} className="text-[#00d6a3]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-300 sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#00d6a3]" />
            Easy booking management
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#00d6a3]" />
            Secure payments
          </span>
        </div>
      </motion.section>

      {/* Statistics */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#071827] dark:text-white">
              Your Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              An overview of your rental activity
            </p>
          </div>
          <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-white/5 dark:text-slate-400 sm:inline-flex">
            All time
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 dark:border-white/10 dark:bg-[#102b40] dark:hover:shadow-black/20"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>
                  {stat.trend === "up" ? (
                    <ArrowUpRight
                      size={18}
                      className="text-emerald-500"
                    />
                  ) : (
                    <ArrowDownRight
                      size={18}
                      className="text-slate-400"
                    />
                  )}
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#071827] dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-slate-400">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bookings and upcoming rentals */}
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102b40] sm:p-6 xl:col-span-2">
          <SectionHeading
            title="Recent Bookings"
            description="Keep track of your latest equipment rentals"
            href="/dashboard/customer/bookings"
          />

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-100 p-3 transition-colors hover:border-[#00d6a3]/40 dark:border-white/5 dark:hover:border-[#00d6a3]/30 sm:flex-row sm:items-center"
              >
                <div
                  role="img"
                  aria-label={booking.name}
                  className="h-20 w-full shrink-0 rounded-lg bg-cover bg-center sm:w-24"
                  style={{ backgroundImage: `url("${booking.image}")` }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[#071827] dark:text-white">
                      {booking.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {booking.category} · {booking.id}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      {booking.dates}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right dark:border-white/5">
                  <p className="text-xs text-slate-400">Total amount</p>
                  <p className="mt-1 font-extrabold text-[#071827] dark:text-white">
                    {booking.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/customer/bookings"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-[#00d6a3] hover:text-[#087f68] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00d6a3]"
          >
            View all bookings
            <ArrowRight size={15} />
          </Link>
        </section>

        {/* Upcoming rentals */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102b40] sm:p-6">
          <SectionHeading
            title="Upcoming Rentals"
            description="Your next scheduled rentals"
          />

          <div className="space-y-4">
            {upcomingRentals.map((rental) => (
              <div
                key={rental.name}
                className="rounded-xl bg-slate-50 p-3 dark:bg-white/5"
              >
                <div className="flex gap-3">
                  <div
                    role="img"
                    aria-label={rental.name}
                    className="h-14 w-14 shrink-0 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url("${rental.image}")` }}
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-bold text-[#071827] dark:text-white">
                      {rental.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {rental.date}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-xs font-semibold text-[#087f68] dark:border-white/10 dark:text-[#00d6a3]">
                  <Clock3 size={14} />
                  {rental.daysLeft}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[#00d6a3]/20 bg-[#00d6a3]/5 p-4 dark:bg-[#00d6a3]/[0.06]">
            <p className="text-sm font-bold text-[#071827] dark:text-white">
              Need more equipment?
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Find the right tools for your next project.
            </p>
            <Link
              href="/equipment"
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#087f68] hover:gap-2 dark:text-[#00d6a3]"
            >
              Browse marketplace
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>

      {/* Saved equipment and quick links */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102b40] sm:p-6">
          <SectionHeading
            title="Saved Equipment"
            description="Equipment you have added to your wishlist"
            href="/dashboard/customer/saved"
          />

          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 py-8 text-center dark:border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-500/10">
              <Heart size={22} />
            </div>
            <h3 className="mt-4 font-bold text-[#071827] dark:text-white">
              Your saved list is waiting
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Save equipment you like and come back to it whenever you need.
            </p>
            <Link
              href="/equipment"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#071827] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#102b40] dark:bg-[#00d6a3] dark:text-[#071827] dark:hover:bg-[#20e5b5]"
            >
              Explore equipment
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102b40] sm:p-6">
          <SectionHeading
            title="Quick Access"
            description="Shortcuts to manage your account"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/equipment"
              className="group rounded-xl border border-slate-100 p-4 transition-all hover:border-[#00d6a3]/40 hover:bg-[#00d6a3]/5 dark:border-white/5"
            >
              <Package size={21} className="text-[#087f68] dark:text-[#00d6a3]" />
              <h3 className="mt-3 text-sm font-bold text-[#071827] dark:text-white">
                Browse Equipment
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Discover available rentals
              </p>
            </Link>

            <Link
              href="/dashboard/customer/profile"
              className="group rounded-xl border border-slate-100 p-4 transition-all hover:border-[#00d6a3]/40 hover:bg-[#00d6a3]/5 dark:border-white/5"
            >
              <MapPin size={21} className="text-[#087f68] dark:text-[#00d6a3]" />
              <h3 className="mt-3 text-sm font-bold text-[#071827] dark:text-white">
                My Profile
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Manage your personal details
              </p>
            </Link>

            <Link
              href="/dashboard/customer/bookings"
              className="group rounded-xl border border-slate-100 p-4 transition-all hover:border-[#00d6a3]/40 hover:bg-[#00d6a3]/5 dark:border-white/5"
            >
              <CalendarDays size={21} className="text-[#087f68] dark:text-[#00d6a3]" />
              <h3 className="mt-3 text-sm font-bold text-[#071827] dark:text-white">
                Booking History
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Review your past rentals
              </p>
            </Link>

            <Link
              href="/dashboard/customer/notifications"
              className="group rounded-xl border border-slate-100 p-4 transition-all hover:border-[#00d6a3]/40 hover:bg-[#00d6a3]/5 dark:border-white/5"
            >
              <Wallet size={21} className="text-[#087f68] dark:text-[#00d6a3]" />
              <h3 className="mt-3 text-sm font-bold text-[#071827] dark:text-white">
                Notifications
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Stay updated on your rentals
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
