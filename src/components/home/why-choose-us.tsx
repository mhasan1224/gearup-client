
"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  ShieldCheck,
  CalendarClock,
  LockKeyhole,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Affordable Rentals",
    description:
      "Get the equipment you need without the high cost of purchasing and maintaining it.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Owners",
    description:
      "Connect with trusted equipment owners and make more confident rental decisions.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Rental",
    description:
      "Choose rental periods that fit your project, whether daily, weekly, or monthly.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Payments",
    description:
      "Complete your rental payments through a secure and reliable payment process.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            The GearUp Advantage
          </span>

          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Why Choose GearUp?
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            A simpler way to access equipment, connect with owners, and keep
            your projects moving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                  />
                </div>

                <h3 className="mt-7 font-heading text-lg font-bold text-foreground">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
