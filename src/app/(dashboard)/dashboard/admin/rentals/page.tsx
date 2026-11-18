
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  Filter,
  Package,
  Search,
  Trash2,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled";

type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

type Rental = {
  id: string;
  equipment: string;
  category: string;
  image: string;
  customer: string;
  customerEmail: string;
  owner: string;
  ownerEmail: string;
  startDate: string;
  endDate: string;
  bookingDate: string;
  quantity: number;
  duration: string;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  location: string;
};

const initialRentals: Rental[] = [
  {
    id: "BK-2026-001",
    equipment: "CAT 320 Excavator",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=85",
    customer: "James Wilson",
    customerEmail: "james@example.com",
    owner: "Robert Johnson",
    ownerEmail: "robert@example.com",
    startDate: "Nov 20, 2026",
    endDate: "Nov 25, 2026",
    bookingDate: "Nov 18, 2026",
    quantity: 1,
    duration: "5 days",
    totalAmount: 1250,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10001",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    location: "New York, USA",
  },
  {
    id: "BK-2026-002",
    equipment: "Canon EOS R5 Camera",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    customer: "Olivia Martin",
    customerEmail: "olivia@example.com",
    owner: "Emma Davis",
    ownerEmail: "emma@example.com",
    startDate: "Nov 19, 2026",
    endDate: "Nov 22, 2026",
    bookingDate: "Nov 17, 2026",
    quantity: 2,
    duration: "3 days",
    totalAmount: 510,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10002",
    paymentStatus: "Paid",
    bookingStatus: "Active",
    location: "London, UK",
  },
  {
    id: "BK-2026-003",
    equipment: "Honda Generator 7.5kW",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
    customer: "Ethan Taylor",
    customerEmail: "ethan@example.com",
    owner: "William Brown",
    ownerEmail: "william@example.com",
    startDate: "Nov 24, 2026",
    endDate: "Nov 26, 2026",
    bookingDate: "Nov 18, 2026",
    quantity: 1,
    duration: "2 days",
    totalAmount: 130,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10003",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
    location: "Chicago, USA",
  },
  {
    id: "BK-2026-004",
    equipment: "DJI Mavic 3 Drone",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=85",
    customer: "Sophia Anderson",
    customerEmail: "sophia@example.com",
    owner: "Sophia Chen",
    ownerEmail: "owner.sophia@example.com",
    startDate: "Nov 10, 2026",
    endDate: "Nov 12, 2026",
    bookingDate: "Nov 08, 2026",
    quantity: 1,
    duration: "2 days",
    totalAmount: 240,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10004",
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    location: "Toronto, Canada",
  },
  {
    id: "BK-2026-005",
    equipment: "John Deere Tractor",
    category: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    customer: "Noah Thompson",
    customerEmail: "noah@example.com",
    owner: "Daniel Brown",
    ownerEmail: "daniel@example.com",
    startDate: "Nov 21, 2026",
    endDate: "Nov 28, 2026",
    bookingDate: "Nov 18, 2026",
    quantity: 1,
    duration: "7 days",
    totalAmount: 1260,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10005",
    paymentStatus: "Failed",
    bookingStatus: "Cancelled",
    location: "Dallas, USA",
  },
  {
    id: "BK-2026-006",
    equipment: "Professional Sound System",
    category: "Event Equipment",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    customer: "Ava Johnson",
    customerEmail: "ava@example.com",
    owner: "Isabella Anderson",
    ownerEmail: "isabella@example.com",
    startDate: "Nov 23, 2026",
    endDate: "Nov 24, 2026",
    bookingDate: "Nov 17, 2026",
    quantity: 1,
    duration: "1 day",
    totalAmount: 95,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10006",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    location: "Lisbon, Portugal",
  },
  {
    id: "BK-2026-007",
    equipment: "Toyota Hiace Van",
    category: "Vehicles & Transportation",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85",
    customer: "Lucas Garcia",
    customerEmail: "lucas@example.com",
    owner: "Lucas Martin",
    ownerEmail: "owner.lucas@example.com",
    startDate: "Nov 26, 2026",
    endDate: "Nov 29, 2026",
    bookingDate: "Nov 19, 2026",
    quantity: 1,
    duration: "3 days",
    totalAmount: 420,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10007",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
    location: "Paris, France",
  },
  {
    id: "BK-2026-008",
    equipment: "JCB Backhoe Loader",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=85",
    customer: "Mason Lee",
    customerEmail: "mason@example.com",
    owner: "Noah Williams",
    ownerEmail: "noah@example.com",
    startDate: "Nov 12, 2026",
    endDate: "Nov 15, 2026",
    bookingDate: "Nov 10, 2026",
    quantity: 1,
    duration: "3 days",
    totalAmount: 630,
    paymentMethod: "Stripe",
    transactionId: "TXN-GU-10008",
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    location: "Manchester, UK",
  },
];

const PAGE_SIZE = 6;

const bookingStatuses: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Active",
  "Completed",
  "Cancelled",
];

function BookingBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Confirmed:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Active:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Completed:
      "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    Cancelled:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Refunded:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    Failed: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  const Icon =
    status === "Paid"
      ? CheckCircle2
      : status === "Failed"
        ? XCircle
        : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      <Icon size={11} />
      {status}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Package;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={21} />
        </div>
        <TrendingUp size={15} className="text-slate-300" />
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
    </div>
  );
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState(initialRentals);
  const [search, setSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [deletingRental, setDeletingRental] = useState<Rental | null>(null);
  const [statusRental, setStatusRental] = useState<Rental | null>(null);
  const [nextStatus, setNextStatus] = useState<BookingStatus>("Confirmed");

  const summary = useMemo(() => {
    const paid = rentals.filter(
      (rental) => rental.paymentStatus === "Paid",
    );

    return {
      total: rentals.length,
      active: rentals.filter(
        (rental) =>
          rental.bookingStatus === "Active" ||
          rental.bookingStatus === "Confirmed",
      ).length,
      pending: rentals.filter(
        (rental) => rental.bookingStatus === "Pending",
      ).length,
      revenue: paid.reduce(
        (total, rental) => total + rental.totalAmount,
        0,
      ),
    };
  }, [rentals]);

  const filteredRentals = useMemo(() => {
    return rentals.filter((rental) => {
      const value = search.toLowerCase();

      const matchesSearch =
        rental.id.toLowerCase().includes(value) ||
        rental.equipment.toLowerCase().includes(value) ||
        rental.customer.toLowerCase().includes(value) ||
        rental.owner.toLowerCase().includes(value) ||
        rental.location.toLowerCase().includes(value);

      const matchesBooking =
        bookingFilter === "All" ||
        rental.bookingStatus === bookingFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        rental.paymentStatus === paymentFilter;

      return matchesSearch && matchesBooking && matchesPayment;
    });
  }, [rentals, search, bookingFilter, paymentFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRentals.length / PAGE_SIZE),
  );

  const paginatedRentals = filteredRentals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateBookingStatus = () => {
    if (!statusRental) return;

    setRentals((current) =>
      current.map((rental) =>
        rental.id === statusRental.id
          ? { ...rental, bookingStatus: nextStatus }
          : rental,
      ),
    );

    toast.success(`Booking status updated to ${nextStatus}.`);
    setStatusRental(null);
    setSelectedRental(null);
  };

  const deleteRental = () => {
    if (!deletingRental) return;

    setRentals((current) =>
      current.filter((rental) => rental.id !== deletingRental.id),
    );

    toast.success("Rental record deleted.");
    setDeletingRental(null);
    setSelectedRental(null);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <CalendarDays size={15} />
            RENTAL OPERATIONS
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Rental Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor bookings, payment activity and rental progress.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <ShieldCheckIcon />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Admin Control Center
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Bookings"
          value={String(summary.total)}
          description="All rental records"
          icon={Package}
          color="bg-blue-500/10 text-blue-500"
        />
        <SummaryCard
          title="Active Rentals"
          value={String(summary.active)}
          description="Confirmed and ongoing"
          icon={CalendarDays}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <SummaryCard
          title="Pending Requests"
          value={String(summary.pending)}
          description="Awaiting owner action"
          icon={Clock3}
          color="bg-amber-500/10 text-amber-500"
        />
        <SummaryCard
          title="Collected Payments"
          value={`$${summary.revenue.toLocaleString("en-US")}`}
          description="Paid booking totals"
          icon={CreditCard}
          color="bg-brand-teal/10 text-brand-teal"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              All Rental Bookings
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              View customers, owners, rental periods and payment records.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search booking ID, equipment, customer or owner..."
                className={`${inputClass} pl-10`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="relative">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={bookingFilter}
                  onChange={(event) => {
                    setBookingFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pl-9 pr-8 sm:w-44`}
                >
                  <option value="All">All Bookings</option>
                  {bookingStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(event) => {
                    setPaymentFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pr-8 sm:w-40`}
                >
                  <option value="All">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Failed">Failed</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 dark:bg-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Booking</th>
                <th className="px-4 py-4 font-semibold">Customer</th>
                <th className="px-4 py-4 font-semibold">Owner</th>
                <th className="px-4 py-4 font-semibold">Rental Period</th>
                <th className="px-4 py-4 font-semibold">Amount</th>
                <th className="px-4 py-4 font-semibold">Payment</th>
                <th className="px-4 py-4 font-semibold">Booking Status</th>
                <th className="px-4 py-4 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRentals.map((rental, index) => (
                <motion.tr
                  key={rental.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-t border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={rental.image}
                        alt={rental.equipment}
                        width={56}
                        height={48}
                        unoptimized
                        className="h-12 w-14 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-white">
                          {rental.equipment}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {rental.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {rental.customer}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {rental.customerEmail}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {rental.owner}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {rental.ownerEmail}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="whitespace-nowrap text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {rental.startDate}
                    </p>
                    <p className="mt-1 whitespace-nowrap text-[10px] text-slate-400">
                      to {rental.endDate}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      ${rental.totalAmount.toLocaleString("en-US")}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {rental.quantity} item(s)
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <PaymentBadge status={rental.paymentStatus} />
                  </td>
                  <td className="px-4 py-4">
                    <BookingBadge status={rental.bookingStatus} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="View booking details"
                        onClick={() => setSelectedRental(rental)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        title="Delete booking record"
                        onClick={() => setDeletingRental(rental)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedRentals.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <CalendarDays size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
              No rental records found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredRentals.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -
              {Math.min(currentPage * PAGE_SIZE, filteredRentals.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredRentals.length}
            </span>{" "}
            bookings
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-16 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {selectedRental && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rental-details-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-brand-teal">
                  RENTAL DETAILS
                </p>
                <h2
                  id="rental-details-title"
                  className="mt-1 font-bold text-slate-900 dark:text-white"
                >
                  {selectedRental.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRental(null)}
                aria-label="Close rental details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedRental.image}
                  alt={selectedRental.equipment}
                  width={100}
                  height={84}
                  unoptimized
                  className="h-20 w-24 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {selectedRental.equipment}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedRental.category}
                  </p>
                  <p className="mt-2 text-lg font-bold text-brand-teal">
                    ${selectedRental.totalAmount.toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <BookingBadge status={selectedRental.bookingStatus} />
                <PaymentBadge status={selectedRental.paymentStatus} />
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                {[
                  ["Customer", selectedRental.customer],
                  ["Customer Email", selectedRental.customerEmail],
                  ["Equipment Owner", selectedRental.owner],
                  ["Owner Email", selectedRental.ownerEmail],
                  ["Rental Start", selectedRental.startDate],
                  ["Rental End", selectedRental.endDate],
                  ["Booking Date", selectedRental.bookingDate],
                  ["Duration", selectedRental.duration],
                  ["Quantity", String(selectedRental.quantity)],
                  ["Location", selectedRental.location],
                  ["Payment Method", selectedRental.paymentMethod],
                  ["Transaction ID", selectedRental.transactionId],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <p className="text-[10px] text-slate-400">{label}</p>
                    <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Update Booking Status
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <select
                    value={selectedRental.bookingStatus}
                    onChange={(event) => {
                      setNextStatus(event.target.value as BookingStatus);
                      setStatusRental(selectedRental);
                    }}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700 outline-none focus:border-brand-teal dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {bookingStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        selectedRental.bookingStatus === nextStatus
                      ) {
                        toast.info("Choose a different booking status.");
                        return;
                      }
                      setStatusRental(selectedRental);
                    }}
                    className="rounded-xl bg-brand-teal px-5 py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
                  >
                    Update Status
                  </button>
                </div>
                <p className="mt-2 text-[10px] leading-5 text-slate-400">
                  Status changes here are demo-only. In production, booking
                  transitions will be validated by the backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {statusRental && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-confirm-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <CheckCircle2 size={22} />
            </div>
            <h2
              id="status-confirm-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Confirm Status Change
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Change booking{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                {statusRental.id}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-brand-teal">
                {nextStatus}
              </span>
              ?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStatusRental(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateBookingStatus}
                className="flex-1 rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingRental && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-rental-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-rental-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Delete Rental Record?
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Delete booking{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                {deletingRental.id}
              </span>
              ? This demo action removes the record from the current page.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingRental(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteRental}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
      <CheckCircle2 size={17} />
    </span>
  );
}
