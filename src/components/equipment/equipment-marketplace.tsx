
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PackageSearch,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";

import { EquipmentCard } from "@/components/equipment/equipment-card";
import { EquipmentFilters } from "@/components/equipment/equipment-filters";
import { EquipmentSort } from "@/components/equipment/equipment-sort";
import { equipmentData } from "@/data/equipment";
import {
  filterEquipment,
  sortEquipment,
} from "@/lib/equipment-utils";
import type {
  EquipmentFilterValues,
  EquipmentSortOption,
} from "@/types/equipment";

const initialFilters: EquipmentFilterValues = {
  search: "",
  category: "All",
  rentalType: "All",
  minPrice: 0,
  maxPrice: 50000,
  availability: "All",
};

const ITEMS_PER_PAGE = 9;

export function EquipmentMarketplace() {
  const [filters, setFilters] =
    useState<EquipmentFilterValues>(initialFilters);

  const [sortBy, setSortBy] =
    useState<EquipmentSortOption>("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredEquipment = useMemo(() => {
    return filterEquipment(equipmentData, filters);
  }, [filters]);

  const sortedEquipment = useMemo(() => {
    return sortEquipment(filteredEquipment, sortBy);
  }, [filteredEquipment, sortBy]);

  const totalPages = Math.ceil(
    sortedEquipment.length / ITEMS_PER_PAGE,
  );

  const paginatedEquipment = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return sortedEquipment.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
  }, [sortedEquipment, currentPage]);

  const handleFilterChange = (newFilters: EquipmentFilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (value: EquipmentSortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#F7FAFC] dark:bg-[#071827]">
      {/* Marketplace Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071827] via-[#102B40] to-[#071827] px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#00D6A3]/10 blur-[100px]" />

        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#00D6A3]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00D6A3]/20 bg-[#00D6A3]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#00D6A3]">
              <SlidersHorizontal size={13} />
              Equipment Marketplace
            </span>

            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the right tools.
              <span className="mt-1.5 block text-gradient-teal">
                Make great things happen.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#B8C5D1] sm:text-base">
              Explore quality equipment from trusted owners.
              Flexible rental periods, transparent pricing, and
              everything you need to get your next project moving.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-[#B8C5D1] sm:text-sm">
              <span className="flex items-center gap-2">
                <PackageSearch
                  size={16}
                  className="text-[#00D6A3]"
                />
                {equipmentData.length} equipment listings
              </span>

              <span className="h-1 w-1 rounded-full bg-[#00D6A3]" />

              <span>Flexible rental periods</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[290px_minmax(0,1fr)] xl:gap-10">
          {/* Filters */}
          <div className="space-y-4">
            <EquipmentFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              resultCount={sortedEquipment.length}
            />
          </div>

          {/* Equipment Results */}
          <div className="min-w-0">
            <div className="mb-7">
              <EquipmentSort
                sortBy={sortBy}
                onSortChange={handleSortChange}
                resultCount={sortedEquipment.length}
              />
            </div>

            {paginatedEquipment.length > 0 ? (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {paginatedEquipment.map((equipment, index) => (
                    <EquipmentCard
                      key={equipment.id}
                      equipment={equipment}
                      index={index}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() =>
                        handlePageChange(currentPage - 1)
                      }
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#071827] transition-colors hover:border-[#00D6A3] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white"
                    >
                      Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        onClick={() => handlePageChange(page)}
                        className={`h-11 w-11 rounded-xl text-sm font-bold transition-colors ${
                          currentPage === page
                            ? "bg-[#00D6A3] text-[#071827]"
                            : "border border-gray-200 text-[#071827] hover:border-[#00D6A3] dark:border-white/10 dark:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        handlePageChange(currentPage + 1)
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#071827] transition-colors hover:border-[#00D6A3] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white"
                    >
                      Next
                      <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center dark:border-white/10 dark:bg-[#102B40]/50">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]">
                  <PackageSearch size={36} />
                </div>

                <h2 className="text-2xl font-bold text-[#071827] dark:text-white">
                  No equipment found
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                  We couldn&apos;t find any equipment matching your
                  current filters. Try changing your search or
                  adjusting the price range.
                </p>

                <button
                  type="button"
                  onClick={() => handleFilterChange(initialFilters)}
                  className="mt-7 rounded-xl bg-[#00D6A3] px-6 py-3 text-sm font-bold text-[#071827] transition-colors hover:bg-[#35E8BE]"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#071827] to-[#102B40] p-7 sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    Have equipment to rent?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#B8C5D1]">
                    List your equipment and start earning with GearUp.
                  </p>
                </div>

                <Link
                  href="/register"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-6 py-3.5 text-sm font-bold text-[#071827] transition-all hover:bg-[#35E8BE] hover:shadow-[0_0_25px_rgba(0,214,163,0.2)]"
                >
                  List Your Equipment
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
