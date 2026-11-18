
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

type TransactionStatus = "Completed" | "Pending" | "Failed";

type Transaction = {
  id: string;
  customer: string;
  email: string;
  equipment: string;
  date: string;
  amount: number;
  method: string;
  status: TransactionStatus;
  transactionId: string;
};

const earningsData = [
  { month: "May", earnings: 3200 },
  { month: "Jun", earnings: 4500 },
  { month: "Jul", earnings: 3800 },
  { month: "Aug", earnings: 6200 },
  { month: "Sep", earnings: 5100 },
  { month: "Oct", earnings: 7800 },
  { month: "Nov", earnings: 9200 },
];

const transactions: Transaction[] = [
  {
    id: "1",
    customer: "Michael Anderson",
    email: "michael@example.com",
    equipment: "CAT Hydraulic Excavator",
    date: "2026-11-18",
    amount: 12500,
    method: "Stripe •••• 4242",
    status: "Completed",
    transactionId: "TXN-GU-20261118001",
  },
  {
    id: "2",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    equipment: "Canon EOS R5 Camera",
    date: "2026-11-17",
    amount: 4500,
    method: "Stripe •••• 8210",
    status: "Pending",
    transactionId: "TXN-GU-20261117002",
  },
  {
    id: "3",
    customer: "David Miller",
    email: "david@example.com",
    equipment: "Industrial Generator",
    date: "2026-11-15",
    amount: 8500,
    method: "Stripe •••• 4242",
    status: "Completed",
    transactionId: "TXN-GU-20261115003",
  },
  {
    id: "4",
    customer: "Emily Davis",
    email: "emily@example.com",
    equipment: "Agricultural Tractor",
    date: "2026-11-12",
    amount: 18000,
    method: "Stripe •••• 9012",
    status: "Failed",
    transactionId: "TXN-GU-20261112004",
  },
  {
    id: "5",
    customer: "James Wilson",
    email: "james@example.com",
    equipment: "Professional DSLR Camera",
    date: "2026-11-10",
    amount: 3200,
    method: "Stripe •••• 4242",
    status: "Completed",
    transactionId: "TXN-GU-20261110005",
  },
  {
    id: "6",
    customer: "Olivia Brown",
    email: "olivia@example.com",
    equipment: "Heavy Duty Generator",
    date: "2026-10-28",
    amount: 6800,
    method: "Stripe •••• 8210",
    status: "Completed",
    transactionId: "TXN-GU-20261028006",
  },
  {
    id: "7",
    customer: "Daniel Taylor",
    email: "daniel@example.com",
    equipment: "CAT Hydraulic Excavator",
    date: "2026-10-20",
    amount: 15000,
    method: "Stripe •••• 4242",
    status: "Pending",
    transactionId: "TXN-GU-20261020007",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const statusStyles: Record<TransactionStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-rose-50 text-rose-700",
};

export default function OwnerEarningsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [period, setPeriod] = useState("30");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    const now = new Date("2026-11-19T23:59:59");
    const days = Number(period);

    return transactions.filter((transaction) => {
      const matchesStatus =
        activeFilter === "All" || transaction.status === activeFilter;

      const matchesSearch =
        transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

      const transactionDate = new Date(`${transaction.date}T00:00:00`);
      const matchesPeriod =
        period === "all" ||
        transactionDate >=
          new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

      return matchesStatus && matchesSearch && matchesPeriod;
    });
  }, [activeFilter, searchQuery, period]);

  const stats = [
    {
      label: "Total Earnings",
      value: "$48,250",
      change: "+12.8%",
      description: "Compared to last month",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
      positive: true,
    },
    {
      label: "Available Balance",
      value: "$12,850",
      change: "Ready to withdraw",
      description: "Available for payout",
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
      positive: true,
    },
    {
      label: "Pending Payments",
      value: "$4,500",
      change: "2 transactions",
      description: "Awaiting confirmation",
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
      positive: false,
    },
    {
      label: "This Month",
      value: "$9,200",
      change: "+18.5%",
      description: "Compared to October",
      icon: TrendingUp,
      color: "bg-violet-50 text-violet-600",
      positive: true,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <p className="mb-2 text-sm font-medium text-brand-teal">
            Financial Overview
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Earnings & Transactions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track your rental income and manage your payment history.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal"
        >
          <ArrowDownToLine size={17} />
          Export Report
        </button>
      </motion.div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>
                <span
                  className={`text-xs font-semibold ${
                    stat.positive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.label}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-brand-navy">
                {stat.value}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart and Balance */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Earnings Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your rental income over the last 7 months
              </p>
            </div>
            <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              +18.5% growth
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={earningsData}
                margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#00D6A3"
                      stopOpacity={0.28}
                    />
                    <stop
                      offset="95%"
                      stopColor="#00D6A3"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#E9EEF2"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickFormatter={(value: number) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    "Earnings",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 8px 24px rgba(7,24,39,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#00B98B"
                  strokeWidth={3}
                  fill="url(#earningsGradient)"
                  activeDot={{ r: 6, fill: "#00B98B", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#102B40] to-[#087F68] p-6 text-white shadow-lg">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Wallet size={22} className="text-brand-teal" />
            </div>

            <p className="mt-7 text-sm font-medium text-white/70">
              Available for Withdrawal
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              $12,850.00
            </h2>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-300">
              <ArrowUpRight size={17} />
              Your balance is ready
            </div>

            <div className="my-7 h-px bg-white/15" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/65">Next payout</span>
              <span className="font-semibold">Nov 25, 2026</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-white/65">Payout method</span>
              <span className="font-semibold">Bank Account</span>
            </div>

            <button
              type="button"
              disabled
              className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 py-3 text-sm font-bold text-brand-navy opacity-80"
            >
              <ArrowDownLeft size={17} />
              Withdraw Funds
            </button>
            <p className="mt-3 text-center text-xs text-white/50">
              Payout integration coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Recent Transactions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review your rental payment history.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search transactions..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 sm:w-56"
                />
              </div>

              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-brand-teal sm:w-auto"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="all">All time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Filter size={15} className="mr-1 text-slate-400" />
            {["All", "Completed", "Pending", "Failed"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Equipment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-brand-navy">
                      {transaction.customer}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="max-w-48 truncate text-sm font-medium text-slate-600">
                      {transaction.equipment}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.transactionId}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-brand-navy">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[transaction.status]}`}
                    >
                      {transaction.status === "Completed" ? (
                        <CheckCircle2 size={13} />
                      ) : transaction.status === "Pending" ? (
                        <Clock3 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTransaction(transaction)}
                      aria-label={`View transaction ${transaction.transactionId}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-brand-teal"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Transaction Cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-brand-navy">
                    {transaction.customer}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {transaction.equipment}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[transaction.status]}`}
                >
                  {transaction.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-brand-navy">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTransaction(transaction)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-brand-navy hover:bg-emerald-50 hover:text-brand-teal"
                >
                  <Eye size={14} />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <CreditCard size={22} />
            </div>
            <h3 className="mt-4 font-semibold text-brand-navy">
              No transactions found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-6">
          <span>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </span>
          <span>Demo transaction data</span>
        </div>
      </section>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTransaction(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold text-brand-navy">
                  Transaction Details
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Complete payment information
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                aria-label="Close transaction details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-navy"
              >
                <X size={19} />
              </button>
            </div>

            <div className="my-6 rounded-xl bg-slate-50 p-5 text-center">
              <p className="text-sm text-slate-500">Transaction Amount</p>
              <p className="mt-2 text-3xl font-bold text-brand-navy">
                {formatCurrency(selectedTransaction.amount)}
              </p>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedTransaction.status]}`}
              >
                {selectedTransaction.status}
              </span>
            </div>

            <div className="space-y-4">
              {[
                ["Transaction ID", selectedTransaction.transactionId],
                ["Customer", selectedTransaction.customer],
                ["Email", selectedTransaction.email],
                ["Equipment", selectedTransaction.equipment],
                ["Payment Date", formatDate(selectedTransaction.date)],
                ["Payment Method", selectedTransaction.method],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col justify-between gap-1 border-b border-slate-100 pb-3 text-sm sm:flex-row sm:gap-4"
                >
                  <span className="text-slate-400">{label}</span>
                  <span className="break-all font-semibold text-brand-navy sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedTransaction(null)}
              className="mt-6 w-full rounded-xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-teal hover:text-brand-navy"
            >
              Close Details
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
