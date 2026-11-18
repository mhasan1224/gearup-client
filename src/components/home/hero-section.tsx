
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Headphones,
} from "lucide-react";

const categories = [
  "All Categories",
  "Construction",
  "Photography",
  "Vehicles & Transportation",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description: "Safe rental experience",
  },
  {
    icon: Clock3,
    title: "Instant Booking",
    description: "Quick and easy process",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help",
  },
  {
    icon: CheckCircle2,
    title: "Verified Listings",
    description: "Quality you can trust",
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#071827] sm:min-h-[820px] lg:min-h-[850px]">

      {/* Cinematic Background Image */}
      <div
        className="absolute inset-0 -z-30 scale-[1.02] bg-cover bg-[center_55%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=90')",
        }}
        role="img"
        aria-label="Construction site with heavy equipment"
      />

      {/* Multi-layer Gradient Overlay */}
      <div className="hero-overlay absolute inset-0 -z-20" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071827]/35 via-transparent to-[#071827]" />

      {/* Ambient Teal Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[450px] rounded-full bg-[#00d6a3]/10 blur-[150px]" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[760px] w-full max-w-[1600px] flex-col justify-center px-5 pb-16 pt-24 sm:min-h-[820px] sm:px-8 sm:pb-20 lg:min-h-[850px] lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#00d6a3]/30 bg-[#071827]/45 px-4 py-2.5 shadow-[0_0_25px_rgba(0,214,163,0.08)] backdrop-blur-xl">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00d6a3] opacity-50" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#00d6a3]" />
            </span>

            <span className="text-[10px] font-bold tracking-[0.2em] text-[#d6e5e9] sm:text-xs">
              EQUIPMENT RENTAL, REIMAGINED
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl font-heading text-[42px] font-extrabold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[82px]">
            The right equipment.
            <br />
            Built for{" "}
            <span className="text-gradient-teal">
              big ideas.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
            From heavy machinery to everyday essentials, find the right
            equipment for your next big project. Rent smarter, work better,
            and make every opportunity count.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/equipment"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-gradient-brand px-7 text-sm font-bold text-[#071827] shadow-[0_8px_30px_rgba(0,214,163,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,214,163,0.32)]"
            >
              Explore Equipment
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/register"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/[0.07] px-7 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00d6a3]/60 hover:bg-white/15"
            >
              List Your Equipment
              <ArrowUpRight
                size={18}
                className="text-[#00d6a3] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* Equipment Search */}
        <motion.form
          action="/equipment"
          method="GET"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-16 grid w-full max-w-6xl gap-2 rounded-2xl border border-white/70 bg-white p-3 shadow-[0_25px_80px_rgba(0,0,0,0.3)] sm:mt-20 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-0 sm:rounded-2xl sm:p-2.5">
          {/* Equipment Search Input */}
          <div className="flex min-h-[58px] items-center gap-3 px-4 sm:border-r sm:border-gray-200">
            <Search className="shrink-0 text-[#087f68]" size={21} />

            <div className="min-w-0 flex-1">
              <label
                htmlFor="equipment-search"
                className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500"
              >
                What do you need?
              </label>

              <input
                id="equipment-search"
                type="search"
                name="search"
                placeholder="Search equipment..."
                className="w-full bg-transparent text-sm font-semibold text-[#102b40] outline-none placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="flex min-h-[58px] items-center gap-3 px-4 sm:border-r sm:border-gray-200">
            <SlidersHorizontal
              className="shrink-0 text-[#087f68]"
              size={20}
            />

            <div className="min-w-0 flex-1">
              <label
                htmlFor="equipment-category"
                className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500"
              >
                Category
              </label>

              <select
                id="equipment-category"
                name="category"
                defaultValue=""
                className="w-full cursor-pointer bg-transparent text-sm font-semibold text-[#102b40] outline-none"
              >
                {categories.map((category, index) => (
                  <option
                    key={category}
                    value={index === 0 ? "" : category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Input */}
          <div className="flex min-h-[58px] items-center gap-3 px-4">
            <MapPin className="shrink-0 text-[#087f68]" size={21} />

            <div className="min-w-0 flex-1">
              <label
                htmlFor="equipment-location"
                className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500"
              >
                Location
              </label>

              <input
                id="equipment-location"
                type="text"
                name="location"
                placeholder="Enter location"
                className="w-full bg-transparent text-sm font-semibold text-[#102b40] outline-none placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-[#087f68] px-7 text-sm font-bold text-white transition-all duration-300 hover:bg-[#066b57] hover:shadow-[0_6px_20px_rgba(8,127,104,0.2)]"
          >
            <Search size={18} />
            Search
          </button>
        </motion.form>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 grid w-full grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-6"
        >
          {trustFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-center gap-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#00d6a3]/20 bg-[#00d6a3]/10 text-[#00d6a3]">
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white sm:text-sm">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Teal Accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00d6a3]/60 to-transparent" />
    </section>
  );
}
