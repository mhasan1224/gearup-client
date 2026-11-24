
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { reviewService } from "@/services/review-service";
import type { CustomerReview } from "@/types/review";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    reviewService
      .getFeatured(4)
      .then((response) => {
        if (!isCancelled) {
          setReviews(response.data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load customer reviews.",
          );
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [retryKey]);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            Customer Reviews
          </span>

          <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-extrabold tracking-tight text-[#071827] sm:text-4xl">
            Trusted by People Who Get Things Done
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500">
            See what customers say about their equipment rental experience
            with GearUp.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl border border-slate-100 bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setRetryKey((current) => current + 1);
              }}
              className="mt-4 rounded-lg bg-[#071827] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102b40]"
            >
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="font-medium text-slate-600">
              No customer reviews available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-slate-100 bg-[#F5F8FA] p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < Math.round(review.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>

                <p className="mt-5 min-h-20 text-sm leading-7 text-slate-600">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="font-bold text-[#071827]">
                    {review.customer?.name ?? "Anonymous Customer"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {review.equipment?.name ?? "Equipment"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
