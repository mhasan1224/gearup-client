
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EquipmentCard, type EquipmentCardProps } from "@/components/equipment/equipment-card";

const featuredEquipment: EquipmentCardProps[] = [
  {
    id: "excavator-001",
    name: "Hydraulic Excavator",
    category: "Construction",
    location: "Gazipur, Bangladesh",
    price: 12000,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    id: "camera-001",
    name: "Professional DSLR Camera",
    category: "Photography",
    location: "Dhaka, Bangladesh",
    price: 2500,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    id: "tractor-001",
    name: "Heavy Duty Farm Tractor",
    category: "Agriculture",
    location: "Mymensingh, Bangladesh",
    price: 8000,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    id: "drill-001",
    name: "Industrial Power Drill",
    category: "Construction",
    location: "Narayanganj, Bangladesh",
    price: 900,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
  {
    id: "truck-001",
    name: "Commercial Transport Truck",
    category: "Vehicles",
    location: "Dhaka, Bangladesh",
    price: 6500,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85",
    available: false,
  },
  {
    id: "generator-001",
    name: "Industrial Power Generator",
    category: "Electronics",
    location: "Gazipur, Bangladesh",
    price: 1800,
    rentalType: "day",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
    available: true,
  },
];

export function FeaturedEquipment() {
  return (
    <section className="bg-[#f7faf9] px-5 py-20 dark:bg-[#071827] sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-12">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00d6a3]/25 bg-[#00d6a3]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#087f68] dark:text-[#00d6a3]">
              <Sparkles size={13} />
              Explore Our Collection
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#102b40] sm:text-4xl lg:text-5xl dark:text-white">
              Equipment for every{" "}
              <span className="text-[#087f68] dark:text-[#00d6a3]">
                big project.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 dark:text-[#b8c5d1] sm:text-base">
              Discover quality equipment from trusted owners. Find what you
              need, when you need it, without the cost of ownership.
            </p>
          </div>

          <Link
            href="/equipment"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#087f68] transition-colors hover:text-[#00a982] dark:text-[#00d6a3]"
          >
            View All Equipment
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEquipment.map((equipment, index) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
