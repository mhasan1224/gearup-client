
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Filter,
  MessageSquare,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Review = {
  id: string;
  customer: string;
  email: string;
  owner: string;
  equipment: string;
  category: string;
  rating: number;
  comment: string;
  date: string;
  visible: boolean;
  helpful: number;
  location: string;
};

const initialReviews: Review[] = [
  {
    id: "REV-1001",
    customer: "James Wilson",
    email: "james@example.com",
    owner: "Robert Johnson",
    equipment: "CAT 320 Excavator",
    category: "Construction",
    rating: 5,
    comment:
      "Excellent machine and very professional service. The excavator arrived on time and was in perfect working condition. The owner was helpful throughout the rental period. I would definitely rent again.",
    date: "Nov 18, 2026",
    visible: true,
    helpful: 24,
    location: "New York, USA",
  },
  {
    id: "REV-1002",
    customer: "Olivia Martin",
    email: "olivia@example.com",
    owner: "Emma Davis",
    equipment: "Canon EOS R5 Camera",
    category: "Photography",
    rating: 5,
    comment:
      "Amazing camera quality and a smooth rental experience. Everything was properly packed and delivered. Great communication from the owner.",
    date: "Nov 17, 2026",
    visible: true,
    helpful: 18,
    location: "London, UK",
  },
  {
    id: "REV-1003",
    customer: "Ethan Taylor",
    email: "ethan@example.com",
    owner: "William Brown",
    equipment: "Honda Generator 7.5kW",
    category: "Electronics",
    rating: 4,
    comment:
      "The generator worked well during our event. It was reliable and easy to operate. Delivery was slightly delayed, but the owner communicated the issue.",
    date: "Nov 16, 2026",
    visible: true,
    helpful: 12,
    location: "Chicago, USA",
  },
  {
    id: "REV-1004",
    customer: "Sophia Anderson",
    email: "sophia@example.com",
    owner: "Sophia Chen",
    equipment: "DJI Mavic 3 Drone",
    category: "Photography",
    rating: 2,
    comment:
      "The equipment did not match my expectations. Battery performance was poor and I had difficulty getting support during the rental period.",
    date: "Nov 15, 2026",
    visible: false,
    helpful: 3,
    location: "Toronto, Canada",
  },
  {
    id: "REV-1005",
    customer: "Noah Thompson",
    email: "noah@example.com",
    owner: "Daniel Brown",
    equipment: "John Deere Tractor",
    category: "Agriculture",
    rating: 5,
    comment:
      "Very dependable tractor. The equipment was clean and well maintained. The owner explained everything before delivery. Excellent experience.",
    date: "Nov 14, 2026",
    visible: true,
    helpful: 31,
    location: "Dallas, USA",
  },
  {
    id: "REV-1006",
    customer: "Ava Johnson",
    email: "ava@example.com",
    owner: "Isabella Anderson",
    equipment: "Professional Sound System",
    category: "Event Equipment",
    rating: 4,
    comment:
      "The sound quality was excellent for our event. Setup instructions were clear and the equipment performed reliably throughout the day.",
    date: "Nov 13, 2026",
    visible: true,
    helpful: 9,
    location: "Lisbon, Portugal",
  },
  {
    id: "REV-1007",
    customer: "Mason Lee",
    email: "mason@example.com",
    owner: "Noah Williams",
    equipment: "JCB Backhoe Loader",
    category: "Construction",
    rating: 1,
    comment:
      "The machine arrived with an issue and the rental experience was disappointing. I contacted the owner but the response was slow.",
    date: "Nov 12, 2026",
    visible: true,
    helpful: 7,
    location: "Manchester, UK",
  },
  {
    id: "REV-1008",
    customer: "Lucas Garcia",
    email: "lucas@example.com",
    owner: "Lucas Martin",
    equipment: "Toyota Hiace Van",
    category: "Vehicles & Transportation",
    rating: 5,
    comment:
      "Great vehicle, comfortable and clean. The booking process was easy and the owner was very friendly. Highly recommended.",
    date: "Nov 11, 2026",
    visible: true,
    helpful: 16,
    location: "Paris, France",
  },
  {
    id: "REV-1009",
    customer: "Isabella Moore",
    email: "isabella@example.com",
    owner: "Robert Johnson",
    equipment: "CAT 320 Excavator",
    category: "Construction",
    rating: 3,
    comment:
      "The equipment was functional but could use some maintenance. Overall the rental was acceptable.",
    date: "Nov 10, 2026",
    visible: false,
    helpful: 2,
    location: "New York, USA",
  },
];

const PAGE_SIZE = 6;

function RatingStars({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200 dark:text-slate-700"
          }
        />
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Star;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          <Icon size={21} />
        </div>
        <MessageSquare size={15} className="text-slate-300" />
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

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [visibilityFilter, setVisibilityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

  const summary = useMemo(() => {
    const visibleReviews = reviews.filter((review) => review.visible);
    const average =
      reviews.length > 0
        ? reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        : 0;

    return {
      total: reviews.length,
      average: average.toFixed(1),
      fiveStar: reviews.filter((review) => review.rating === 5).length,
      hidden: reviews.filter((review) => !review.visible).length,
      visible: visibleReviews.length,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const value = search.toLowerCase();

      const matchesSearch =
        review.id.toLowerCase().includes(value) ||
        review.customer.toLowerCase().includes(value) ||
        review.email.toLowerCase().includes(value) ||
        review.owner.toLowerCase().includes(value) ||
        review.equipment.toLowerCase().includes(value) ||
        review.category.toLowerCase().includes(value);

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      const matchesVisibility =
        visibilityFilter === "All" ||
        (visibilityFilter === "Visible" && review.visible) ||
        (visibilityFilter === "Hidden" && !review.visible);

      return matchesSearch && matchesRating && matchesVisibility;
    });
  }, [reviews, search, ratingFilter, visibilityFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / PAGE_SIZE),
  );

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const toggleVisibility = (review: Review) => {
    const nextVisible = !review.visible;

    setReviews((current) =>
      current.map((item) =>
        item.id === review.id
          ? { ...item, visible: nextVisible }
          : item,
      ),
    );

    toast.success(
      nextVisible
        ? "Review restored to the public view."
        : "Review hidden from the public view.",
    );

    setSelectedReview(null);
  };

  const deleteReview = () => {
    if (!deletingReview) return;

    setReviews((current) =>
      current.filter((review) => review.id !== deletingReview.id),
    );

    toast.success("Review deleted successfully.");
    setDeletingReview(null);
    setSelectedReview(null);
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
            <MessageSquare size={15} />
            CUSTOMER FEEDBACK
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Reviews Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor customer feedback and maintain marketplace trust.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <ShieldCheck size={18} className="text-brand-teal" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Review Moderation
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Reviews"
          value={String(summary.total)}
          description="All customer feedback"
          icon={MessageSquare}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Average Rating"
          value={summary.average}
          description="Overall marketplace rating"
          icon={Star}
          color="bg-amber-500/10 text-amber-500"
        />
        <StatCard
          title="5-Star Reviews"
          value={String(summary.fiveStar)}
          description="Excellent customer experiences"
          icon={BadgeCheck}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Hidden Reviews"
          value={String(summary.hidden)}
          description="Not visible to the public"
          icon={EyeOff}
          color="bg-red-500/10 text-red-500"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Customer Reviews
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Review feedback and manage public visibility.
              </p>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              {summary.visible} Public Reviews
            </span>
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
                placeholder="Search review, customer, owner or equipment..."
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
                  value={ratingFilter}
                  onChange={(event) => {
                    setRatingFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pl-9 pr-8 sm:w-40`}
                >
                  <option value="All">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={visibilityFilter}
                  onChange={(event) => {
                    setVisibilityFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                  className={`${inputClass} appearance-none pr-8 sm:w-40`}
                >
                  <option value="All">All Visibility</option>
                  <option value="Visible">Visible</option>
                  <option value="Hidden">Hidden</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {paginatedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {review.customer}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {review.email}
                    </span>
                    {review.visible ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        Public
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <RatingStars rating={review.rating} />
                    <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      {review.rating}.0 / 5
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {review.date}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-600 dark:text-slate-300">
                    {review.comment}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-400">
                    <span>
                      Equipment:{" "}
                      <strong className="font-semibold text-slate-600 dark:text-slate-300">
                        {review.equipment}
                      </strong>
                    </span>
                    <span>
                      Owner:{" "}
                      <strong className="font-semibold text-slate-600 dark:text-slate-300">
                        {review.owner}
                      </strong>
                    </span>
                    <span>{review.id}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
                  <button
                    type="button"
                    title="View details"
                    onClick={() => setSelectedReview(review)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    title={review.visible ? "Hide review" : "Restore review"}
                    onClick={() => toggleVisibility(review)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10"
                  >
                    {review.visible ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    title="Delete review"
                    onClick={() => setDeletingReview(review)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">
                  Helpful votes:{" "}
                  <strong className="text-slate-600 dark:text-slate-300">
                    {review.helpful}
                  </strong>
                </span>
                <span className="text-[10px] text-slate-400">
                  {review.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {paginatedReviews.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <MessageSquare size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
              No reviews found
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
              {filteredReviews.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -
              {Math.min(currentPage * PAGE_SIZE, filteredReviews.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredReviews.length}
            </span>{" "}
            reviews
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

      {selectedReview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-wider text-brand-teal">
                  REVIEW DETAILS
                </p>
                <h2
                  id="review-details-title"
                  className="mt-1 font-bold text-slate-900 dark:text-white"
                >
                  {selectedReview.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close review details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedReview.customer}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {selectedReview.email}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedReview.date}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <RatingStars rating={selectedReview.rating} size={17} />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {selectedReview.rating}.0 / 5
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {selectedReview.comment}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["Equipment", selectedReview.equipment],
                ["Category", selectedReview.category],
                ["Owner", selectedReview.owner],
                ["Location", selectedReview.location],
                ["Helpful Votes", String(selectedReview.helpful)],
                ["Review Status", selectedReview.visible ? "Public" : "Hidden"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
                >
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => toggleVisibility(selectedReview)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
            >
              {selectedReview.visible ? (
                <>
                  <EyeOff size={15} />
                  Hide This Review
                </>
              ) : (
                <>
                  <Eye size={15} />
                  Restore This Review
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {deletingReview && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-review-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-review-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Delete Review?
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Are you sure you want to permanently delete review{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                {deletingReview.id}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingReview(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteReview}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
