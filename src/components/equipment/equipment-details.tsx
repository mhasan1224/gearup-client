
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const isEquipmentAvailable =
    equipment.available && equipment.availableQuantity > 0;

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
      label: "Rental Type",
      value: equipment.rentalType,
      icon: Clock3,
    },
    {
      label: "Location",
      value: equipment.location,
      icon: MapPin,
    },
    {
      label: "Availability",
      value: isEquipmentAvailable
        ? `${equipment.availableQuantity} Units`
        : "Currently Unavailable",
      icon: CalendarDays,
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#f5f8fa] pb-16 dark:bg-[#071827]">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-[#102b40]">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#087f68] dark:text-slate-400 dark:hover:text-[#00d6a3]"
            >
              <ArrowLeft size={16} />
              Back to Equipment
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:pt-10">
          {/* Page Heading */}
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#00d6a3]/10 px-3 py-1 text-xs font-bold text-[#087f68] dark:text-[#00d6a3]">
                {equipment.category}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  isEquipmentAvailable
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {isEquipmentAvailable ? "Available for Rent" : "Unavailable"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#071827] sm:text-4xl dark:text-white">
              {equipment.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} />
                {equipment.location}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <strong className="text-slate-700 dark:text-slate-200">
                  {equipment.rating}
                </strong>
                ({equipment.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Equipment Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#e9eff1] shadow-sm">
                <Image
                  src={equipment.image}
                  alt={equipment.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                <div
                  className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold shadow-lg ${
                    isEquipmentAvailable
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isEquipmentAvailable
                    ? `${equipment.availableQuantity} Units Available`
                    : "Currently Unavailable"}
                </div>
              </div>

              {/* Description */}
              <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#102b40]">
                <h2 className="text-xl font-extrabold text-[#071827] dark:text-white">
                  About This Equipment
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                  {equipment.description}
                </p>
              </section>

              {/* Specifications */}
              <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#102b40]">
                <h2 className="text-xl font-extrabold text-[#071827] dark:text-white">
                  Equipment Specifications
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {specifications.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 rounded-2xl bg-[#f5f8fa] p-4 dark:bg-[#071827]/70"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {item.label}
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-[#071827] dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Rental Terms */}
              <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#102b40]">
                <h2 className="text-xl font-extrabold text-[#071827] dark:text-white">
                  Rental Terms & Conditions
                </h2>

                <div className="mt-5 space-y-4">
                  {equipment.rentalTerms.map((term, index) => (
                    <div key={`${index}-${term}`} className="flex gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                        <Check size={13} strokeWidth={3} />
                      </div>

                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {term}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Owner Information */}
              <section className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#102b40]">
                <h2 className="text-xl font-extrabold text-[#071827] dark:text-white">
                  Equipment Owner
                </h2>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00d6a3]/10 text-[#087f68] dark:text-[#00d6a3]">
                      <UserRound size={26} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-[#071827] dark:text-white">
                          {equipment.owner.name}
                        </h3>

                        {equipment.owner.verified && (
                          <BadgeCheck
                            size={17}
                            className="text-[#087f68] dark:text-[#00d6a3]"
                          />
                        )}
                      </div>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Equipment Owner
                      </p>
                    </div>
                  </div>

                  {equipment.owner.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <ShieldCheck size={15} />
                      Verified Owner
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* Booking Sidebar */}
            <aside className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[#102b40] dark:shadow-black/20">
                <div className="bg-gradient-to-br from-[#071827] to-[#102b40] p-6 text-white">
                  <p className="text-sm font-medium text-slate-300">
                    Rental Price
                  </p>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ৳{equipment.price.toLocaleString("en-BD")}
                    </span>

                    <span className="text-sm font-medium text-slate-300">
                      / {equipment.rentalType.toLowerCase()}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                    <MapPin size={15} />
                    {equipment.location}
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  {/* Availability */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Availability Status
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        isEquipmentAvailable
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {isEquipmentAvailable
                        ? `${equipment.availableQuantity} Units`
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-white/10" />

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Customer Rating
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#071827] dark:text-white">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      {equipment.rating} ({equipment.reviewCount})
                    </span>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-white/10" />

                  {/* Rental Type */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Rental Period
                    </span>

                    <span className="text-sm font-bold text-[#071827] dark:text-white">
                      {equipment.rentalType}
                    </span>
                  </div>

                  {/* Booking Button */}
                  <button
                    type="button"
                    disabled={!isEquipmentAvailable}
                    onClick={() => {
                      if (isEquipmentAvailable) {
                        setIsBookingOpen(true);
                      }
                    }}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-4 text-sm font-extrabold text-[#071827] shadow-lg shadow-[#00d6a3]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00bd90] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  >
                    {isEquipmentAvailable
                      ? "Book This Equipment"
                      : "Currently Unavailable"}

                    {isEquipmentAvailable && (
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    <ShieldCheck
                      size={14}
                      className="mr-1 inline-block align-text-bottom"
                    />
                    Secure booking experience
                  </p>

                  <div className="rounded-2xl bg-[#f5f8fa] p-4 dark:bg-[#071827]/70">
                    <div className="flex items-start gap-3">
                      <Truck
                        size={19}
                        className="mt-0.5 shrink-0 text-[#087f68] dark:text-[#00d6a3]"
                      />

                      <div>
                        <p className="text-sm font-bold text-[#071827] dark:text-white">
                          Flexible Rental
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          Choose your preferred rental dates and quantity
                          before confirming your booking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          equipment={equipment}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </>
  );
}
