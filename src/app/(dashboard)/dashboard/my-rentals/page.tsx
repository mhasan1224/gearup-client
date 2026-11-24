
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Package,
  RefreshCw,
  Search,
  ClipboardList,
  AlertCircle,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getMyRentals } from "@/services/booking-service";
import { reviewService } from "@/services/review-service";

import type { Booking, BookingStatus } from "@/types/booking";
import type { MyReviewStatus } from "@/types/review";

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

const paymentStyles = {
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

export default function MyRentalsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [myReviews, setMyReviews] = useState<MyReviewStatus[]>([]);

  useEffect(() => {
    let isActive = true;

    const loadRentals = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await getMyRentals({
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
              : "Unable to load your rentals.",
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

  useEffect(() => {
    let isActive = true;

    const fetchMyReviews = async () => {
      try {
        const response = await reviewService.getMy();

        if (isActive) {
          setMyReviews(response.data);
        }
      } catch (err) {
        if (isActive) {
          console.error("Failed to fetch review statuses:", err);
        }
      }
    };

    void fetchMyReviews();

    return () => {
      isActive = false;
    };
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((current) => current + 1);
  };

  const getReviewStatus = (bookingId: string) => {
    return myReviews.find(
      (review) => review.bookingId === bookingId,
    )?.status;
  };

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            Customer Workspace
          </p>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            My Rentals
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track and manage your equipment rental bookings.
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
              Rental Bookings
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
              aria-label="Filter rentals by status"
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
            Loading your rentals...
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 text-center">
          <AlertCircle size={36} className="text-destructive" />
          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Unable to load rentals
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
              ? "No rentals yet"
              : "No matching rentals"}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {selectedStatus === "all"
              ? "You haven't made any equipment bookings yet. Explore available equipment and start renting."
              : `You don't have any ${selectedStatus} rentals right now.`}
          </p>

          {selectedStatus === "all" ? (
            <Link
              href="/equipment"
              className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Equipment
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setSelectedStatus("all")}
              className="mt-6 rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
            >
              View All Rentals
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const reviewStatus = getReviewStatus(booking._id);
            const canReview =
              booking.status === "completed" &&
              booking.paymentStatus === "paid";

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
                        <h3 className="mt-1 truncate font-heading text-lg font-bold text-foreground">
                          {booking.equipment?.name || "Equipment unavailable"}
                        </h3>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin size={15} />
                          {booking.equipment?.location || "Location unavailable"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                          statusStyles[booking.status]
                        }`}
                      >
                        {formatLabel(booking.status)}
                      </span>
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
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            paymentStyles[booking.paymentStatus]
                          }`}
                        >
                          {formatLabel(booking.paymentStatus)}
                        </span>
                      </div>
                    </div>

                    {canReview && (
                      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          {reviewStatus === "pending" ? (
                            <>
                              <Clock
                                size={17}
                                className="text-amber-600"
                              />
                              <span className="text-sm font-semibold text-amber-700">
                                Awaiting Approval
                              </span>
                            </>
                          ) : reviewStatus === "approved" ? (
                            <>
                              <CheckCircle2
                                size={17}
                                className="text-emerald-600"
                              />
                              <span className="text-sm font-semibold text-emerald-700">
                                Review Submitted
                              </span>
                            </>
                          ) : reviewStatus === "rejected" ? (
                            <>
                              <XCircle
                                size={17}
                                className="text-red-600"
                              />
                              <span className="text-sm font-semibold text-red-700">
                                Review Rejected
                              </span>
                            </>
                          ) : (
                            <>
                              <Star
                                size={17}
                                className="text-primary"
                              />
                              <span className="text-sm font-medium text-muted-foreground">
                                Share your rental experience
                              </span>
                            </>
                          )}
                        </div>

                        {(!reviewStatus || reviewStatus === "rejected") && (
                          <Link
                            href={`/dashboard/my-rentals/${booking._id}/review`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            <Star size={15} />
                            {reviewStatus === "rejected"
                              ? "Resubmit Review"
                              : "Write a Review"}
                          </Link>
                        )}
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
