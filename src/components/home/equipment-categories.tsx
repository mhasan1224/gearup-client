
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Construction,
  Tractor,
  CarFront,
  Cpu,
  PartyPopper,
} from "lucide-react";

const categories = [
  {
    name: "Construction",
    description: "Power your next construction project.",
    count: "Heavy machinery & tools",
    icon: Construction,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Photography",
    description: "Capture every important moment.",
    count: "Cameras & studio gear",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Vehicles & Transportation",
    description: "Move people, goods and projects.",
    count: "Cars, trucks & more",
    icon: CarFront,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Agriculture",
    description: "Make farming more efficient.",
    count: "Tractors & farm equipment",
    icon: Tractor,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Electronics",
    description: "Get the technology you need.",
    count: "Generators & electronics",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Event Equipment",
    description: "Bring every event to life.",
    count: "Audio, lighting & staging",
    icon: PartyPopper,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
  },
];

export function EquipmentCategories() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#102b40] sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-12">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087f68] dark:text-[#00d6a3]">
              <span className="h-px w-7 bg-[#00d6a3]" />
              Find What You Need
            </span>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#102b40] sm:text-4xl lg:text-5xl dark:text-white">
              Explore by{" "}
              <span className="text-gradient-teal">category.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 dark:text-[#b8c5d1] sm:text-base">
              From professional tools to heavy machinery, discover equipment
              for every kind of work and occasion.
            </p>
          </div>

          <Link
            href="/equipment"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#087f68] transition-colors hover:text-[#00a982] dark:text-[#00d6a3]"
          >
            Browse All Categories
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/equipment?category=${encodeURIComponent(category.name)}`}
                className="group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl bg-[#071827] p-6 sm:min-h-[290px] lg:p-7"
              >
                <div
                  className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                  role="img"
                  aria-label={category.name}
                />

                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071827] via-[#071827]/65 to-[#071827]/10 transition-colors duration-300 group-hover:from-[#071827]/95" />

                <div className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#00d6a3] backdrop-blur-md transition-all duration-300 group-hover:border-[#00d6a3]/50 group-hover:bg-[#00d6a3] group-hover:text-[#071827]">
                  <Icon size={21} />
                </div>

                <div className="relative">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00d6a3]">
                    {category.count}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                      {category.name}
                    </h3>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-[#00d6a3] group-hover:bg-[#00d6a3] group-hover:text-[#071827]">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-white/65">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
