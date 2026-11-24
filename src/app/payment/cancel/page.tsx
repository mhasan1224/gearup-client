
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CreditCard,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  useEffect(() => {
    toast.info("Payment was not completed. Your booking is still awaiting payment.");
  }, []);

  return (
    <>
      <Navbar />

      <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-7 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
            <XCircle size={46} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-amber-600">
            Payment Not Completed
          </p>

          <h1 className="mt-2 font-heading text-3xl font-extrabold text-foreground">
            Checkout Cancelled
          </h1>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            You left the Stripe checkout before completing your payment.
            No payment confirmation has been received yet.
          </p>

          {bookingId && (
            <div className="mt-7 rounded-xl bg-muted p-4 text-left">
              <p className="text-xs font-semibold text-muted-foreground">
                Booking Reference
              </p>

              <p className="mt-2 break-all font-mono text-sm font-semibold text-foreground">
                {bookingId}
              </p>
            </div>
          )}

          <div className="mt-7 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-left">
            <div className="flex items-start gap-3">
              <Clock
                size={20}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h2 className="text-sm font-bold text-foreground">
                  What happens to your booking?
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your unpaid booking may remain pending until the Stripe
                  checkout session expires. Unpaid bookings are automatically
                  cancelled after the session expires and the webhook is
                  processed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard/my-rentals"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-bold text-primary-foreground transition hover:brightness-95"
            >
              <CreditCard size={17} />
              View My Rentals
            </Link>

            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-4 text-sm font-bold text-foreground transition hover:bg-muted"
            >
              <ShoppingBag size={17} />
              Browse Equipment
            </Link>
          </div>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
