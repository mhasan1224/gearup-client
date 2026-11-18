
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Search,
  MapPin,
  ArrowRight,
  Package,
  Trash2,
  ShoppingCart,
  SlidersHorizontal,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

type SavedEquipment = {
  id: string;
  name: string;
  category: string;
  image: string;
  location: string;
  price: number;
  rentalType: string;
  available: boolean;
  owner: string;
};

const initialSavedEquipment: SavedEquipment[] = [
  {
    id: "equipment-001",
    name: "CAT Excavator 320D",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=700&auto=format&fit=crop&q=80",
    location: "Dhaka, Bangladesh",
    price: 170,
    rentalType: "day",
    available: true,
    owner: "BuildPro Rentals",
  },
  {
    id: "equipment-002",
    name: "Professional DSLR Camera",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80",
    location: "Gazipur, Bangladesh",
    price: 60,
    rentalType: "day",
    available: true,
    owner: "Pixel Equipment",
  },
  {
    id: "equipment-003",
    name: "Industrial Power Generator",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&auto=format&fit=crop&q=80",
    location: "Dhaka, Bangladesh",
    price: 80,
    rentalType: "day",
    available: false,
    owner: "Power Solutions",
  },
  {
    id: "equipment-004",
    name: "Heavy Duty Tractor",
    category: "Agriculture",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=700&auto=format&fit=crop&q=80",
    location: "Mymensingh, Bangladesh",
    price: 140,
    rentalType: "day",
    available: true,
    owner: "AgriTech Rentals",
  },
];

export default function SavedEquipmentPage() {
  const [savedItems, setSavedItems] = useState(initialSavedEquipment);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(savedItems.map((item) => item.category))),
  ];

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return savedItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [savedItems, searchQuery, selectedCategory]);

  function removeSavedItem(id: string) {
    setSavedItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Page heading */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
            <Heart size={14} />
            Your Wishlist
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#071827] dark:text-white sm:text-3xl">
            Saved Equipment
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Keep your favorite equipment close and find it whenever you need.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3 text-sm font-bold text-[#071827] shadow-lg shadow-[#00d6a3]/15 transition-all hover:-translate-y-0.5 hover:bg-[#20e5b5]"
        >
          <Package size={17} />
          Explore Equipment
          <ArrowRight size={15} />
        </Link>
      </motion.section>

      {/* Wishlist summary */}
      <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#071827] via-[#102b40] to-[#087f68] p-6 text-white sm:p-7">
        <div className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full bg-[#00d6a3]/20 blur-3xl" />

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-teal-100">
              <BookmarkCheck size={17} className="text-[#00d6a3]" />
              Your collection
            </div>

            <p className="mt-3 text-3xl font-extrabold">
              {savedItems.length.toString().padStart(2, "0")}
              <span className="ml-2 text-base font-medium text-slate-300">
                Saved items
              </span>
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
              Your favorite rentals, organized in one place. Ready when your
              next project begins.
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 sm:h-24 sm:w-24">
            <Heart
              size={42}
              strokeWidth={1.4}
              className="text-[#00d6a3]"
            />
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#071827] dark:text-white">
              Your Collection
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredItems.length} equipment
              {filteredItems.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search saved equipment..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-[#071827] outline-none transition-all placeholder:text-slate-400 focus:border-[#00d6a3] focus:ring-4 focus:ring-[#00d6a3]/10 dark:border-white/10 dark:bg-[#102b40] dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal
            size={17}
            className="mr-1 shrink-0 text-slate-400"
          />

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[#071827] text-white shadow-md dark:bg-[#00d6a3] dark:text-[#071827]"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Equipment grid */}
      {filteredItems.length > 0 ? (
        <motion.section
          layout
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-white/10 dark:bg-[#102b40] dark:hover:shadow-black/20"
              >
                {/* Equipment image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-lg border border-white/20 bg-[#071827]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {item.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeSavedItem(item.id)}
                    aria-label={`Remove ${item.name} from saved equipment`}
                    title="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/90 text-rose-500 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-rose-50"
                  >
                    <Heart size={19} fill="currentColor" />
                  </button>

                  {!item.available && (
                    <span className="absolute bottom-3 left-3 rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                      Currently unavailable
                    </span>
                  )}
                </div>

                {/* Equipment information */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-lg font-bold text-[#071827] dark:text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Listed by {item.owner}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={14} className="shrink-0 text-[#087f68] dark:text-[#00d6a3]" />
                    {item.location}
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                    <div>
                      <p className="text-xs text-slate-400">Rental price</p>
                      <p className="mt-1 text-xl font-extrabold text-[#071827] dark:text-white">
                        ${item.price}
                        <span className="ml-1 text-xs font-medium text-slate-400">
                          / {item.rentalType}
                        </span>
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        item.available
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/equipment/${item.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-3 text-xs font-bold text-slate-700 transition-colors hover:border-[#00d6a3] hover:text-[#087f68] dark:border-white/10 dark:text-slate-300 dark:hover:text-[#00d6a3]"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      href={`/equipment/${item.id}`}
                      aria-disabled={!item.available}
                      tabIndex={item.available ? undefined : -1}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-xs font-bold transition-all ${
                        item.available
                          ? "bg-[#00d6a3] text-[#071827] hover:bg-[#20e5b5]"
                          : "pointer-events-none bg-slate-100 text-slate-400 dark:bg-white/5"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      {item.available ? "Rent Now" : "Unavailable"}
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSavedItem(item.id)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-rose-500"
                  >
                    <Trash2 size={13} />
                    Remove from saved
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-16 text-center dark:border-white/10 dark:bg-[#102b40]"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-500/10">
            <Heart size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-[#071827] dark:text-white">
            No saved equipment found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            {savedItems.length === 0
              ? "Your wishlist is empty. Explore the marketplace and save equipment you love."
              : "Try another search or category to find your saved equipment."}
          </p>

          {savedItems.length > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#071827] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#102b40] dark:bg-[#00d6a3] dark:text-[#071827]"
            >
              Clear filters
            </button>
          ) : (
            <Link
              href="/equipment"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00d6a3] px-5 py-3 text-sm font-bold text-[#071827] transition-colors hover:bg-[#20e5b5]"
            >
              <Sparkles size={16} />
              Explore Equipment
              <ArrowRight size={15} />
            </Link>
          )}
        </motion.section>
      )}

      {/* Demo data note */}
      <p className="text-center text-xs text-slate-400">
        Wishlist information is currently displayed using demonstration data.
      </p>
    </div>
  );
}
