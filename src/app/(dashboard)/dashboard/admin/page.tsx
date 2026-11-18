"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Package,
  ShieldCheck,
  ShoppingBag,
  Users,
  UserRound,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";

const revenueData = [
  { month: "May", revenue: 12400 },
  { month: "Jun", revenue: 15800 },
  { month: "Jul", revenue: 14200 },
  { month: "Aug", revenue: 19600 },
  { month: "Sep", revenue: 22100 },
  { month: "Oct", revenue: 25800 },
  { month: "Nov", revenue: 29400 },
];

const bookingData = [
  { label: "Completed", count: 124, color: "bg-emerald-500" },
  { label: "Active", count: 48, color: "bg-blue-500" },
  { label: "Pending", count: 32, color: "bg-amber-500" },
  { label: "Cancelled", count: 16, color: "bg-red-500" },
];

const recentUsers = [
  {
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "Owner",
    date: "Nov 19, 2026",
    initials: "OM",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "James Wilson",
    email: "james@example.com",
    role: "Customer",
    date: "Nov 18, 2026",
    initials: "JW",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Sophia Chen",
    email: "sophia@example.com",
    role: "Owner",
    date: "Nov 18, 2026",
    initials: "SC",
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Noah Williams",
    email: "noah@example.com",
    role: "Customer",
    date: "Nov 17, 2026",
    initials: "NW",
    color: "bg-amber-100 text-amber-700",
  },
];

const pendingEquipment = [
  {
    name: "CAT 320 Excavator",
    category: "Construction",
    owner: "Robert Johnson",
    price: "$250/day",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Canon EOS R5",
    category: "Photography",
    owner: "Emma Davis",
    price: "$85/day",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "John Deere Tractor",
    category: "Agriculture",
    owner: "Daniel Brown",
    price: "$180/day",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85",
  },
];

const recentActivities = [
  {
    title: "New booking completed",
    description: "Booking #BK-1084 was marked as completed.",
    time: "12 minutes ago",
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "New owner registered",
    description: "Olivia Martinez joined as an equipment owner.",
    time: "35 minutes ago",
    icon: UserRound,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    title: "Equipment awaiting review",
    description: "CAT 320 Excavator needs admin approval.",
    time: "1 hour ago",
    icon: Package,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    title: "Payment received",
    description: "A payment of $450 was successfully processed.",
    time: "2 hours ago",
    icon: Wallet,
    color: "text-purple-500 bg-purple-500/10",
  },
];

const stats = [
  {
    title: "Total Users",
    value: "2,840",
    change: "+12.8%",
    description: "vs. last month",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500",
    positive: true,
  },
  {
    title: "Total Equipment",
    value: "684",
    change: "+8.4%",
    description: "vs. last month",
    icon: Package,
    color: "bg-purple-500/10 text-purple-500",
    positive: true,
  },
  {
    title: "Total Bookings",
    value: "220",
    change: "+18.2%",
    description: "vs. last month",
    icon: ShoppingBag,
    color: "bg-brand-teal/10 text-brand-teal",
    positive: true,
  },
  {
    title: "Total Revenue",
    value: "$29,400",
    change: "+14.6%",
    description: "vs. last month",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-500",
    positive: true,
  },
];

function SectionHeading({
  title,
  description,
  href,
  linkText = "View all",
}: {
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-brand-teal transition hover:gap-2"
        >
          {linkText}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/20"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
        >
          <Icon size={21} />
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <ArrowUpRight size={13} />
          {stat.change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {stat.title}
      </p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {stat.value}
      </h3>
      <p className="mt-1 text-[11px] text-slate-400">{stat.description}</p>
    </motion.div>
  );
}

export default function AdminOverviewPage() {
  const totalBookings = bookingData.reduce(
    (total, item) => total + item.count,
    0,
  );

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-blue to-brand-green p-6 text-white sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-brand-teal/10 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <ShieldCheck size={16} />
            ADMIN CONTROL CENTER
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome to GearUp Admin
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Monitor your marketplace, manage users and equipment, and keep every
            rental operation running smoothly.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/admin/equipment"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-white"
            >
              Review Equipment
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              Manage Users
              <Users size={15} />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-7 flex flex-wrap items-center gap-5 border-t border-white/10 pt-5 text-xs text-slate-300 sm:mt-8">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Marketplace overview
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays size={14} />
            November 19, 2026
          </span>
          <span className="flex items-center gap-2">
            <Activity size={14} />
            Admin workspace
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeading
            title="Revenue Overview"
            description="Monthly marketplace revenue performance"
          />

          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revenue this month
              </p>
              <h3 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                $29,400
              </h3>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
              <ArrowUpRight size={15} />
              14.6% growth
            </span>
          </div>

          <div className="mt-6 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#00D6A3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D6A3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#94a3b8"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickFormatter={(value: number) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toLocaleString("en-US")}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00B88A"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  activeDot={{ r: 5, fill: "#00D6A3" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeading
            title="Booking Overview"
            description="Current rental booking distribution"
            href="/dashboard/admin/rentals"
          />

          <div className="mt-7 flex items-center justify-center">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full">
              <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="19"
                />
                {
                  bookingData.reduce(
                    (segments, item, index) => {
                      const circumference = 2 * Math.PI * 76;
                      const previous = segments.offset;
                      const length =
                        (item.count / totalBookings) * circumference;
                      const colors = [
                        "#10b981",
                        "#3b82f6",
                        "#f59e0b",
                        "#ef4444",
                      ];

                      segments.items.push(
                        <circle
                          key={item.label}
                          cx="100"
                          cy="100"
                          r="76"
                          fill="none"
                          stroke={colors[index]}
                          strokeWidth="19"
                          strokeDasharray={`${length} ${circumference - length}`}
                          strokeDashoffset={-previous}
                          strokeLinecap="round"
                        />,
                      );

                      segments.offset += length;
                      return segments;
                    },
                    { offset: 0, items: [] as React.ReactNode[] },
                  ).items
                }
              </svg>

              <div className="absolute text-center">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {totalBookings}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Total bookings
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {bookingData.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 sm:p-6">
            <SectionHeading
              title="Recent Users"
              description="Latest members who joined GearUp"
              href="/dashboard/admin/users"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400 dark:bg-slate-800/60">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.email}
                    className="border-t border-slate-100 dark:border-slate-800"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${user.color}`}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-white">
                            {user.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          user.role === "Owner"
                            ? "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[11px] text-slate-500 dark:text-slate-400">
                      {user.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeading
            title="Recent Activities"
            description="Latest marketplace events"
            href="/dashboard/admin/notifications"
          />

          <div className="mt-5 space-y-5">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={activity.title} className="flex gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="p-5 sm:p-6">
          <SectionHeading
            title="Pending Equipment Approvals"
            description="Review equipment submitted by owners before publishing."
            href="/dashboard/admin/equipment"
            linkText="Manage equipment"
          />
        </div>

        <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:px-6 xl:grid-cols-3">
          {pendingEquipment.map((equipment) => (
            <div
              key={equipment.name}
              className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  width={800}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                  <Clock3 size={11} />
                  Pending
                </span>
              </div>

              <div className="p-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {equipment.name}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {equipment.category} · {equipment.owner}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-brand-teal">
                    {equipment.price}
                  </span>
                  <Link
                    href="/dashboard/admin/equipment"
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 transition hover:text-brand-teal dark:text-slate-300"
                  >
                    Review
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/admin/users"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-teal/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Users size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              User Management
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Manage member roles
            </p>
          </div>
          <ArrowRight
            size={17}
            className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-teal"
          />
        </Link>

        <Link
          href="/dashboard/admin/equipment"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-teal/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
            <Package size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Equipment Review
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Approve owner listings
            </p>
          </div>
          <ArrowRight
            size={17}
            className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-teal"
          />
        </Link>

        <Link
          href="/dashboard/admin/rentals"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-teal/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <ShoppingBag size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Rental Management
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Monitor all bookings
            </p>
          </div>
          <ArrowRight
            size={17}
            className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-teal"
          />
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-teal/20 bg-brand-teal/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
            <BadgeCheck size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">
              Platform Commission
            </p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Current configured commission rate
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-brand-teal">10%</p>
      </div>
    </div>
  );
}
