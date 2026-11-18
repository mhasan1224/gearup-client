"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Package,
  ShieldCheck,
  X,
} from "lucide-react";
import type { Equipment } from "@/types/equipment";

interface BookingModalProps {
  equipment: Equipment;
  onClose: () => void;
}

interface BookingFormValues {
  startDate: string;
  endDate: string;
  quantity: number;
  contactNumber: string;
  deliveryAddress: string;
  notes: string;
}

function getRentalDuration(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const difference =
    Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
    Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export function BookingModal({ equipment, onClose }: BookingModalProps) {
  const [formValues, setFormValues] = useState<BookingFormValues>({
    startDate: "",
    endDate: "",
    quantity: 1,
    contactNumber: "",
    deliveryAddress: "",
    notes: "",
  });

  const [showReview, setShowReview] = useState(false);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const rentalDays = getRentalDuration(
    formValues.startDate,
    formValues.endDate,
  );

  const rentalPeriods =
    rentalDays > 0
      ? equipment.rentalType === "Weekly"
        ? Math.ceil(rentalDays / 7)
        : equipment.rentalType === "Monthly"
          ? Math.ceil(rentalDays / 30)
          : rentalDays
      : 0;

  const totalPrice = equipment.price * rentalPeriods * formValues.quantity;

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K],
  ) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rentalDays <= 0) return;

    setShowReview(true);
  };

  const formattedPrice = (price: number) => `৳${price.toLocaleString("en-BD")}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#071827]/75 p-3 backdrop-blur-sm sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)] dark:bg-[#102b40]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#071827] to-[#102b40] p-6 text-white sm:p-8">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#00d6a3]/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00d6a3]">
                  <CalendarDays size={15} />
                  GearUp Booking
                </div>

                <h2
                  id="booking-modal-title"
                  className="mt-3 text-2xl font-extrabold sm:text-3xl"
                >
                  {showReview ? "Review Your Booking" : "Book Equipment"}
                </h2>

                <p className="mt-2 text-sm text-white/65">
                  {showReview
                    ? "Check your rental information before proceeding."
                    : "Choose your rental dates and provide your details."}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={19} />
              </button>
            </div>

            <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00d6a3]/15 text-[#00d6a3]">
                <Package size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold">{equipment.name}</h3>
                <p className="mt-1 text-xs text-white/60">
                  {equipment.location}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-extrabold text-[#00d6a3]">
                  {formattedPrice(equipment.price)}
                </p>
                <p className="text-[11px] text-white/55">
                  / {equipment.rentalType.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {!showReview ? (
            <form onSubmit={handleReview} className="p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    required
                    value={formValues.startDate}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(event) => {
                      updateField("startDate", event.target.value);
                      updateField("endDate", "");
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    required
                    value={formValues.endDate}
                    min={
                      formValues.startDate
                        ? new Date(
                            new Date(
                              `${formValues.startDate}T00:00:00`,
                            ).getTime() + 86400000,
                          ).toLocaleDateString("en-CA")
                        : new Date().toLocaleDateString("en-CA")
                    }
                    disabled={!formValues.startDate}
                    onChange={(event) =>
                      updateField("endDate", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    Equipment Quantity
                  </label>
                  <select
                    id="quantity"
                    value={formValues.quantity}
                    onChange={(event) =>
                      updateField("quantity", Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  >
                    {Array.from(
                      { length: equipment.availableQuantity },
                      (_, index) => index + 1,
                    ).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity} {quantity === 1 ? "Unit" : "Units"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    Contact Number
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    required
                    minLength={7}
                    maxLength={20}
                    placeholder="+880 1XXXXXXXXX"
                    value={formValues.contactNumber}
                    onChange={(event) =>
                      updateField("contactNumber", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="deliveryAddress"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-4 text-slate-400"
                    />
                    <input
                      id="deliveryAddress"
                      type="text"
                      required
                      minLength={5}
                      placeholder="Enter your complete delivery address"
                      value={formValues.deliveryAddress}
                      onChange={(event) =>
                        updateField("deliveryAddress", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-sm font-bold text-[#102b40] dark:text-white"
                  >
                    Additional Notes
                    <span className="ml-2 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    maxLength={500}
                    placeholder="Any special requirements or delivery instructions?"
                    value={formValues.notes}
                    onChange={(event) =>
                      updateField("notes", event.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#00d6a3] focus:ring-2 focus:ring-[#00d6a3]/15 dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>
              </div>

              {rentalDays > 0 && (
                <div className="mt-6 rounded-2xl bg-[#e1f8f1] p-4 dark:bg-[#00d6a3]/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#087f68] dark:text-[#00d6a3]">
                        Estimated Rental Cost
                      </p>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {rentalPeriods} {equipment.rentalType.toLowerCase()}{" "}
                        period(s)
                        {" × "}
                        {formValues.quantity} unit(s)
                      </p>
                    </div>

                    <p className="text-xl font-extrabold text-[#087f68] dark:text-[#00d6a3]">
                      {formattedPrice(totalPrice)}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={rentalDays <= 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-4 text-sm font-extrabold text-[#071827] transition-all hover:bg-[#00bd90] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Review Booking
                <ArrowRight size={18} />
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                <ShieldCheck size={14} className="mr-1 inline" />
                Your booking details will be reviewed before payment.
              </p>
            </form>
          ) : (
            <div className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#e1f8f1] p-4 dark:bg-[#00d6a3]/10">
                <CheckCircle2
                  size={23}
                  className="shrink-0 text-[#087f68] dark:text-[#00d6a3]"
                />
                <div>
                  <p className="text-sm font-bold text-[#087f68] dark:text-[#00d6a3]">
                    Booking details ready for review
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Please verify the information below.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ["Equipment", equipment.name],
                  ["Start Date", formValues.startDate],
                  ["End Date", formValues.endDate],
                  ["Rental Duration", `${rentalDays} days`],
                  [
                    "Rental Periods",
                    `${rentalPeriods} ${equipment.rentalType}`,
                  ],
                  ["Quantity", `${formValues.quantity} unit(s)`],
                  ["Contact", formValues.contactNumber],
                  ["Delivery Address", formValues.deliveryAddress],
                  ["Additional Notes", formValues.notes || "None"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col justify-between gap-1 border-b border-slate-100 pb-3 text-sm sm:flex-row sm:gap-4 dark:border-white/10"
                  >
                    <span className="text-slate-500 dark:text-slate-400">
                      {label}
                    </span>
                    <span className="break-words font-semibold text-[#102b40] sm:max-w-[60%] sm:text-right dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#071827] p-5 text-white">
                <p className="text-sm text-white/60">Estimated Total</p>
                <p className="mt-2 text-3xl font-extrabold text-[#00d6a3]">
                  {formattedPrice(totalPrice)}
                </p>
                <p className="mt-2 text-xs text-white/50">
                  Final amount and availability will be verified by the server.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowReview(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  <ArrowLeft size={17} />
                  Edit Details
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3.5 text-sm font-extrabold text-[#071827] transition-colors hover:bg-[#00bd90]"
                >
                  Close Preview
                  <CheckCircle2 size={17} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
