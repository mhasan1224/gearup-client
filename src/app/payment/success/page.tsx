
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

import {
  getBookingPaymentStatus,
  type BookingPaymentStatus,
} from "@/services/booking-service";

type PaymentState = "loading" | "success" | "pending" | "error";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [paymentState, setPaymentState] =
    useState<PaymentState>("loading");

  const [payment, setPayment] =
    useState<BookingPaymentStatus | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const checkPaymentStatus = useCallback(async () => {
    if (!sessionId) {
      setPaymentState("error");
      setErrorMessage("Payment session ID is missing.");
      return;
    }

    try {
      setIsChecking(true);

      const response = await getBookingPaymentStatus(sessionId);

      setPayment(response.data);

      if (
        response.data.paymentStatus === "paid" &&
        ["confirmed", "active", "completed"].includes(
          response.data.status,
        )
      ) {
        setPaymentState("success");
      } else if (
        response.data.paymentStatus === "unpaid" &&
        response.data.status === "pending"
      ) {
        setPaymentState("pending");
      } else {
        setPaymentState("error");
        setErrorMessage("Payment was not completed successfully.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to verify payment.";

      setErrorMessage(message);
      setPaymentState("error");
      toast.error(message);
    } finally {
      setIsChecking(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void checkPaymentStatus();
  }, [checkPaymentStatus]);

  useEffect(() => {
    if (paymentState !== "pending" || !sessionId) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void checkPaymentStatus();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [paymentState, sessionId, checkPaymentStatus]);

  const formatCurrency = (amount: number) =>
    `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <Navbar />

      <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-7 text-center shadow-sm sm:p-10">
          {paymentState === "loading" && (
            <>
              <Loader2
                size={56}
                className="mx-auto animate-spin text-primary"
              />

              <h1 className="mt-6 font-heading text-2xl font-extrabold text-foreground">
                Verifying Your Payment
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Please wait while we verify your payment with our server.
              </p>
            </>
          )}

          {paymentState === "success" && (
            <>
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 size={46} />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-600">
                Payment Successful
              </p>

              <h1 className="mt-2 font-heading text-3xl font-extrabold text-foreground">
                Booking Confirmed!
              </h1>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Your payment has been verified successfully. Your equipment
                rental booking is now confirmed.
              </p>

              {payment && (
                <div className="mt-7 rounded-xl bg-muted p-5 text-left">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Equipment
                    </span>
                    <span className="text-right font-semibold text-foreground">
                      {payment.equipment?.name || "Equipment Rental"}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Booking Status
                    </span>
                    <span className="font-semibold capitalize text-emerald-600">
                      {payment.status}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Payment Status
                    </span>
                    <span className="font-semibold capitalize text-emerald-600">
                      {payment.paymentStatus}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 border-t border-border pt-4">
                    <span className="font-bold text-foreground">
                      Total Paid
                    </span>
                    <span className="font-heading text-xl font-extrabold text-primary">
                      {formatCurrency(payment.totalAmount)}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck size={16} />
                Payment securely verified by GearUp
              </div>

              <Link
                href="/dashboard/my-rentals"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:brightness-95"
              >
                View My Rentals
              </Link>
            </>
          )}

          {paymentState === "pending" && (
            <>
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <Clock size={44} />
              </div>

              <h1 className="mt-6 font-heading text-2xl font-extrabold text-foreground">
                Payment Verification in Progress
              </h1>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Your payment is being processed. We are waiting for payment
                confirmation from Stripe. This page will automatically
                update when verification is complete.
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-amber-600">
                <Loader2 size={17} className="animate-spin" />
                Checking payment status...
              </div>

              <button
                type="button"
                onClick={() => void checkPaymentStatus()}
                disabled={isChecking}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition hover:bg-muted disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isChecking ? "animate-spin" : ""}
                />
                Check Again
              </button>

              <Link
                href="/dashboard/my-rentals"
                className="mt-4 block text-sm font-semibold text-primary hover:underline"
              >
                View My Rentals
              </Link>
            </>
          )}

          {paymentState === "error" && (
            <>
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <XCircle size={44} />
              </div>

              <h1 className="mt-6 font-heading text-2xl font-extrabold text-foreground">
                Unable to Verify Payment
              </h1>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {errorMessage ||
                  "We could not verify your payment at this time."}
              </p>

              <button
                type="button"
                onClick={() => void checkPaymentStatus()}
                disabled={isChecking}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isChecking ? "animate-spin" : ""}
                />
                Try Again
              </button>

              <Link
                href="/dashboard/my-rentals"
                className="mt-5 block text-sm font-semibold text-primary hover:underline"
              >
                Go to My Rentals
              </Link>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
