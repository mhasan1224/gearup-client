
import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Wallet,
} from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Affordable Rental",
    description:
      "Access the equipment you need without the high upfront cost of purchasing it.",
    number: "01",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Equipment Owners",
    description:
      "Rent with confidence through transparent listings and owner information.",
    number: "02",
  },
  {
    icon: CalendarClock,
    title: "Flexible Rental Periods",
    description:
      "Choose daily, weekly, or monthly rental plans that fit your project.",
    number: "03",
  },
  {
    icon: CreditCard,
    title: "Secure Online Payments",
    description:
      "Enjoy a smooth booking experience with secure online payment processing.",
    number: "04",
  },
];

export function WhyChooseGearUp() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#071827] via-[#102b40] to-[#071827] px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#00D6A3]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#087F68]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[#00D6A3]/25 bg-[#00D6A3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00D6A3]">
            The GearUp Advantage
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Equipment rental,
            <span className="text-gradient-teal"> made smarter.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#B8C5D1] sm:text-lg">
            Everything you need to rent smarter, work better, and get more
            value from every project.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#00D6A3]/40 hover:bg-white/[0.07]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#00D6A3]/20 bg-[#00D6A3]/10 text-[#00D6A3] transition-colors duration-300 group-hover:bg-[#00D6A3] group-hover:text-[#071827]">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-semibold tracking-widest text-white/20">
                    {benefit.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#B8C5D1]">
                  {benefit.description}
                </p>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#00D6A3] to-[#087F68] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
