
"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, CreditCard, PackageCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Equipment",
    description:
      "Browse available equipment and find the right tools for your project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Choose Your Dates",
    description:
      "Select your rental period and specify the quantity you need.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Make a Secure Payment",
    description:
      "Complete your booking through our secure online payment process.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Get to Work",
    description:
      "Coordinate with the equipment owner and get ready for your project.",
    icon: PackageCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-[#071827] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D6A3]">
            Simple Process
          </span>

          <h2 className="mt-3 font-[var(--font-manrope)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            How GearUp Works
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Renting equipment for your next project is simple. Follow these
            four steps to get started.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#00D6A3]/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-[#00D6A3]/10 text-[#00D6A3]">
                    <Icon size={27} />
                  </div>

                  <span className="font-[var(--font-manrope)] text-3xl font-extrabold text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 font-[var(--font-manrope)] text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
