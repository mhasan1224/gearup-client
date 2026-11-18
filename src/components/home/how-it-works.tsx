import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Search,
  Truck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Equipment",
    description:
      "Explore a wide range of equipment and find the right match for your project.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose Your Rental Dates",
    description:
      "Select your preferred rental period and provide the booking details.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pay Securely Online",
    description:
      "Complete your booking through a secure and convenient payment process.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Get to Work",
    description:
      "Receive your equipment and focus on getting your project done.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#071827] px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00D6A3]/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-[#00D6A3]/25 bg-[#00D6A3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00D6A3]">
            Simple Process
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Get started in
            <span className="text-gradient-teal"> four easy steps.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#B8C5D1] sm:text-lg">
            From discovering equipment to getting your project started,
            GearUp keeps the rental process simple.
          </p>
        </div>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#00D6A3]/40 to-transparent lg:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article key={step.number} className="relative text-center">
                <div className="relative z-10 mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00D6A3]/30 bg-[#102B40] text-[#00D6A3] shadow-[0_0_30px_rgba(0,214,163,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6A3] hover:shadow-[0_0_35px_rgba(0,214,163,0.18)]">
                  <Icon size={27} strokeWidth={1.7} />
                </div>

                <span className="text-xs font-bold tracking-[0.25em] text-[#00D6A3]">
                  STEP {step.number}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#B8C5D1]">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/equipment"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#00D6A3] px-6 py-3.5 text-sm font-bold text-[#071827] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#35E8BE] hover:shadow-[0_10px_30px_rgba(0,214,163,0.2)]"
          >
            Explore Equipment
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
