
"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface CustomerDashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CustomerDashboardError({
  error,
  reset,
}: CustomerDashboardErrorProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[#102b40] dark:shadow-black/20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
          <AlertTriangle size={30} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Something went wrong
        </p>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#071827] dark:text-white">
          We hit an unexpected error
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          We couldn&apos;t load your dashboard right now. Please try again.
          Your account data has not been intentionally changed by this
          error screen.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-4 break-words rounded-xl bg-slate-100 p-3 text-left text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
            {error.message}
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3 text-sm font-bold text-[#071827] transition-colors hover:bg-[#00bd90]"
          >
            <RefreshCw size={16} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition-colors hover:border-[#00d6a3] hover:text-[#087f68] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00d6a3]"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
