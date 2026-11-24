
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Package,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { reviewService } from "@/services/review-service";

export default function ReviewSubmissionPage() {
  const router = useRouter();
  const params = useParams<{ bookingId: string }>();

  const bookingId = params.bookingId;

  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedComment = comment.trim();

    if (!bookingId) {
      toast.error("Invalid booking reference.");
      return;
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5.");
      return;
    }

    if (trimmedComment.length < 5) {
      toast.error("Review must contain at least 5 characters.");
      return;
    }

    if (trimmedComment.length > 1000) {
      toast.error("Review cannot exceed 1000 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await reviewService.create({
        bookingId,
        rating,
        comment: trimmedComment,
      });

      toast.success(
        response.message || "Your review was submitted successfully.",
      );

      router.push("/dashboard/my-rentals");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit your review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedRating = hoveredRating || rating;

  return (
    <div className="mx-auto max-w-2xl space-y-7">
      <section>
        <Link
          href="/dashboard/my-rentals"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to My Rentals
        </Link>

        <p className="mt-6 text-sm font-semibold text-primary">
          Customer Experience
        </p>

        <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Write a Review
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Share your experience and help other customers make better rental
          decisions.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-7 rounded-2xl border border-border bg-card p-5 sm:p-7"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package size={22} />
            </div>

            <div>
              <h2 className="font-heading text-base font-bold text-foreground">
                Rental Review
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Booking reference: {bookingId}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <label className="block text-sm font-bold text-foreground">
            Your Rating
          </label>

          <p className="mt-1 text-sm text-muted-foreground">
            How was your rental experience?
          </p>

          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const starValue = index + 1;
              const isActive = starValue <= displayedRating;

              return (
                <button
                  key={starValue}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onFocus={() => setHoveredRating(starValue)}
                  onBlur={() => setHoveredRating(0)}
                  aria-label={`Rate ${starValue} out of 5 stars`}
                  aria-pressed={rating === starValue}
                  className="rounded-md p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <Star
                    size={32}
                    className={
                      isActive
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40"
                    }
                  />
                </button>
              );
            })}

            <span className="ml-2 text-sm font-bold text-foreground">
              {rating}/5
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <label
            htmlFor="review-comment"
            className="block text-sm font-bold text-foreground"
          >
            Your Review
          </label>

          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about the equipment quality, service, and overall
            experience.
          </p>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your rental experience..."
            rows={6}
            maxLength={1000}
            disabled={isSubmitting}
            className="mt-4 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Minimum 5 characters, maximum 1000 characters.
            </p>

            <span
              className={`shrink-0 text-xs font-medium ${
                comment.length > 1000
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {comment.length}/1000
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 p-4">
          <p className="text-sm leading-6 text-muted-foreground">
            Your review will be submitted for admin approval. Once approved,
            it may appear in the Customer Reviews section on the GearUp
            homepage.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/my-rentals"
            className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || comment.trim().length < 5}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Star size={17} />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
