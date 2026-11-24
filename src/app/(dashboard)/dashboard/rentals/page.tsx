
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Package,
  RefreshCw,
  Search,
  ClipboardList,
  AlertCircle,
  UserRound,
  Mail,
  Phone,
  MapPinned,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  getOwnerRentals,
  completeOwnerRental,
} from "@/services/booking-service";

import type {
  OwnerRental,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking";

const statusOptions = [
  { label: "All Rentals", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentStyles: Record<PaymentStatus, string> = {
  unpaid: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-blue-100 text-blue-700",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function OwnerRentalsPage() {
  const [bookings, setBookings] = useState<OwnerRental[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [completingBookingId, setCompletingBookingId] = useState<
    string | null
  >(null);

  useEffect(() => {
    let isActive = true;

    const loadRentals = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await getOwnerRentals({
          status: selectedStatus === "all" ? undefined : selectedStatus,
        });

        if (isActive) {
          setBookings(result.data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load rental bookings.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadRentals();

    return () => {
      isActive = false;
    };
  }, [selectedStatus, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((current) => current + 1);
  };

  const handleCompleteRental = async (bookingId: string) => {
    setCompletingBookingId(bookingId);

    try {
      const result = await completeOwnerRental(bookingId);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "completed" }
            : booking,
        ),
      );

      toast.success(
        result.message || "Rental marked as completed successfully.",
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to complete this rental.",
      );
    } finally {
      setCompletingBookingId(null);
    }
  };

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            Owner Workspace
          </p>

          <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Rental Bookings
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage customer bookings for your listed equipment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Customer Bookings
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {bookings.length}{" "}
              {bookings.length === 1 ? "booking" : "bookings"} found
            </p>
          </div>

          <div className="relative w-full sm:w-56">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-4 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary"
              aria-label="Filter bookings by status"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card">
          <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

          <p className="text-sm font-medium text-muted-foreground">
            Loading rental bookings...
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 text-center">
          <AlertCircle size={36} className="text-destructive" />

          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Unable to load bookings
          </h3>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {selectedStatus === "all" ? (
              <ClipboardList size={30} />
            ) : (
              <Package size={30} />
            )}
          </div>

          <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
            {selectedStatus === "all"
              ? "No rental bookings yet"
              : "No matching bookings"}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {selectedStatus === "all"
              ? "You haven't received any equipment rental bookings yet. Your customer bookings will appear here."
              : `You don't have any ${selectedStatus} bookings right now.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canComplete =
              booking.paymentStatus === "paid" &&
              ["confirmed", "active"].includes(booking.status) &&
              new Date(booking.endDate).getTime() <= Date.now();

            const isCompleting = completingBookingId === booking._id;

            return (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row">
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-[4/3] lg:w-52">
                    {booking.equipment?.image ? (
                      <Image
                        src={booking.equipment.image}
                        alt={booking.equipment.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 208px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <Package size={36} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {booking.equipment?.category || "Equipment"}
                        </p>

                        <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                          {booking.equipment?.name || "Equipment unavailable"}
                        </h3>

                        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin size={15} />
                          {booking.equipment?.location || "Location unavailable"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${statusStyles[booking.status]}`}
                      >
                        {formatLabel(booking.status)}
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl bg-muted/50 p-4">
                      <h4 className="mb-3 text-sm font-bold text-foreground">
                        Customer Information
                      </h4>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <UserRound size={15} className="shrink-0" />
                          <span className="truncate">
                            {booking.customer?.name || "Name unavailable"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail size={15} className="shrink-0" />
                          <span className="truncate">
                            {booking.customer?.email || "Email unavailable"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone size={15} className="shrink-0" />
                          <span>
                            {booking.phone || "Phone unavailable"}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-muted-foreground sm:col-span-2">
                          <MapPinned size={15} className="mt-0.5 shrink-0" />
                          <span>
                            {booking.deliveryAddress || "Address unavailable"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Start Date
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <CalendarDays size={14} />
                          {formatDate(booking.startDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          End Date
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <CalendarDays size={14} />
                          {formatDate(booking.endDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Quantity
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {booking.quantity} item(s)
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Customer Notes
                        </p>

                        <p className="mt-1 text-sm leading-6 text-foreground">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    <div className="mt-5 flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Amount
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-foreground">
                          {formatCurrency(booking.totalAmount)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Payment:
                        </span>

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${paymentStyles[booking.paymentStatus]}`}
                        >
                          {formatLabel(booking.paymentStatus)}
                        </span>
                      </div>
                    </div>

                    {canComplete && (
                      <div className="mt-4 flex justify-end border-t border-border pt-4">
                        <button
                          type="button"
                          onClick={() => handleCompleteRental(booking._id)}
                          disabled={completingBookingId !== null}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isCompleting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Completing...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={16} />
                              Mark as Completed
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
