"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Package,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled";

type PaymentStatus = "Paid" | "Pending" | "Refunded";

type RentalRequest = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  equipment: string;
  image: string;
  category: string;
  startDate: string;
  endDate: string;
  bookingDate: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  address: string;
  notes: string;
};

const initialRequests: RentalRequest[] = [
  {
    id: "REQ-2026-001",
    customer: "Michael Anderson",
    email: "michael@example.com",
    phone: "+1 202 555 0142",
    equipment: "CAT 320 Excavator",
    image: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=500",
    category: "Construction",
    startDate: "2026-11-21",
    endDate: "2026-11-25",
    bookingDate: "2026-11-18",
    quantity: 1,
    totalAmount: 1200,
    paymentStatus: "Paid",
    bookingStatus: "Pending",
    address: "125 Industrial Road, Austin, Texas",
    notes: "Delivery required before 8:00 AM.",
  },
  {
    id: "REQ-2026-002",
    customer: "Sophia Williams",
    email: "sophia@example.com",
    phone: "+1 202 555 0178",
    equipment: "Canon EOS R5 Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Photography",
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    bookingDate: "2026-11-17",
    quantity: 2,
    totalAmount: 360,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    address: "48 Lake View Avenue, Austin, Texas",
    notes: "Please include two extra batteries.",
  },
  {
    id: "REQ-2026-003",
    customer: "James Rodriguez",
    email: "james@example.com",
    phone: "+1 202 555 0195",
    equipment: "Industrial Generator",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500",
    category: "Electronics",
    startDate: "2026-11-19",
    endDate: "2026-11-23",
    bookingDate: "2026-11-16",
    quantity: 1,
    totalAmount: 480,
    paymentStatus: "Paid",
    bookingStatus: "Active",
    address: "22 Commerce Street, Austin, Texas",
    notes: "Used for a temporary construction site.",
  },
  {
    id: "REQ-2026-004",
    customer: "Emily Carter",
    email: "emily@example.com",
    phone: "+1 202 555 0136",
    equipment: "Agricultural Tractor",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500",
    category: "Agriculture",
    startDate: "2026-11-24",
    endDate: "2026-11-28",
    bookingDate: "2026-11-15",
    quantity: 1,
    totalAmount: 750,
    paymentStatus: "Pending",
    bookingStatus: "Pending",
    address: "90 Farm Road, Austin, Texas",
    notes: "Customer will collect the equipment.",
  },
  {
    id: "REQ-2026-005",
    customer: "Daniel Brown",
    email: "daniel@example.com",
    phone: "+1 202 555 0164",
    equipment: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    category: "Photography",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    bookingDate: "2026-11-08",
    quantity: 1,
    totalAmount: 180,
    paymentStatus: "Paid",
    bookingStatus: "Completed",
    address: "16 West Avenue, Austin, Texas",
    notes: "Everything went smoothly.",
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }: { status: BookingStatus | PaymentStatus }) {
  const styles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    Confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Completed: "bg-slate-100 text-slate-600 ring-slate-200",
    Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Refunded: "bg-purple-50 text-purple-700 ring-purple-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function OwnerRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(
    null,
  );
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    action: "accept" | "decline";
  } | null>(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesFilter =
        activeFilter === "All" || request.bookingStatus === activeFilter;

      const search = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !search ||
        request.customer.toLowerCase().includes(search) ||
        request.equipment.toLowerCase().includes(search) ||
        request.id.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [requests, activeFilter, searchQuery]);

  const pendingCount = requests.filter(
    (request) => request.bookingStatus === "Pending",
  ).length;

  const activeCount = requests.filter(
    (request) => request.bookingStatus === "Active",
  ).length;

  const confirmedCount = requests.filter(
    (request) => request.bookingStatus === "Confirmed",
  ).length;

  const totalRevenue = requests
    .filter((request) => request.paymentStatus === "Paid")
    .reduce((total, request) => total + request.totalAmount, 0);

  function updateRequestStatus(id: string, action: "accept" | "decline") {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              bookingStatus: action === "accept" ? "Confirmed" : "Cancelled",
            }
          : request,
      ),
    );

    setConfirmAction(null);

    toast.success(
      action === "accept"
        ? "Rental request accepted successfully."
        : "Rental request declined.",
    );
  }

  return (
    <div className="space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold text-brand-teal">
            RENTAL MANAGEMENT
          </p>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">
            Rental Requests
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review and manage rental requests from your customers.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <Package size={17} className="text-brand-teal" />
          <span>{requests.length} total requests</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Requests",
            value: requests.length,
            icon: Package,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Pending Requests",
            value: pendingCount,
            icon: Clock3,
            color: "bg-amber-50 text-amber-600",
          },
          {
            label: "Confirmed Bookings",
            value: confirmedCount,
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Active Rentals",
            value: activeCount,
            icon: CalendarDays,
            color: "bg-purple-50 text-purple-600",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-brand-navy">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy">
              All Rental Requests
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Search requests and review their current status.
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search customer, equipment..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-brand-teal focus:bg-white focus:ring-2 focus:ring-brand-teal/10"
            />
          </div>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeFilter === filter
                  ? "bg-brand-navy text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
              {filter === "Pending" && pendingCount > 0 && (
                <span className="ml-2 rounded-full bg-white/20 px-1.5 py-0.5">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-slate-400">
              <Package size={30} />
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-navy">
              No requests found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Try changing your search or selecting another booking status.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-4 text-sm font-semibold text-brand-teal hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-brand-teal/40 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={request.image}
                        alt={request.equipment}
                        width={160}
                        height={128}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-brand-navy">
                        {request.equipment}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {request.category} · {request.id}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {request.customer}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm sm:grid-cols-3 xl:w-[390px]">
                    <div>
                      <p className="text-xs text-slate-400">Rental period</p>
                      <p className="mt-1 font-medium text-slate-700">
                        {formatDate(request.startDate)}
                      </p>
                      <p className="text-xs text-slate-500">
                        to {formatDate(request.endDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Total amount</p>
                      <p className="mt-1 font-bold text-brand-navy">
                        {formatCurrency(request.totalAmount)}
                      </p>
                      <p className="text-xs text-slate-500">
                        Qty: {request.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Payment</p>
                      <div className="mt-1">
                        <StatusBadge status={request.paymentStatus} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    <StatusBadge status={request.bookingStatus} />

                    <button
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-brand-teal hover:text-brand-teal"
                    >
                      <Eye size={15} />
                      Details
                    </button>

                    {request.bookingStatus === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmAction({
                              id: request.id,
                              action: "accept",
                            })
                          }
                          className="inline-flex h-9 items-center gap-1 rounded-lg bg-brand-teal px-3 text-xs font-semibold text-brand-navy transition hover:bg-brand-green hover:text-white"
                        >
                          <Check size={15} />
                          Accept
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setConfirmAction({
                              id: request.id,
                              action: "decline",
                            })
                          }
                          className="inline-flex h-9 items-center gap-1 rounded-lg bg-rose-50 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                        >
                          <X size={15} />
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-2 rounded-2xl border border-brand-teal/20 bg-brand-teal/5 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-brand-navy">Paid rental revenue</p>
          <p className="mt-1 text-sm text-slate-500">
            Total amount from requests marked as paid.
          </p>
        </div>
        <p className="font-heading text-2xl font-bold text-brand-green">
          {formatCurrency(totalRevenue)}
        </p>
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
                <div>
                  <h2 className="font-heading text-lg font-bold text-brand-navy">
                    Request Details
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedRequest.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                  aria-label="Close details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedRequest.image}
                    alt={selectedRequest.equipment}
                    width={192}
                    height={160}
                    unoptimized
                    className="h-20 w-24 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-navy">
                      {selectedRequest.equipment}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedRequest.category}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={selectedRequest.bookingStatus} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer
                    </p>
                    <p className="mt-2 font-semibold text-brand-navy">
                      {selectedRequest.customer}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedRequest.email}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedRequest.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Rental period
                    </p>
                    <p className="mt-2 text-sm font-medium text-brand-navy">
                      {formatDate(selectedRequest.startDate)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Until {formatDate(selectedRequest.endDate)}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Requested on {formatDate(selectedRequest.bookingDate)}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Booking summary
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Quantity</span>
                      <span className="font-semibold text-brand-navy">
                        {selectedRequest.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-500">Payment status</span>
                      <StatusBadge status={selectedRequest.paymentStatus} />
                    </div>
                    <div className="flex justify-between gap-3 border-t border-slate-200 pt-3">
                      <span className="font-semibold text-brand-navy">
                        Total amount
                      </span>
                      <span className="font-heading text-lg font-bold text-brand-green">
                        {formatCurrency(selectedRequest.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <MapPin size={14} className="mr-1 inline" />
                    Delivery address
                  </p>
                  <p className="text-sm text-slate-700">
                    {selectedRequest.address}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer notes
                  </p>
                  <p className="rounded-xl border border-slate-200 p-4 text-sm leading-relaxed text-slate-600">
                    {selectedRequest.notes || "No additional notes."}
                  </p>
                </div>

                {selectedRequest.bookingStatus === "Pending" && (
                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmAction({
                          id: selectedRequest.id,
                          action: "decline",
                        });
                        setSelectedRequest(null);
                      }}
                      className="rounded-xl border border-rose-200 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Decline Request
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, "accept");
                        setSelectedRequest(null);
                      }}
                      className="rounded-xl bg-brand-teal px-5 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-green hover:text-white"
                    >
                      Accept Request
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-navy/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                  confirmAction.action === "accept"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {confirmAction.action === "accept" ? (
                  <CheckCircle2 size={27} />
                ) : (
                  <XCircle size={27} />
                )}
              </div>

              <h3 className="font-heading text-lg font-bold text-brand-navy">
                {confirmAction.action === "accept"
                  ? "Accept this request?"
                  : "Decline this request?"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {confirmAction.action === "accept"
                  ? "The booking status will change to Confirmed."
                  : "The booking status will change to Cancelled."}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateRequestStatus(confirmAction.id, confirmAction.action)
                  }
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                    confirmAction.action === "accept"
                      ? "bg-brand-green hover:bg-brand-navy"
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
