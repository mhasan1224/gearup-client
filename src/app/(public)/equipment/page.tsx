
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PackageSearch,
  RefreshCw,
  Search,
} from "lucide-react";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import EquipmentCard from "@/components/equipment/equipment-card";
import EquipmentToolbar from "@/components/equipment/equipment-toolbar";

import { useSession } from "@/lib/auth-client";
import { equipmentService } from "@/services/equipment-service";
import { getMyFavorites } from "@/services/favorite-service";

import type {
  Equipment,
  EquipmentQuery,
} from "@/types/equipment";

export default function EquipmentPage() {
  const { data: session } = useSession();

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const [filters, setFilters] = useState<EquipmentQuery>({
    sortBy: "recent",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  // Load equipment
  useEffect(() => {
    const controller = new AbortController();

    const fetchEquipment = async () => {
      if (
        filters.minPrice !== undefined &&
        filters.maxPrice !== undefined &&
        filters.minPrice > filters.maxPrice
      ) {
        setEquipment([]);
        setTotal(0);
        setError("Minimum price cannot exceed maximum price.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await equipmentService.getAll(
          filters,
          controller.signal,
        );

        if (!response.success) {
          throw new Error(
            response.message || "Failed to load equipment.",
          );
        }

        if (controller.signal.aborted) return;

        setEquipment(response.data);
        setTotal(response.meta.total);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load equipment.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      void fetchEquipment();
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [filters, retryCount]);

  // Load customer's existing favorites
  useEffect(() => {
    let isActive = true;

    const fetchFavorites = async () => {
      const userRole = (
        session?.user as { role?: string } | undefined
      )?.role;

      if (!session?.user || userRole !== "customer") {
        setFavoriteIds([]);
        return;
      }

      try {
        const response = await getMyFavorites();

        if (!isActive) return;

        setFavoriteIds(
          response.data.map(
            (favorite) => favorite.equipment._id,
          ),
        );
      } catch {
        if (isActive) {
          setFavoriteIds([]);
        }
      }
    };

    void fetchFavorites();

    return () => {
      isActive = false;
    };
  }, [session?.user]);

  // Update favorite state after adding
  const handleFavoriteAdded = (equipmentId: string) => {
    setFavoriteIds((current) =>
      current.includes(equipmentId)
        ? current
        : [...current, equipmentId],
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex-1 bg-background">
        <section className="relative overflow-hidden bg-[#071827] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-[#00D6A3]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D6A3]">
                Explore Our Collection
              </span>

              <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find the Right Equipment for Your Next Project
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Explore quality equipment from verified owners.
                Compare rental prices, availability and find what
                your project needs.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EquipmentToolbar
              filters={filters}
              onFiltersChange={setFilters}
            />

            <div className="mb-7 mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-foreground">
                  Available Equipment
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {isLoading
                    ? "Finding equipment..."
                    : `${total} equipment found`}
                </p>
              </div>
            </div>

            {isLoading ? (
              <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="Loading equipment"
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
              <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-16 text-center">
                <p className="font-semibold text-foreground">
                  Unable to load equipment
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setRetryCount((count) => count + 1)
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              </div>
            ) : equipment.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <PackageSearch
                  size={44}
                  className="mx-auto text-muted-foreground"
                />

                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                  No Equipment Found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your search or filters to find
                  available equipment.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setFilters({ sortBy: "recent" })
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                >
                  <Search size={16} />
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {equipment.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                  >
                    <EquipmentCard
                      equipment={item}
                      isFavorite={favoriteIds.includes(item.id)}
                      onFavoriteAdded={handleFavoriteAdded}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
