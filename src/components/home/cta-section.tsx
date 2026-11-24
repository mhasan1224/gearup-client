
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-[#F5F8FA] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#071827] via-[#102B40] to-[#087F68] px-6 py-16 text-center shadow-2xl shadow-slate-300/40 sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#00D6A3]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-[#00D6A3]/10 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-[#00D6A3]/20 bg-[#00D6A3]/10 text-[#00D6A3]">
            <Sparkles size={26} />
          </div>

          <h2 className="mt-7 font-[var(--font-manrope)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready for Your Next Project?
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Find the equipment you need, book it for your preferred dates,
            and focus on getting the job done.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/equipment"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-7 py-3.5 font-bold text-[#071827] transition hover:bg-[#33E5BC] sm:w-auto"
            >
              Explore Equipment
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-[#00D6A3] hover:bg-white/5 sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
