"use client";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export interface EquipmentCardProps {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rentalType: string;
  image: string;
  available: boolean;
}

interface Props {
  equipment: EquipmentCardProps;
  index?: number;
}

export function EquipmentCard({ equipment, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#102b40]"
    >
      <Link
        href={`/equipment/${equipment.id}`}
        className="block"
        aria-label={`View ${equipment.name} details`}
      >
        {/* Equipment Image */}
        <div className="relative h-56 overflow-hidden bg-[#e9eff1]">
          <div
            role="img"
            aria-label={equipment.name}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${equipment.image}')` }}
          />

          <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#071827]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {equipment.category}
          </div>

          <div
            className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold ${
              equipment.available
                ? "bg-[#00d6a3] text-[#071827]"
                : "bg-red-500 text-white"
            }`}
          >
            {equipment.available ? "Available" : "Unavailable"}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        {/* Equipment Information */}
        <div className="p-5">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={14} className="shrink-0 text-[#087f68]" />
            <span className="truncate">{equipment.location}</span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-bold text-[#102b40] transition-colors group-hover:text-[#087f68] dark:text-white">
              {equipment.name}
            </h3>

            <ArrowUpRight
              size={19}
              className="shrink-0 text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#00a982]"
            />
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4 dark:border-white/10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Rental Price
              </p>

              <p className="mt-1 text-xl font-extrabold text-[#087f68] dark:text-[#00d6a3]">
                ৳{equipment.price.toLocaleString("en-BD")}
                <span className="ml-1 text-xs font-medium text-muted-foreground">
                  / {equipment.rentalType}
                </span>
              </p>
            </div>

            <span className="text-xs font-bold text-[#087f68] dark:text-[#00d6a3]">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
