
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  RefreshCw,
  Star,
  Users,
  Package,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { reviewService } from "@/services/review-service";
import type { CustomerReview, ReviewStatus } from "@/types/review";

const filterOptions = [
  { label: "All Reviews", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
] as const;

type ReviewFilter = (typeof filterOptions)[number]["value"];

const statusStyles: Record<ReviewStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [selectedFilter, setSelectedFilter] =
    useState<ReviewFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await reviewService.getAll(12);
      setReviews(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load customer reviews.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews, refreshKey]);

  const handleStatusUpdate = async (
    reviewId: string,
    status: "approved" | "rejected",
  ) => {
    setProcessingId(reviewId);

    try {
      const response = await reviewService.updateStatus(reviewId, {
        status,
      });

      toast.success(
        response.message ||
          `Review ${status} successfully.`,
      );

      setRefreshKey((current) => current + 1);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Unable to ${status} this review.`,
      );
    } finally {
      setProcessingId(null);
    }
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.status === selectedFilter);

  const pendingCount = reviews.filter(
    (review) => review.status === "pending",
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.status === "approved",
  ).length;

  const rejectedCount = reviews.filter(
    (review) => review.status === "rejected",
  ).length;

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            Administration
          </p>

          <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            Manage Reviews
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review customer feedback and manage publication approval.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey((current) => current + 1)}
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

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </p>
            <MessageSquare size={20} className="text-primary" />
          </div>
          <p className="mt-3 font-heading text-2xl font-extrabold text-foreground">
            {reviews.length}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Pending
            </p>
            <Clock size={20} className="text-amber-600" />
          </div>
          <p className="mt-3 font-heading text-2xl font-extrabold text-foreground">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Approved
            </p>
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <p className="mt-3 font-heading text-2xl font-extrabold text-foreground">
            {approvedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Rejected
            </p>
            <XCircle size={20} className="text-red-600" />
          </div>
          <p className="mt-3 font-heading text-2xl font-extrabold text-foreground">
            {rejectedCount}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground">
              Customer Feedback
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredReviews.length}{" "}
              {filteredReviews.length === 1 ? "review" : "reviews"} found
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedFilter(option.value)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:text-sm ${
                  selectedFilter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card">
          <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading customer reviews...
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-card px-5 text-center">
          <AlertCircle size={36} className="text-destructive" />

          <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
            Unable to load reviews
          </h3>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setRefreshKey((current) => current + 1)}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquare size={30} />
          </div>

          <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
            No reviews found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            {selectedFilter === "all"
              ? "Customer reviews will appear here when customers submit their rental experiences."
              : `There are no ${selectedFilter} reviews right now.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        statusStyles[review.status]
                      }`}
                    >
                      {review.status.charAt(0).toUpperCase() +
                        review.status.slice(1)}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        className={
                          index < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }
                      />
                    ))}

                    <span className="ml-2 text-sm font-bold text-foreground">
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground">
                    {review.comment}
                  </p>

                  <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Users
                        size={17}
                        className="shrink-0 text-muted-foreground"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Customer
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {review.customer?.name || "Unknown customer"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Package
                        size={17}
                        className="shrink-0 text-muted-foreground"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Equipment
                        </p>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {review.equipment?.name || "Equipment unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {review.status === "pending" && (
                <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(review.id, "rejected")
                    }
                    disabled={processingId === review.id}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {processingId === review.id ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <XCircle size={16} />
                    )}
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(review.id, "approved")
                    }
                    disabled={processingId === review.id}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {processingId === review.id ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                    Approve
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
