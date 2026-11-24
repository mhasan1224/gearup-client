
"use client";

import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";

import {
  equipmentCategoryOptions,
  equipmentSortOptions,
  rentalTypeOptions,
} from "@/lib/equipment-filters";

import type { EquipmentQuery } from "@/types/equipment";

interface EquipmentToolbarProps {
  filters: EquipmentQuery;
  onFiltersChange: (filters: EquipmentQuery) => void;
}

export default function EquipmentToolbar({
  filters,
  onFiltersChange,
}: EquipmentToolbarProps) {
  const updateFilter = <K extends keyof EquipmentQuery>(
    key: K,
    value: EquipmentQuery[K],
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-primary" />

          <h2 className="font-heading text-lg font-bold text-foreground">
            Find Your Equipment
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={filters.search ?? ""}
              onChange={(event) =>
                updateFilter("search", event.target.value || undefined)
              }
              placeholder="Search equipment name or location..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div>
            <select
              value={filters.category ?? ""}
              onChange={(event) =>
                updateFilter(
                  "category",
                  (event.target.value || undefined) as
                    | EquipmentQuery["category"]
                    | undefined,
                )
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
            >
              {equipmentCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.rentalType ?? ""}
              onChange={(event) =>
                updateFilter(
                  "rentalType",
                  (event.target.value || undefined) as
                    | EquipmentQuery["rentalType"]
                    | undefined,
                )
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
            >
              {rentalTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              value={filters.minPrice ?? ""}
              onChange={(event) =>
                updateFilter(
                  "minPrice",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              placeholder="Min price"
              aria-label="Minimum price"
              className="h-12 min-w-0 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
            />

            <input
              type="number"
              min="0"
              value={filters.maxPrice ?? ""}
              onChange={(event) =>
                updateFilter(
                  "maxPrice",
                  event.target.value === ""
                    ? undefined
                    : Number(event.target.value),
                )
              }
              placeholder="Max price"
              aria-label="Maximum price"
              className="h-12 min-w-0 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <label className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 text-sm text-foreground">
            <input
              type="checkbox"
              checked={filters.availableOnly ?? false}
              onChange={(event) =>
                updateFilter(
                  "availableOnly",
                  event.target.checked ? true : undefined,
                )
              }
              className="size-4 accent-primary"
            />

            Available only
          </label>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ArrowUpDown size={17} />
            Sort equipment
          </div>

          <select
            value={filters.sortBy ?? "recent"}
            onChange={(event) =>
              updateFilter(
                "sortBy",
                event.target.value as EquipmentQuery["sortBy"],
              )
            }
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary sm:w-64"
          >
            {equipmentSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
