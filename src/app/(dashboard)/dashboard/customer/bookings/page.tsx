
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  CalendarDays,
  Package,
  Clock3,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  Wallet,
  MapPin,
} from "lucide-react";

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled";

type Booking = {
  id: string;
  equipment: string;
  category: string;
  image: string;
  startDate: string;
  endDate: string;
  bookingDate: string;
  amount: number;
  status: BookingStatus;
  location: string;
};

const bookings: Booking[] = [
  {
    id: "GR-2026-001",
    equipment: "CAT Excavator 320D",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=500&auto=format&fit=crop&q=80",
    startDate: "Nov 20, 2026",
    endDate: "Nov 24, 2026",
    bookingDate: "Nov 15, 2026",
    amount: 850,
    status: "Active",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "GR-2026-002",
    equipment: "Professional DSLR Camera",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80",
    startDate: "Nov 25, 2026",
    endDate: "Nov 27, 2026",
    bookingDate: "Nov 17, 2026",
    amount: 180,
    status: "Confirmed",
    location: "Gazipur, Bangladesh",
  },
  {
    id: "GR-2026-003",
    equipment: "Industrial Power Generator",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=80",
    startDate: "Nov 10, 2026",
    endDate: "Nov 12, 2026",
    bookingDate: "Nov 05, 2026",
    amount: 240,
    status: "Completed",
    location: "Dhaka, Bangladesh",
  },
  {
    id: "GR-2026-004",
    equipment: "Heavy Duty Tractor",
    category: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=80",
    startDate: "Dec 02, 2026",
    endDate: "Dec 05, 2026",
    bookingDate: "Nov 18, 2026",
    amount: 420,
    status: "Pending",
    location: "Mymensingh, Bangladesh",
  },
  {
    id: "GR-2026-005",
    equipment: "Professional Lighting Kit",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&auto=format&fit=crop&q=80",
    startDate: "Oct 15, 2026",
    endDate: "Oct 17, 2026",
    bookingDate: "Oct 10, 2026",
    amount: 120,
    status: "Cancelled",
    location: "Dhaka, Bangladesh",
  },
];

const filters = [
  "All",
  "Pending",
  "Confirmed",
  "Active",
  "Completed",
  "Cancelled",
] as const;

type BookingFilter = (typeof filters)[number];

const statusStyles: Record<BookingStatus, string> = {
  Pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Confirmed:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Active:
    "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
  Completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Cancelled:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const statItems = [
  {
    label: "Total Bookings",
    icon: Package,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    getValue: (items: Booking[]) => items.length,
  },
  {
    label: "Active Rentals",
    icon: Clock3,
    color: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
    getValue: (items: Booking[]) =>
      items.filter((item) => item.status === "Active").length,
  },
  {
    label: "Completed",
    icon: CheckCircle2,
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    getValue: (items: Booking[]) =>
      items.filter((item) => item.status === "Completed").length,
  },
  {
    label: "Total Spent",
    icon: Wallet,
    color:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    getValue: (items: Booking[]) =>
      items
        .filter((item) => item.status !== "Cancelled")
        .reduce((total, item) => total + item.amount, 0),
  },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${statusStyles[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function CustomerBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter =
        activeFilter === "All" || booking.status === activeFilter;

      const matchesSearch =
        !query ||
        booking.equipment.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query) ||
        booking.category.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const formatAmount = (amount: number) =>
    `$${amount.toLocaleString("en-US")}`;

  return (
    <div className="space-y-8 pb-8">
      {/* Page heading */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00d6a3]/20 bg-[#00d6a3]/5 px-3 py-1.5 text-xs font-semibold text-[#087f68] dark:text-[#00d6a3]">
            <CalendarDays size={14} />
            Rental Management
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#071827] dark:text-white sm:text-3xl">
            My Bookings
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Track your equipment rentals and manage your booking history.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00d6a3]/15 transition-all hover:-translate-y-0.5 hover:bg-[#20e5b5]"
        >
          <Package size={17} />
          Browse Equipment
          <ArrowRight size={15} />
        </Link>
      </motion.section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((stat, index) => {
          const Icon = stat.icon;
          const value = stat.getValue(bookings);

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#102b40]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  Overview
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>

              <p className="mt-1 text-2xl font-extrabold text-[#071827] dark:text-white">
                {stat.label === "Total Spent"
                  ? formatAmount(value)
                  : String(value).padStart(2, "0")}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* Booking list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#102b40]">
        <div className="border-b border-slate-100 p-5 dark:border-white/10 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#071827] dark:text-white">
                Booking History
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                All your equipment rental requests in one place.
              </p>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search equipment or booking ID..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-[#071827] outline-none transition-all placeholder:text-slate-400 focus:border-[#00d6a3] focus:ring-4 focus:ring-[#00d6a3]/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          {/* Status filters */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal
              size={17}
              className="mr-1 shrink-0 text-slate-400"
            />

            {filters.map((filter) => {
              const count =
                filter === "All"
                  ? bookings.length
                  : bookings.filter((item) => item.status === filter).length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-[#071827] text-white shadow-md dark:bg-[#00d6a3] dark:text-[#071827]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {filter}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      activeFilter === filter
                        ? "bg-white/15 dark:bg-[#071827]/10"
                        : "bg-white dark:bg-white/10"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
                <th className="px-6 py-4">Equipment</th>
                <th className="px-5 py-4">Rental Period</th>
                <th className="px-5 py-4">Booking Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition-colors hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        role="img"
                        aria-label={booking.equipment}
                        className="h-14 w-16 shrink-0 rounded-xl bg-cover bg-center"
                        style={{
                          backgroundImage: `url("${booking.image}")`,
                        }}
                      />

                      <div>
                        <p className="max-w-[190px] font-bold text-[#071827] dark:text-white">
                          {booking.equipment}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {booking.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-200">
                      {booking.startDate}
                    </p>
                    <p className="mt-1 whitespace-nowrap text-xs text-slate-400">
                      to {booking.endDate}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {booking.bookingDate}
                  </td>

                  <td className="px-5 py-4 font-bold text-[#071827] dark:text-white">
                    {formatAmount(booking.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile booking cards */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredBookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-xl border border-slate-100 p-3 dark:border-white/10"
            >
              <div className="flex gap-3">
                <div
                  role="img"
                  aria-label={booking.equipment}
                  className="h-20 w-20 shrink-0 rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${booking.image}")`,
                  }}
                />

                <div className="min-w-0 flex-1">
                  <div className="mb-2">
                    <StatusBadge status={booking.status} />
                  </div>
                  <h3 className="line-clamp-2 text-sm font-bold text-[#071827] dark:text-white">
                    {booking.equipment}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{booking.id}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 dark:border-white/10">
                <div>
                  <p className="text-xs text-slate-400">Rental period</p>
                  <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {booking.startDate}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    to {booking.endDate}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Total amount</p>
                  <p className="mt-1 text-base font-extrabold text-[#071827] dark:text-white">
                    {formatAmount(booking.amount)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin size={13} />
                {booking.location}
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredBookings.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5">
              <Package size={25} />
            </div>

            <h3 className="mt-4 font-bold text-[#071827] dark:text-white">
              No bookings found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              We couldn&apos;t find any bookings matching your search. Try
              another keyword or change the status filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-5 rounded-xl bg-[#00d6a3] px-5 py-2.5 text-sm font-bold text-[#071827] transition-colors hover:bg-[#20e5b5]"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer */}
        {filteredBookings.length > 0 && (
          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 dark:border-white/10 sm:flex-row sm:items-center sm:px-6">
            <p>
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <p>Booking information is for demonstration only.</p>
          </div>
        )}
      </section>
    </div>
  );
}
