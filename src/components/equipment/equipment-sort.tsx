
"use client";

import { ArrowDownWideNarrow } from "lucide-react";
import type { EquipmentSortOption } from "@/types/equipment";

interface EquipmentSortProps {
  sortBy: EquipmentSortOption;
  onSortChange: (value: EquipmentSortOption) => void;
  resultCount: number;
}

export function EquipmentSort({
  sortBy,
  onSortChange,
  resultCount,
}: EquipmentSortProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-[#071827] dark:text-white">
          {resultCount}
        </span>{" "}
        equipment items
      </p>

      <div className="flex items-center gap-3">
        <ArrowDownWideNarrow
          size={18}
          className="shrink-0 text-[#00D6A3]"
        />

        <label
          htmlFor="equipment-sort"
          className="shrink-0 text-sm font-medium text-[#071827] dark:text-white"
        >
          Sort by:
        </label>

        <select
          id="equipment-sort"
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value as EquipmentSortOption)
          }
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#071827] outline-none transition-colors focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#102B40] dark:text-white sm:flex-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
}
