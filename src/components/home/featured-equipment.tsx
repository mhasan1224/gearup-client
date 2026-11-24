
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  ImageOff,
  RefreshCw,
  PackageSearch,
} from "lucide-react";

import { equipmentService } from "@/services/equipment-service";
import type { Equipment } from "@/types/equipment";

export default function FeaturedEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedEquipment = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await equipmentService.getFeatured(6);

        if (!response.success) {
          throw new Error(response.message || "Failed to load equipment.");
        }

        setEquipment(response.data);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load featured equipment.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeaturedEquipment();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  return (
    <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Explore Our Collection
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Equipment
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Discover quality equipment available for your next project.
            </p>
          </div>

          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary-foreground"
          >
            View All Equipment
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading featured equipment"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[4/3] bg-muted" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-1/3 rounded bg-muted" />
                  <div className="h-6 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-10 rounded-lg bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-14 text-center">
            <p className="font-semibold text-foreground">
              Unable to load featured equipment
            </p>

            <p className="mt-2 text-sm text-muted-foreground">{error}</p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : equipment.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <PackageSearch
              size={42}
              className="mx-auto text-muted-foreground"
            />

            <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
              No Featured Equipment Yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Approved equipment will appear here when available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageOff
                        size={40}
                        className="text-muted-foreground"
                      />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold capitalize text-foreground backdrop-blur">
                    {item.category.replaceAll("-", " ")}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 font-heading text-lg font-bold text-foreground">
                    {item.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={15} className="shrink-0 text-primary" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Rental Price
                      </p>

                      <p className="mt-1 font-heading text-xl font-extrabold text-foreground">
                        ${item.rentalPrice.toLocaleString("en-US")}
                        <span className="ml-1 text-xs font-medium text-muted-foreground">
                          / {item.rentalType}
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/equipment/${encodeURIComponent(item.id)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:brightness-95"
                    >
                      Details
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {item.availableQuantity > 0
                      ? `${item.availableQuantity} available`
                      : "Currently unavailable"}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
