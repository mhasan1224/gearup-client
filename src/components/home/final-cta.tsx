
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#071827] px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,214,163,0.12),transparent_65%)]" />

      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#087F68]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#00D6A3]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#00D6A3]/20 bg-gradient-to-br from-[#102B40] via-[#0b2235] to-[#071827] px-6 py-14 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#00D6A3]/10" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-[#00D6A3]/10" />

        <div className="relative">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00D6A3]/30 bg-[#00D6A3]/10 text-[#00D6A3] shadow-[0_0_35px_rgba(0,214,163,0.12)]">
            <Zap size={27} fill="currentColor" />
          </div>

          <span className="inline-flex rounded-full border border-[#00D6A3]/25 bg-[#00D6A3]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00D6A3]">
            Make Your Next Move
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your next project deserves the
            <span className="text-gradient-teal"> right equipment.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#B8C5D1] sm:text-lg">
            Find the equipment you need or turn your idle equipment into an
            earning opportunity. Get started with GearUp today.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/equipment"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-7 py-4 text-sm font-bold text-[#071827] transition-all duration-300 hover:-translate-y-1 hover:bg-[#35E8BE] hover:shadow-[0_12px_35px_rgba(0,214,163,0.2)]"
            >
              Explore Equipment
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#00D6A3]/50 hover:bg-white/[0.09]"
            >
              List Your Equipment
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#B8C5D1]">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#00D6A3]" />
              Flexible rental options
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#00D6A3]" />
              Convenient online booking
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#00D6A3]" />
              Secure payment experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
