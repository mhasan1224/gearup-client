
"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ImageOff,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

import { useSession } from "@/lib/auth-client";
import { equipmentService } from "@/services/equipment-service";
import { createBooking } from "@/services/booking-service";

import type { Equipment } from "@/types/equipment";
import type { CreateBookingPayload } from "@/types/booking";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export default function EquipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending: isSessionPending } = useSession();

  const equipmentId = params.id;

  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [bookingError, setBookingError] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const userRole = (
    session?.user as { role?: string } | undefined
  )?.role;

  const isCustomer = userRole === "customer";
  const isOwner = userRole === "owner";

  useEffect(() => {
    let isActive = true;

    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await equipmentService.getById(equipmentId);

        if (!response.success) {
          throw new Error(
            response.message || "Unable to load equipment.",
          );
        }

        if (isActive) {
          setEquipment(response.data);
        }
      } catch (error) {
        if (isActive) {
          setPageError(
            error instanceof Error
              ? error.message
              : "Unable to load equipment details.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    if (equipmentId) {
      void fetchEquipment();
    }

    return () => {
      isActive = false;
    };
  }, [equipmentId]);

  const rentalDuration = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end <= start
    ) {
      return 0;
    }

    return Math.ceil((end.getTime() - start.getTime()) / DAY_IN_MS);
  }, [startDate, endDate]);

  const estimatedTotal = useMemo(() => {
    if (!equipment || rentalDuration < 1 || quantity < 1) {
      return 0;
    }

    let dailyRate = equipment.rentalPrice;

    if (equipment.rentalType === "weekly") {
      dailyRate = equipment.rentalPrice / 7;
    } else if (equipment.rentalType === "monthly") {
      dailyRate = equipment.rentalPrice / 30;
    }

    return Math.round(dailyRate * rentalDuration * quantity * 100) / 100;
  }, [equipment, rentalDuration, quantity]);

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setBookingError("");

    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!isCustomer) {
      const message = "Only customers can book equipment.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (!equipment) {
      const message = "Equipment information is not available.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (equipment.owner.id === session.user.id) {
      const message = "You cannot book your own equipment.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (equipment.availableQuantity < 1) {
      const message = "This equipment is currently unavailable.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (!startDate || !endDate) {
      const message = "Please select rental start and end dates.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (
      new Date(`${startDate}T00:00:00`) <
      new Date(new Date().toDateString())
    ) {
      const message = "Rental start date cannot be in the past.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (rentalDuration < 1) {
      const message = "End date must be after start date.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > equipment.availableQuantity
    ) {
      const message = "Please select a valid available quantity.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    if (!phone.trim() || !deliveryAddress.trim()) {
      const message = "Phone number and delivery address are required.";
      setBookingError(message);
      toast.error(message);
      return;
    }

    const payload: CreateBookingPayload = {
      equipmentId: equipment.id,
      startDate: new Date(`${startDate}T00:00:00`).toISOString(),
      endDate: new Date(`${endDate}T00:00:00`).toISOString(),
      quantity,
      phone: phone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      notes: notes.trim(),
    };

    try {
      setIsBooking(true);

      const response = await createBooking(payload);

      if (!response.data.checkoutUrl) {
        throw new Error("Unable to start payment. Please try again.");
      }

      window.location.assign(response.data.checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create booking. Please try again.";

      setBookingError(message);
      toast.error(message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="bg-[#071827] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-[#00D6A3]"
            >
              <ArrowLeft size={17} />
              Back to Equipment
            </Link>

            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D6A3]">
                Equipment Details
              </p>

              <h1 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                Find the Right Equipment for Your Project
              </h1>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {isLoading ? (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="aspect-[4/3] animate-pulse rounded-2xl bg-muted" />
                <div className="space-y-5">
                  <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-40 animate-pulse rounded-2xl bg-muted" />
                </div>
              </div>
            ) : pageError || !equipment ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                <Package size={42} className="mx-auto text-muted-foreground" />

                <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
                  Equipment Not Found
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {pageError || "This equipment may no longer be available."}
                </p>

                <Link
                  href="/equipment"
                  className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  Browse Equipment
                </Link>
              </div>
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-7">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
                    {equipment.image ? (
                      <Image
                        src={equipment.image}
                        alt={equipment.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageOff
                          size={56}
                          className="text-muted-foreground"
                        />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-card/90 px-4 py-2 text-xs font-bold capitalize text-foreground backdrop-blur">
                      {equipment.category.replaceAll("-", " ")}
                    </span>

                    <span
                      className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-bold ${
                        equipment.availableQuantity > 0
                          ? "bg-emerald-500 text-white"
                          : "bg-destructive text-white"
                      }`}
                    >
                      {equipment.availableQuantity > 0
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                          {equipment.name}
                        </h2>

                        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={17} className="text-primary" />
                          {equipment.location}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <p className="text-xs text-muted-foreground">
                          Rental Price
                        </p>

                        <p className="mt-1 font-heading text-2xl font-extrabold text-primary">
                          ${equipment.rentalPrice.toLocaleString("en-US")}
                          <span className="ml-1 text-xs font-semibold text-muted-foreground">
                            / {equipment.rentalType}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        Description
                      </h3>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                        {equipment.description}
                      </p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Condition
                        </p>
                        <p className="mt-1 font-semibold capitalize text-foreground">
                          {equipment.condition}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Brand
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          {equipment.brand || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Model
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          {equipment.model || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Available Quantity
                        </p>
                        <p className="mt-1 font-semibold text-foreground">
                          {equipment.availableQuantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Rental Type
                        </p>
                        <p className="mt-1 font-semibold capitalize text-foreground">
                          {equipment.rentalType}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserRound size={21} />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Equipment Owner
                        </p>
                        <p className="font-bold text-foreground">
                          {equipment.owner.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {equipment.terms && (
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={20} className="text-primary" />
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          Rental Terms
                        </h3>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                        {equipment.terms}
                      </p>
                    </div>
                  )}
                </div>

                <aside className="lg:sticky lg:top-24">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CalendarDays size={22} />
                      </div>

                      <div>
                        <h2 className="font-heading text-xl font-extrabold text-foreground">
                          Book This Equipment
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Select your rental details
                        </p>
                      </div>
                    </div>

                    {!isSessionPending && !session?.user ? (
                      <div className="mt-6 rounded-xl bg-muted p-5 text-center">
                        <p className="text-sm text-muted-foreground">
                          Please log in as a customer to book this equipment.
                        </p>

                        <Link
                          href="/login"
                          className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                        >
                          Login to Book
                        </Link>
                      </div>
                    ) : isSessionPending ? (
                      <div className="mt-6 flex justify-center py-8">
                        <Loader2 className="animate-spin text-primary" />
                      </div>
                    ) : isOwner ? (
                      <p className="mt-6 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                        Owners cannot book equipment. You can manage your own listings from your dashboard.
                      </p>
                    ) : !isCustomer ? (
                      <p className="mt-6 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                        Your account does not have permission to book equipment.
                      </p>
                    ) : equipment.owner.id === session?.user?.id ? (
                      <p className="mt-6 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                        You cannot book your own equipment.
                      </p>
                    ) : equipment.availableQuantity < 1 ? (
                      <p className="mt-6 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
                        This equipment is currently unavailable.
                      </p>
                    ) : (
                      <form
                        onSubmit={handleBooking}
                        className="mt-6 space-y-5"
                      >
                        <div>
                          <label
                            htmlFor="startDate"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Rental Start Date
                          </label>

                          <input
                            id="startDate"
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            value={startDate}
                            onChange={(event) =>
                              setStartDate(event.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="endDate"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Rental End Date
                          </label>

                          <input
                            id="endDate"
                            type="date"
                            required
                            min={
                              startDate ||
                              new Date().toISOString().split("T")[0]
                            }
                            value={endDate}
                            onChange={(event) =>
                              setEndDate(event.target.value)
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="quantity"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Quantity
                          </label>

                          <input
                            id="quantity"
                            type="number"
                            min={1}
                            max={equipment.availableQuantity}
                            required
                            value={quantity}
                            onChange={(event) =>
                              setQuantity(Number(event.target.value))
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Phone Number
                          </label>

                          <input
                            id="phone"
                            type="tel"
                            required
                            minLength={7}
                            maxLength={20}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="deliveryAddress"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Delivery Address
                          </label>

                          <textarea
                            id="deliveryAddress"
                            required
                            minLength={5}
                            maxLength={500}
                            rows={3}
                            value={deliveryAddress}
                            onChange={(event) =>
                              setDeliveryAddress(event.target.value)
                            }
                            placeholder="Enter your complete delivery address"
                            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="notes"
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Additional Notes
                            <span className="ml-1 font-normal text-muted-foreground">
                              (Optional)
                            </span>
                          </label>

                          <textarea
                            id="notes"
                            rows={2}
                            maxLength={1000}
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            placeholder="Any additional information..."
                            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div className="rounded-xl bg-muted p-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Rental Duration
                            </span>
                            <span className="font-semibold text-foreground">
                              {rentalDuration > 0
                                ? `${rentalDuration} day(s)`
                                : "Select dates"}
                            </span>
                          </div>

                          <div className="mt-3 flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Quantity
                            </span>
                            <span className="font-semibold text-foreground">
                              {quantity}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                            <span className="font-bold text-foreground">
                              Estimated Total
                            </span>
                            <span className="font-heading text-xl font-extrabold text-primary">
                              ${estimatedTotal.toLocaleString("en-US")}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-muted-foreground">
                            Final amount will be calculated by the server.
                          </p>
                        </div>

                        {bookingError && (
                          <p
                            role="alert"
                            className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                          >
                            {bookingError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isBooking || rentalDuration < 1}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isBooking ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Redirecting to Checkout...
                            </>
                          ) : (
                            "Continue to Payment"
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
