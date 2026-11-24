
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HardHat,
  Camera,
  Truck,
  Tractor,
  Laptop,
  PartyPopper,
  ArrowUpRight,
} from "lucide-react";

import { equipmentCategories } from "@/lib/equipment-categories";

const categoryIcons = {
  "hard-hat": HardHat,
  camera: Camera,
  truck: Truck,
  tractor: Tractor,
  laptop: Laptop,
  "party-popper": PartyPopper,
};

export default function CategorySection() {
  return (
    <section className="bg-muted/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Explore Categories
          </span>

          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Find Equipment for Every Need
          </h2>

          <p className="mt-4 text-muted-foreground">
            Explore equipment across different industries and find what your
            next project needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {equipmentCategories.map((category, index) => {
            const Icon =
              categoryIcons[category.icon as keyof typeof categoryIcons];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link
                  href={`/equipment?category=${encodeURIComponent(category.id)}`}
                  className="group flex h-full min-h-48 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:min-h-56 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:size-14">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="font-heading text-base font-bold text-foreground sm:text-xl">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
