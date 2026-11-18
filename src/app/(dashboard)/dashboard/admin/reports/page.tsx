
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", revenue: 12400, bookings: 82 },
  { month: "Feb", revenue: 15800, bookings: 104 },
  { month: "Mar", revenue: 14200, bookings: 96 },
  { month: "Apr", revenue: 18600, bookings: 128 },
  { month: "May", revenue: 22400, bookings: 156 },
  { month: "Jun", revenue: 19800, bookings: 139 },
  { month: "Jul", revenue: 26200, bookings: 184 },
  { month: "Aug", revenue: 24800, bookings: 171 },
  { month: "Sep", revenue: 29400, bookings: 205 },
  { month: "Oct", revenue: 32600, bookings: 228 },
  { month: "Nov", revenue: 38400, bookings: 267 },
];

const bookingStatusData = [
  { name: "Completed", value: 48, color: "#00D6A3" },
  { name: "Active", value: 22, color: "#3B82F6" },
  { name: "Confirmed", value: 16, color: "#8B5CF6" },
  { name: "Pending", value: 9, color: "#F59E0B" },
  { name: "Cancelled", value: 5, color: "#EF4444" },
];

const categoryData = [
  { category: "Construction", rentals: 385 },
  { category: "Photography", rentals: 264 },
  { category: "Vehicles", rentals: 218 },
  { category: "Agriculture", rentals: 176 },
  { category: "Electronics", rentals: 143 },
  { category: "Events", rentals: 112 },
];

const topEquipment = [
  {
    rank: 1,
    name: "CAT 320 Excavator",
    category: "Construction",
    rentals: 48,
    revenue: 18400,
    rating: 4.9,
  },
  {
    rank: 2,
    name: "Canon EOS R5 Camera",
    category: "Photography",
    rentals: 42,
    revenue: 12600,
    rating: 4.9,
  },
  {
    rank: 3,
    name: "Honda Generator 7.5kW",
    category: "Electronics",
    rentals: 36,
    revenue: 10800,
    rating: 4.8,
  },
  {
    rank: 4,
    name: "John Deere Tractor",
    category: "Agriculture",
    rentals: 31,
    revenue: 15500,
    rating: 4.8,
  },
  {
    rank: 5,
    name: "DJI Mavic 3 Drone",
    category: "Photography",
    rentals: 28,
    revenue: 8400,
    rating: 4.7,
  },
];

const topOwners = [
  {
    name: "Robert Johnson",
    initials: "RJ",
    equipment: 12,
    rentals: 86,
    revenue: 28400,
  },
  {
    name: "Emma Davis",
    initials: "ED",
    equipment: 9,
    rentals: 72,
    revenue: 24600,
  },
  {
    name: "William Brown",
    initials: "WB",
    equipment: 8,
    rentals: 64,
    revenue: 21800,
  },
  {
    name: "Sophia Chen",
    initials: "SC",
    equipment: 7,
    rentals: 51,
    revenue: 18600,
  },
];

const userGrowthData = [
  { month: "Jan", customers: 42, owners: 12 },
  { month: "Feb", customers: 58, owners: 18 },
  { month: "Mar", customers: 51, owners: 15 },
  { month: "Apr", customers: 76, owners: 22 },
  { month: "May", customers: 91, owners: 28 },
  { month: "Jun", customers: 84, owners: 25 },
  { month: "Jul", customers: 112, owners: 35 },
  { month: "Aug", customers: 126, owners: 39 },
  { month: "Sep", customers: 118, owners: 34 },
  { month: "Oct", customers: 145, owners: 46 },
  { month: "Nov", customers: 168, owners: 52 },
];

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: typeof Wallet;
  positive: boolean;
  color: string;
};

function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon size={21} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
            positive
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {change}
        </span>
      </div>
      <p className="mt-5 text-xs font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </h3>
      <p className="mt-1 text-[10px] text-slate-400">{description}</p>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 text-xs font-bold text-slate-800 dark:text-white">
        {label}
      </p>
      {payload.map((item) => (
        <p
          key={item.name}
          className="text-xs text-slate-500 dark:text-slate-300"
        >
          {item.name}:{" "}
          <strong style={{ color: item.color }}>
            {item.name.toLowerCase().includes("revenue")
              ? `$${item.value.toLocaleString()}`
              : item.value.toLocaleString()}
          </strong>
        </p>
      ))}
    </div>
  );
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("12 months");
  const [chartMetric, setChartMetric] = useState("revenue");

  const visibleRevenueData = useMemo(() => {
    if (period === "7 days") return revenueData.slice(-2);
    if (period === "30 days") return revenueData.slice(-2);
    if (period === "90 days") return revenueData.slice(-3);
    return revenueData;
  }, [period]);

  const visibleGrowthData = useMemo(() => {
    if (period === "7 days" || period === "30 days") {
      return userGrowthData.slice(-2);
    }
    if (period === "90 days") return userGrowthData.slice(-3);
    return userGrowthData;
  }, [period]);

  const handleExport = () => {
    const rows = [
      ["Equipment Rental Platform - GearUp Analytics"],
      ["Report Period", period],
      ["Generated", new Date().toLocaleDateString()],
      [],
      ["Month", "Revenue (USD)", "Bookings"],
      ...visibleRevenueData.map((item) => [
        item.month,
        item.revenue,
        item.bookings,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");
            return `"${text.replace(/"/g, '""')}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "gearup-analytics-report.csv";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Analytics report exported successfully.");
  };

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <Activity size={15} />
            BUSINESS INTELLIGENCE
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Understand platform performance and make data-driven decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-9 text-xs font-semibold text-slate-700 outline-none focus:border-brand-teal dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>12 months</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$248,650"
          change="+18.4%"
          description="Compared to previous period"
          icon={Wallet}
          positive
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Total Bookings"
          value="1,284"
          change="+12.8%"
          description="Rental bookings across platform"
          icon={ShoppingCart}
          positive
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Registered Users"
          value="3,842"
          change="+24.6%"
          description="Customers and equipment owners"
          icon={Users}
          positive
          color="bg-violet-500/10 text-violet-500"
        />
        <StatCard
          title="Listed Equipment"
          value="1,056"
          change="+8.2%"
          description="Approved marketplace listings"
          icon={Package}
          positive
          color="bg-amber-500/10 text-amber-500"
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <SectionHeader
          title="Revenue Overview"
          description="Track platform revenue and booking performance over time."
          action={
            <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setChartMetric("revenue")}
                className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                  chartMetric === "revenue"
                    ? "bg-white text-brand-green shadow-sm dark:bg-slate-700 dark:text-brand-teal"
                    : "text-slate-500"
                }`}
              >
                Revenue
              </button>
              <button
                type="button"
                onClick={() => setChartMetric("bookings")}
                className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                  chartMetric === "bookings"
                    ? "bg-white text-brand-green shadow-sm dark:bg-slate-700 dark:text-brand-teal"
                    : "text-slate-500"
                }`}
              >
                Bookings
              </button>
            </div>
          }
        />

        <div className="mb-5 flex flex-wrap items-center gap-6">
          <div>
            <p className="text-[10px] text-slate-400">
              {chartMetric === "revenue"
                ? "Total Revenue"
                : "Total Bookings"}
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {chartMetric === "revenue"
                ? "$248,650"
                : "1,284"}
            </p>
          </div>
          <div className="h-9 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <p className="text-[10px] text-slate-400">Growth</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-500">
              <TrendingUp size={15} />
              +18.4%
            </p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visibleRevenueData}
              margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D6A3" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#00D6A3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                opacity={0.1}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                tickFormatter={(value: number) =>
                  chartMetric === "revenue"
                    ? `$${value / 1000}k`
                    : String(value)
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey={chartMetric}
                name={chartMetric === "revenue" ? "Revenue" : "Bookings"}
                stroke={chartMetric === "revenue" ? "#00D6A3" : "#3B82F6"}
                strokeWidth={2.5}
                fill={
                  chartMetric === "revenue"
                    ? "url(#revenueGradient)"
                    : "url(#bookingGradient)"
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeader
            title="Booking Status"
            description="Distribution of rental booking statuses."
          />

          <div className="grid items-center gap-2 sm:grid-cols-2">
            <div className="h-[230px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {bookingStatusData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {bookingStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <SectionHeader
            title="Category Performance"
            description="Rental activity across equipment categories."
          />

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="currentColor"
                  opacity={0.1}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  width={92}
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                />
                <Tooltip />
                <Bar
                  dataKey="rentals"
                  name="Rentals"
                  fill="#00D6A3"
                  radius={[0, 6, 6, 0]}
                  barSize={17}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <SectionHeader
          title="User Growth"
          description="Monthly customer and owner registrations."
        />

        <div className="mb-4 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Customers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Owners
            </span>
          </div>
        </div>

        <div className="h-[270px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visibleGrowthData}
              margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
            >
              <defs>
                <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D6A3" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00D6A3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ownerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                opacity={0.1}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94A3B8" }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="customers"
                name="Customers"
                stroke="#00D6A3"
                strokeWidth={2.5}
                fill="url(#customerGradient)"
              />
              <Area
                type="monotone"
                dataKey="owners"
                name="Owners"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fill="url(#ownerGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 sm:p-6">
            <SectionHeader
              title="Top Performing Equipment"
              description="Most rented equipment on GearUp."
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3">Equipment</th>
                  <th className="px-4 py-3">Rentals</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-5 py-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {topEquipment.map((item) => (
                  <tr key={item.rank}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
                          {item.rank}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {item.rentals}
                    </td>
                    <td className="px-4 py-4 text-xs font-bold text-slate-800 dark:text-white">
                      ${item.revenue.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <Star
                          size={12}
                          className="fill-amber-400 text-amber-400"
                        />
                        {item.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="p-5 sm:p-6">
            <SectionHeader
              title="Top Performing Owners"
              description="Owners contributing to marketplace growth."
            />
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topOwners.map((owner, index) => (
              <div
                key={owner.name}
                className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-xs font-bold text-brand-teal">
                    {owner.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                      {owner.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {owner.equipment} listings · {owner.rentals} rentals
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    ${owner.revenue.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    #{index + 1} performer
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-brand-teal/20 bg-gradient-to-r from-brand-navy to-[#102B40] p-5 text-white sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-brand-teal">
              <FileSpreadsheet size={18} />
              <span className="text-[10px] font-bold tracking-widest">
                REPORT CENTER
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold">
              Need a copy of your analytics?
            </h2>
            <p className="mt-2 max-w-lg text-xs leading-6 text-slate-300">
              Export the revenue and booking summary to review your marketplace
              performance outside GearUp.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
            >
              <FileSpreadsheet size={15} />
              Download CSV
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              <FileText size={15} />
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
