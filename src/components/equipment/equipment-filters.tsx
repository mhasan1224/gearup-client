
"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from "lucide-react";
import type {
  EquipmentCategory,
  EquipmentFilterValues,
  RentalType,
} from "@/types/equipment";

interface EquipmentFiltersProps {
  filters: EquipmentFilterValues;
  onFilterChange: (filters: EquipmentFilterValues) => void;
  resultCount: number;
}

const categories: (EquipmentCategory | "All")[] = [
  "All",
  "Construction",
  "Photography",
  "Vehicles & Transportation",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];

const rentalTypes: (RentalType | "All")[] = [
  "All",
  "Daily",
  "Weekly",
  "Monthly",
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#071827] outline-none transition-all placeholder:text-gray-400 focus:border-[#00D6A3] focus:ring-2 focus:ring-[#00D6A3]/15 dark:border-white/10 dark:bg-[#102B40] dark:text-white";

export function EquipmentFilters({
  filters,
  onFilterChange,
  resultCount,
}: EquipmentFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = <K extends keyof EquipmentFilterValues>(
    key: K,
    value: EquipmentFilterValues[K],
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFilterChange({
      search: "",
      category: "All",
      rentalType: "All",
      minPrice: 0,
      maxPrice: 50000,
      availability: "All",
    });
  };

  const filterContent = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#071827] dark:text-white">
          Search Equipment
        </label>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            placeholder="Equipment name or location..."
            className={`${inputClass} pl-11`}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="equipment-category"
          className="mb-2 block text-sm font-semibold text-[#071827] dark:text-white"
        >
          Equipment Category
        </label>

        <select
          id="equipment-category"
          value={filters.category}
          onChange={(event) =>
            updateFilter(
              "category",
              event.target.value as EquipmentCategory | "All",
            )
          }
          className={inputClass}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="rental-type"
          className="mb-2 block text-sm font-semibold text-[#071827] dark:text-white"
        >
          Rental Period
        </label>

        <select
          id="rental-type"
          value={filters.rentalType}
          onChange={(event) =>
            updateFilter(
              "rentalType",
              event.target.value as RentalType | "All",
            )
          }
          className={inputClass}
        >
          {rentalTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All Rental Types" : type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-3 block text-sm font-semibold text-[#071827] dark:text-white">
          Price Range (৳)
        </label>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="min-price"
              className="mb-1 block text-xs text-gray-500"
            >
              Minimum
            </label>

            <input
              id="min-price"
              type="number"
              min={0}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(event) =>
                updateFilter(
                  "minPrice",
                  Math.min(
                    filters.maxPrice,
                    Math.max(0, Number(event.target.value)),
                  ),
                )
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="max-price"
              className="mb-1 block text-xs text-gray-500"
            >
              Maximum
            </label>

            <input
              id="max-price"
              type="number"
              min={filters.minPrice}
              value={filters.maxPrice}
              onChange={(event) =>
                updateFilter(
                  "maxPrice",
                  Math.max(
                    filters.minPrice,
                    Number(event.target.value),
                  ),
                )
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="availability"
          className="mb-2 block text-sm font-semibold text-[#071827] dark:text-white"
        >
          Availability
        </label>

        <select
          id="availability"
          value={filters.availability}
          onChange={(event) =>
            updateFilter(
              "availability",
              event.target.value as EquipmentFilterValues["availability"],
            )
          }
          className={inputClass}
        >
          <option value="All">All Equipment</option>
          <option value="Available">Available Only</option>
          <option value="Unavailable">Unavailable Only</option>
        </select>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#00D6A3]/30 bg-[#00D6A3]/5 px-4 py-3 text-sm font-semibold text-[#087F68] transition-colors hover:bg-[#00D6A3]/10 dark:text-[#00D6A3]"
      >
        <RotateCcw size={16} />
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      <div className="flex items-center justify-between lg:hidden">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {resultCount} equipment found
        </p>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#071827] dark:border-white/10 dark:text-white"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      <aside className="hidden h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#071827] lg:block">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#071827] dark:text-white">
            Filters
          </h2>

          <SlidersHorizontal
            size={19}
            className="text-[#00B887]"
          />
        </div>

        {filterContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 dark:bg-[#071827]"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="mobile-filter-title"
                className="text-lg font-bold text-[#071827] dark:text-white"
              >
                Filter Equipment
              </h2>

              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {filterContent}

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#00D6A3] px-5 py-3.5 text-sm font-bold text-[#071827] transition-colors hover:bg-[#35E8BE]"
            >
              Show {resultCount} Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
