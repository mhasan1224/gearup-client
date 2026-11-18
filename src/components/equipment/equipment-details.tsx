
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
  Star,
  Tag,
  Truck,
  UserRound,
  Wrench,
} from "lucide-react";

import type { Equipment } from "@/types/equipment";
import { BookingModal } from "@/components/equipment/booking-modal";

interface EquipmentDetailsProps {
  equipment: Equipment;
}

export function EquipmentDetails({
  equipment,
}: EquipmentDetailsProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const specifications = [
    {
      label: "Brand",
      value: equipment.brand,
      icon: Tag,
    },
    {
      label: "Model",
      value: equipment.model,
      icon: Package,
    },
    {
      label: "Condition",
      value: equipment.condition,
      icon: Wrench,
    },
    {
      label: "Category",
      value: equipment.category,
      icon: Truck,
    },
    {
      label: "Availability",
      value: equipment.available
        ? `${equipment.availableQuantity} Units`
        : "Currently Unavailable",
      icon: CalendarDays,
    },
    {
      label: "Rental Type",
      value: equipment.rentalType,
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8fa] pb-20 dark:bg-[#071827]">
      <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12">
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#087f68] dark:text-slate-400 dark:hover:text-[#00d6a3]"
        >
          <ArrowLeft size={17} />
          Back to Equipment
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl bg-[#102b40] shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/70 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-white/20 bg-[#071827]/65 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    {equipment.category}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/70">
                      EQUIPMENT CONDITION
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      {equipment.condition}
                    </p>
                  </div>

                  <div
                    className={`rounded-full px-3 py-2 text-xs font-bold ${
                      equipment.available
                        ? "bg-[#00d6a3] text-[#071827]"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {equipment.available
                      ? "Available"
                      : "Unavailable"}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#e1f8f1] px-3 py-1.5 text-xs font-bold text-[#087f68] dark:bg-[#00d6a3]/10 dark:text-[#00d6a3]">
                  {equipment.category}
                </span>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-500">
                  <Star size={16} fill="currentColor" />
                  {equipment.rating}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    ({equipment.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#102b40] sm:text-4xl lg:text-5xl dark:text-white">
                {equipment.name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={17} className="text-[#00a982]" />
                {equipment.location}
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                {equipment.description}
              </p>
            </motion.div>

            <section className="mt-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                  <Wrench size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102b40] dark:text-white">
                    Equipment Specifications
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Important equipment information
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {specifications.map((specification, index) => {
                  const Icon = specification.icon;

                  return (
                    <motion.div
                      key={specification.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                      }}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-[#102b40]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e1f8f1] text-[#087f68] dark:bg-[#00d6a3]/10 dark:text-[#00d6a3]">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {specification.label}
                        </p>
                        <p className="mt-1 truncate text-sm font-bold text-[#102b40] dark:text-white">
                          {specification.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mt-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102b40] dark:text-white">
                    Rental Terms & Conditions
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Please review before booking
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-[#102b40]">
                <ul className="space-y-4">
                  {equipment.rentalTerms.map((term, index) => (
                    <li
                      key={`${index}-${term}`}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00d6a3]/15 text-[#087f68] dark:text-[#00d6a3]">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                  <UserRound size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#102b40] dark:text-white">
                    Equipment Owner
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Listed by this equipment provider
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-[#102b40]">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-xl font-extrabold text-[#071827]">
                    {equipment.owner.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#102b40] dark:text-white">
                        {equipment.owner.name}
                      </h3>

                      {equipment.owner.verified && (
                        <BadgeCheck
                          size={17}
                          className="text-[#00a982]"
                        />
                      )}
                    </div>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {equipment.owner.verified
                        ? "Verified equipment owner"
                        : "Equipment provider"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#e1f8f1] px-3 py-2 text-xs font-bold text-[#087f68] dark:bg-[#00d6a3]/10 dark:text-[#00d6a3]">
                  GearUp Provider
                </span>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl dark:border-white/10 dark:bg-[#102b40]"
            >
              <div className="bg-gradient-to-br from-[#071827] to-[#102b40] p-6 text-white sm:p-8">
                <p className="text-sm font-medium text-white/65">
                  Rental Price
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ৳{equipment.price.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm text-white/65">
                    / {equipment.rentalType.toLowerCase()}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-white/70">
                  <CalendarDays size={15} />
                  Flexible rental scheduling
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Availability
                    </span>
                    <span
                      className={`font-bold ${
                        equipment.available
                          ? "text-[#087f68] dark:text-[#00d6a3]"
                          : "text-red-500"
                      }`}
                    >
                      {equipment.available
                        ? "Available Now"
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Available Units
                    </span>
                    <span className="font-bold text-[#102b40] dark:text-white">
                      {equipment.availableQuantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Rental Period
                    </span>
                    <span className="font-bold text-[#102b40] dark:text-white">
                      {equipment.rentalType}
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-dashed border-slate-200 dark:border-white/10" />

                <button
                  type="button"
                  disabled={!equipment.available}
                  onClick={() => setIsBookingOpen(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-4 text-sm font-extrabold text-[#071827] shadow-lg shadow-[#00d6a3]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00bd90] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  {equipment.available
                    ? "Book This Equipment"
                    : "Currently Unavailable"}

                  {equipment.available && (
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                  <ShieldCheck
                    size={14}
                    className="mr-1 inline text-[#00a982]"
                  />
                  Secure booking experience with GearUp
                </p>

                <div className="mt-6 rounded-xl bg-[#f0f8f6] p-4 dark:bg-[#071827]/60">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-[#087f68] dark:text-[#00d6a3]">
                      <Truck size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#102b40] dark:text-white">
                        Need assistance?
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Review the rental terms or contact the equipment
                        provider before confirming your booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <Link
              href="/equipment"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#087f68] dark:text-slate-400 dark:hover:text-[#00d6a3]"
            >
              Explore more equipment
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </div>

      {isBookingOpen && (
        <BookingModal
          equipment={equipment}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </main>
  );
}
