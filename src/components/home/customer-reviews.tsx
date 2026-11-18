
import { Quote, Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Daniel Carter",
    role: "Construction Project Manager",
    initials: "DC",
    rating: 5,
    review:
      "GearUp made finding heavy equipment for our construction project incredibly easy. The rental process was smooth, and we saved a significant amount compared to purchasing.",
    date: "October 2026",
  },
  {
    name: "Sophia Bennett",
    role: "Professional Photographer",
    initials: "SB",
    rating: 5,
    review:
      "I needed a professional camera for a short-term project. The platform made it easy to explore equipment options and find exactly what I needed.",
    date: "September 2026",
  },
  {
    name: "Michael Anderson",
    role: "Small Business Owner",
    initials: "MA",
    rating: 5,
    review:
      "The flexible rental options are a huge advantage for my business. I can access useful equipment without making a large upfront investment.",
    date: "September 2026",
  },
  {
    name: "Olivia Martinez",
    role: "Event Organizer",
    initials: "OM",
    rating: 5,
    review:
      "Finding event equipment for a specific date used to take a lot of time. GearUp offers a convenient way to discover rental options in one place.",
    date: "August 2026",
  },
];

export function CustomerReviews() {
  return (
    <section className="relative overflow-hidden bg-[#102B40] px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#00D6A3]/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-[#00D6A3]/25 bg-[#00D6A3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00D6A3]">
              Customer Experiences
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trusted by people
              <span className="text-gradient-teal"> who get things done.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#B8C5D1]">
              Discover how convenient equipment rentals can make a difference
              for projects, businesses, and creative work.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4">
            <div>
              <div className="flex items-center gap-1 text-[#00D6A3]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm font-semibold text-white">
                Customer-first experience
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <article
              key={review.initials}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#071827]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6A3]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
            >
              <Quote
                size={30}
                className="mb-5 text-[#00D6A3]/60 transition-colors group-hover:text-[#00D6A3]"
              />

              <div className="mb-4 flex items-center gap-1 text-[#00D6A3]">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-7 text-[#B8C5D1]">
                &ldquo;{review.review}&rdquo;
              </p>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#00D6A3]/30 bg-[#00D6A3]/10 text-sm font-bold text-[#00D6A3]">
                  {review.initials}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {review.name}
                    </h3>
                    <BadgeCheck
                      size={15}
                      className="shrink-0 text-[#00D6A3]"
                    />
                  </div>

                  <p className="mt-1 text-xs text-[#B8C5D1]">
                    {review.role}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/40">{review.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
