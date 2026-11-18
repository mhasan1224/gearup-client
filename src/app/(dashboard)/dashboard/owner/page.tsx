
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Eye,
  Package,
  Plus,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";

const stats = [
  {
    label: "Total Equipment",
    value: "12",
    change: "+2 this month",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    trend: "up",
  },
  {
    label: "Active Rentals",
    value: "08",
    change: "+3 this week",
    icon: Wrench,
    color: "text-[#087F68] dark:text-[#00D6A3]",
    bg: "bg-[#00D6A3]/10",
    trend: "up",
  },
  {
    label: "Pending Requests",
    value: "05",
    change: "Needs attention",
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    trend: "neutral",
  },
  {
    label: "Total Earnings",
    value: "৳84,500",
    change: "+18.5% this month",
    icon: Wallet,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    trend: "up",
  },
];

const recentRequests = [
  {
    id: "REQ-2048",
    customer: "Daniel Wilson",
    initials: "DW",
    equipment: "CAT Excavator 320D",
    period: "Nov 22 – Nov 25, 2026",
    amount: "৳18,000",
    status: "Pending",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "REQ-2047",
    customer: "Sophia Bennett",
    initials: "SB",
    equipment: "Industrial Generator",
    period: "Nov 20 – Nov 23, 2026",
    amount: "৳12,500",
    status: "Confirmed",
    color: "bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]",
  },
  {
    id: "REQ-2046",
    customer: "James Anderson",
    initials: "JA",
    equipment: "Professional Camera Kit",
    period: "Nov 18 – Nov 21, 2026",
    amount: "৳8,500",
    status: "Active",
    color: "bg-blue-500/10 text-blue-600",
  },
];

const topEquipment = [
  {
    name: "CAT Excavator 320D",
    category: "Construction",
    bookings: 14,
    earnings: "৳32,000",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Professional Camera Kit",
    category: "Photography",
    bookings: 9,
    earnings: "৳21,500",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=240&auto=format&fit=crop&q=80",
  },
  {
    name: "Industrial Generator",
    category: "Electronics",
    bookings: 7,
    earnings: "৳18,000",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=240&auto=format&fit=crop&q=80",
  },
];

const activity = [
  {
    title: "New rental request received",
    description: "Daniel requested CAT Excavator 320D.",
    time: "12 minutes ago",
    icon: CalendarDays,
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    title: "Rental successfully completed",
    description: "Professional Camera Kit rental completed.",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-[#087F68] bg-[#00D6A3]/10",
  },
  {
    title: "Payment received",
    description: "৳12,500 payment received from Sophia.",
    time: "Yesterday",
    icon: DollarSign,
    color: "text-purple-600 bg-purple-500/10",
  },
];

function SectionTitle({
  title,
  description,
  href,
  linkLabel = "View all",
}: {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-extrabold text-[#071827] dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#087F68] transition hover:text-[#00D6A3] dark:text-[#00D6A3]"
      >
        {linkLabel}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function OwnerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071827] via-[#102B40] to-[#087F68] p-6 text-white shadow-xl sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-32 right-28 h-64 w-64 rounded-full bg-[#00D6A3]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00D6A3]/20 bg-[#00D6A3]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00D6A3]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D6A3]" />
              Owner Workspace
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, Alex!
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/65">
              Your equipment is creating opportunities. Keep track of
              your rentals, manage incoming requests and grow your rental
              business with GearUp.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard/owner/equipment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-xs font-extrabold text-[#071827] transition hover:bg-[#00bd90]"
              >
                <Plus size={16} />
                Add Equipment
              </Link>

              <Link
                href="/dashboard/owner/requests"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Manage Requests
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <TrendingUp size={19} className="text-[#00D6A3]" />
              <p className="mt-4 text-2xl font-extrabold">18.5%</p>
              <p className="mt-1 text-[10px] text-white/55">
                Earnings Growth
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <Eye size={19} className="text-[#00D6A3]" />
              <p className="mt-4 text-2xl font-extrabold">1.2k</p>
              <p className="mt-1 text-[10px] text-white/55">
                Equipment Views
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.35 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#102B40]"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={21} />
                </div>

                {stat.trend === "up" ? (
                  <ArrowUpRight size={18} className="text-[#087F68] dark:text-[#00D6A3]" />
                ) : (
                  <Clock3 size={18} className="text-amber-500" />
                )}
              </div>

              <p className="mt-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>

              <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#071827] dark:text-white">
                {stat.value}
              </h3>

              <p className="mt-2 text-[11px] font-semibold text-slate-400">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* Requests and Activity */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
          <SectionTitle
            title="Recent Rental Requests"
            description="Keep track of your latest customer requests."
            href="/dashboard/owner/requests"
          />

          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-[#00D6A3]/40 sm:flex-row sm:items-center dark:border-white/10"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071827] text-xs font-bold text-white dark:bg-white/10">
                    {request.initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#071827] dark:text-white">
                      {request.customer}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      {request.equipment}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {request.period}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="text-sm font-extrabold text-[#071827] dark:text-white">
                    {request.amount}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${request.color}`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/owner/requests"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition hover:border-[#00D6A3] hover:text-[#087F68] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00D6A3]"
          >
            View All Rental Requests
            <ArrowRight size={15} />
          </Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
          <SectionTitle
            title="Recent Activity"
            description="What's happening in your workspace."
            href="/dashboard/owner/notifications"
          />

          <div className="space-y-6">
            {activity.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#071827] dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[10px] font-medium text-slate-400">
                      {item.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Top Equipment */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#102B40]">
        <SectionTitle
          title="Top Performing Equipment"
          description="Your most popular equipment based on rental activity."
          href="/dashboard/owner/equipment"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {topEquipment.map((equipment) => (
            <div
              key={equipment.name}
              className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:border-[#00D6A3]/40 hover:shadow-lg dark:border-white/10"
            >
              <div className="relative h-36 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#071827]/85 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {equipment.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="truncate text-sm font-extrabold text-[#071827] dark:text-white">
                  {equipment.name}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-slate-400">Bookings</p>
                    <p className="mt-1 text-sm font-bold text-[#071827] dark:text-white">
                      {equipment.bookings}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">Earnings</p>
                    <p className="mt-1 text-sm font-extrabold text-[#087F68] dark:text-[#00D6A3]">
                      {equipment.earnings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/owner/equipment"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#00D6A3] hover:shadow-lg dark:border-white/10 dark:bg-[#102B40]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
              <Plus size={22} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#071827] dark:text-white">
                List New Equipment
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Add equipment and start earning.
              </p>
            </div>
          </div>
          <ArrowUpRight size={19} className="text-slate-400 transition group-hover:text-[#00D6A3]" />
        </Link>

        <Link
          href="/dashboard/owner/earnings"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#00D6A3] hover:shadow-lg dark:border-white/10 dark:bg-[#102B40]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
              <Wallet size={22} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#071827] dark:text-white">
                View Earnings
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Track your income and transactions.
              </p>
            </div>
          </div>
          <ArrowDownRight size={19} className="text-slate-400 transition group-hover:text-[#00D6A3]" />
        </Link>
      </section>
    </div>
  );
}
