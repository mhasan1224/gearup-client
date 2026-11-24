
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    label: "Trusted Equipment Owners",
  },
  {
    icon: Clock3,
    label: "Flexible Rental Periods",
  },
  {
    icon: BadgeCheck,
    label: "Simple & Secure Booking",
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071827] text-white">
      <div className="absolute -left-32 top-10 size-80 rounded-full bg-[#00D6A3]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-[#087F68]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00D6A3]/30 bg-[#00D6A3]/10 px-4 py-2 text-sm font-semibold text-[#00D6A3]">
            Equipment Rental Made Simple
          </span>

          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The Right Equipment.
            <span className="mt-2 block text-[#00D6A3]">
              Right When You Need It.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Find the equipment you need, rent with confidence, and get your
            work done without the cost of ownership.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00D6A3] px-7 py-4 text-sm font-bold text-[#071827] transition-all hover:-translate-y-1 hover:brightness-95"
            >
              Browse Equipment
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition-colors hover:border-[#00D6A3] hover:text-[#00D6A3]"
            >
              List Your Equipment
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={18} className="shrink-0 text-[#00D6A3]" />
                <span className="text-xs font-medium text-slate-300 sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-[#00D6A3]/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#102B40] p-3 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85"
                alt="Professional equipment used for industrial work"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00D6A3]">
                  GearUp Rentals
                </p>
                <p className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                  Power Your Next Project
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-3 rounded-2xl border border-white/10 bg-[#102B40] px-5 py-4 shadow-xl sm:-left-8">
            <p className="text-xs text-slate-400">Your project starts here</p>
            <p className="mt-1 text-sm font-bold text-[#00D6A3]">
              Rent. Work. Achieve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
