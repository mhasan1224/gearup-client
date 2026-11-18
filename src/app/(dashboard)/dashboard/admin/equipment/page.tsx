
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Eye,
  Filter,
  Package,
  Search,
  ShieldCheck,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

type EquipmentStatus = "Pending" | "Approved" | "Rejected";

type Equipment = {
  id: string;
  name: string;
  category: string;
  owner: string;
  ownerEmail: string;
  location: string;
  price: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  quantity: number;
  condition: "New" | "Excellent" | "Good" | "Fair";
  status: EquipmentStatus;
  submitted: string;
  image: string;
  description: string;
};

const initialEquipment: Equipment[] = [
  {
    id: "EQ-1001",
    name: "CAT 320 Excavator",
    category: "Construction",
    owner: "Robert Johnson",
    ownerEmail: "robert@example.com",
    location: "New York, USA",
    price: 250,
    rentalType: "Daily",
    quantity: 2,
    condition: "Excellent",
    status: "Pending",
    submitted: "Nov 19, 2026",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=85",
    description:
      "A powerful hydraulic excavator suitable for construction, earthmoving and heavy-duty site operations.",
  },
  {
    id: "EQ-1002",
    name: "Canon EOS R5 Camera",
    category: "Photography",
    owner: "Emma Davis",
    ownerEmail: "emma@example.com",
    location: "London, UK",
    price: 85,
    rentalType: "Daily",
    quantity: 3,
    condition: "Excellent",
    status: "Pending",
    submitted: "Nov 18, 2026",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    description:
      "Professional mirrorless camera for photography, commercial shoots and video production.",
  },
  {
    id: "EQ-1003",
    name: "John Deere Tractor",
    category: "Agriculture",
    owner: "Daniel Brown",
    ownerEmail: "daniel@example.com",
    location: "Dallas, USA",
    price: 180,
    rentalType: "Daily",
    quantity: 1,
    condition: "Good",
    status: "Approved",
    submitted: "Nov 17, 2026",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",
    description:
      "Reliable agricultural tractor for farm preparation, field work and general agricultural operations.",
  },
  {
    id: "EQ-1004",
    name: "Honda Generator 7.5kW",
    category: "Electronics",
    owner: "William Brown",
    ownerEmail: "william@example.com",
    location: "Chicago, USA",
    price: 65,
    rentalType: "Daily",
    quantity: 4,
    condition: "Good",
    status: "Approved",
    submitted: "Nov 16, 2026",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
    description:
      "Portable power generator suitable for construction sites, outdoor activities and backup power.",
  },
  {
    id: "EQ-1005",
    name: "DJI Mavic 3 Drone",
    category: "Photography",
    owner: "Sophia Chen",
    ownerEmail: "sophia@example.com",
    location: "Toronto, Canada",
    price: 120,
    rentalType: "Daily",
    quantity: 2,
    condition: "New",
    status: "Rejected",
    submitted: "Nov 15, 2026",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=85",
    description:
      "A professional drone for aerial photography, videography and outdoor inspections.",
  },
  {
    id: "EQ-1006",
    name: "JCB Backhoe Loader",
    category: "Construction",
    owner: "Noah Williams",
    ownerEmail: "noah@example.com",
    location: "Manchester, UK",
    price: 210,
    rentalType: "Daily",
    quantity: 1,
    condition: "Fair",
    status: "Pending",
    submitted: "Nov 14, 2026",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=85",
    description:
      "Multipurpose loader for excavation, material handling and construction work.",
  },
  {
    id: "EQ-1007",
    name: "Professional Sound System",
    category: "Event Equipment",
    owner: "Isabella Anderson",
    ownerEmail: "isabella@example.com",
    location: "Lisbon, Portugal",
    price: 95,
    rentalType: "Daily",
    quantity: 5,
    condition: "Excellent",
    status: "Approved",
    submitted: "Nov 13, 2026",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    description:
      "Professional audio equipment for concerts, conferences and private events.",
  },
  {
    id: "EQ-1008",
    name: "Toyota Hiace Van",
    category: "Vehicles & Transportation",
    owner: "Lucas Martin",
    ownerEmail: "lucas@example.com",
    location: "Paris, France",
    price: 140,
    rentalType: "Daily",
    quantity: 2,
    condition: "Good",
    status: "Pending",
    submitted: "Nov 12, 2026",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85",
    description:
      "Spacious transport vehicle suitable for group travel and equipment transportation.",
  },
];

const PAGE_SIZE = 6;

function StatusBadge({ status }: { status: EquipmentStatus }) {
  const styles: Record<EquipmentStatus, string> = {
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    Approved:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    Rejected:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  const Icon =
    status === "Pending"
      ? Clock3
      : status === "Approved"
        ? CheckCircle2
        : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  description: string;
  icon: typeof Package;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={21} />
        </div>
        <span className="text-[10px] text-slate-400">Marketplace</span>
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value.toLocaleString("en-US")}
      </p>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
    </div>
  );
}

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment | null>(null);
  const [editingEquipment, setEditingEquipment] =
    useState<Equipment | null>(null);
  const [deletingEquipment, setDeletingEquipment] =
    useState<Equipment | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    quantity: "",
    condition: "Good" as Equipment["condition"],
  });

  const summary = useMemo(
    () => ({
      total: equipment.length,
      approved: equipment.filter((item) => item.status === "Approved").length,
      pending: equipment.filter((item) => item.status === "Pending").length,
      rejected: equipment.filter((item) => item.status === "Rejected").length,
    }),
    [equipment],
  );

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const searchValue = search.toLowerCase();

      const searchMatch =
        item.name.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue) ||
        item.owner.toLowerCase().includes(searchValue) ||
        item.location.toLowerCase().includes(searchValue) ||
        item.id.toLowerCase().includes(searchValue);

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" || item.category === categoryFilter;

      return searchMatch && statusMatch && categoryMatch;
    });
  }, [equipment, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEquipment.length / PAGE_SIZE),
  );

  const paginatedEquipment = filteredEquipment.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateStatus = (
    id: string,
    status: EquipmentStatus,
  ) => {
    setEquipment((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    );

    toast.success(`Equipment ${status.toLowerCase()} successfully.`);
    setSelectedEquipment(null);
  };

  const openEditModal = (item: Equipment) => {
    setEditingEquipment(item);
    setEditForm({
      name: item.name,
      category: item.category,
      location: item.location,
      price: String(item.price),
      quantity: String(item.quantity),
      condition: item.condition,
    });
  };

  const saveEquipmentChanges = () => {
    if (!editingEquipment) return;

    const price = Number(editForm.price);
    const quantity = Number(editForm.quantity);

    if (
      !editForm.name.trim() ||
      !editForm.category ||
      !editForm.location.trim() ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      toast.error("Please enter valid equipment information.");
      return;
    }

    setEquipment((current) =>
      current.map((item) =>
        item.id === editingEquipment.id
          ? {
              ...item,
              name: editForm.name.trim(),
              category: editForm.category,
              location: editForm.location.trim(),
              price,
              quantity,
              condition: editForm.condition,
            }
          : item,
      ),
    );

    toast.success("Equipment information updated.");
    setEditingEquipment(null);
  };

  const deleteEquipment = () => {
    if (!deletingEquipment) return;

    setEquipment((current) =>
      current.filter((item) => item.id !== deletingEquipment.id),
    );

    toast.success("Equipment listing deleted.");
    setDeletingEquipment(null);
  };

  const selectFilter = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="space-y-7 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-teal">
            <Package size={15} />
            MARKETPLACE MANAGEMENT
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Equipment Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review owner listings and manage marketplace equipment.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <ShieldCheck size={17} className="text-brand-teal" />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Admin Review Center
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Equipment"
          value={summary.total}
          description="All marketplace listings"
          icon={Package}
          color="bg-blue-500/10 text-blue-500"
        />
        <SummaryCard
          title="Approved"
          value={summary.approved}
          description="Visible in marketplace"
          icon={CheckCircle2}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <SummaryCard
          title="Pending Review"
          value={summary.pending}
          description="Waiting for admin approval"
          icon={Clock3}
          color="bg-amber-500/10 text-amber-500"
        />
        <SummaryCard
          title="Rejected"
          value={summary.rejected}
          description="Listings not approved"
          icon={XCircle}
          color="bg-red-500/10 text-red-500"
        />
      </div>

      {summary.pending > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-300">
              {summary.pending} equipment listings need your attention
            </p>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-400/80">
              Review submitted listings before making them available to
              customers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("Pending");
              setCurrentPage(1);
            }}
            className="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-600"
          >
            Review Pending
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              All Equipment Listings
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Search and manage equipment submitted by owners.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search equipment, owner, category or location..."
                className={`${inputClass} pl-10`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="relative">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    selectFilter(setCategoryFilter, event.target.value)
                  }
                  className={`${inputClass} appearance-none pl-9 pr-8 sm:w-48`}
                >
                  <option value="All">All Categories</option>
                  <option value="Construction">Construction</option>
                  <option value="Photography">Photography</option>
                  <option value="Vehicles & Transportation">
                    Vehicles & Transportation
                  </option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Event Equipment">Event Equipment</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    selectFilter(setStatusFilter, event.target.value)
                  }
                  className={`${inputClass} appearance-none pr-8 sm:w-40`}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400 dark:bg-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Equipment</th>
                <th className="px-4 py-4 font-semibold">Owner</th>
                <th className="px-4 py-4 font-semibold">Rental Price</th>
                <th className="px-4 py-4 font-semibold">Quantity</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEquipment.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-t border-slate-100 transition hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={52}
                        unoptimized
                        className="h-13 w-16 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {item.category}
                        </p>
                        <p className="mt-1 text-[9px] text-slate-400">
                          {item.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {item.owner}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {item.location}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      ${item.price}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      / {item.rentalType.toLowerCase()}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        title="View details"
                        onClick={() => setSelectedEquipment(item)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        title="Edit equipment"
                        onClick={() => openEditModal(item)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-brand-teal/10 hover:text-brand-teal"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        title="Delete equipment"
                        onClick={() => setDeletingEquipment(item)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedEquipment.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Package size={25} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-800 dark:text-white">
              No equipment found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredEquipment.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              -
              {Math.min(currentPage * PAGE_SIZE, filteredEquipment.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800 dark:text-white">
              {filteredEquipment.length}
            </span>{" "}
            listings
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-16 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-teal hover:text-brand-teal disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {selectedEquipment && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="equipment-details-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
          >
            <div className="relative h-52 bg-slate-100 dark:bg-slate-800">
              <Image
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedEquipment(null)}
                aria-label="Close equipment details"
                className="absolute right-3 top-3 rounded-lg bg-white/90 p-2 text-slate-700 shadow"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4">
                <StatusBadge status={selectedEquipment.status} />
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2
                    id="equipment-details-title"
                    className="text-lg font-bold text-slate-900 dark:text-white"
                  >
                    {selectedEquipment.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedEquipment.category} · {selectedEquipment.id}
                  </p>
                </div>
                <p className="text-lg font-bold text-brand-teal">
                  ${selectedEquipment.price}
                  <span className="text-xs font-medium text-slate-400">
                    /{selectedEquipment.rentalType.toLowerCase()}
                  </span>
                </p>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {selectedEquipment.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                {[
                  ["Owner", selectedEquipment.owner],
                  ["Owner Email", selectedEquipment.ownerEmail],
                  ["Location", selectedEquipment.location],
                  ["Quantity", String(selectedEquipment.quantity)],
                  ["Condition", selectedEquipment.condition],
                  ["Submitted", selectedEquipment.submitted],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-400">{label}</p>
                    <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {selectedEquipment.status === "Pending" && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedEquipment.id, "Approved")
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white transition hover:bg-emerald-600"
                  >
                    <Check size={15} />
                    Approve Listing
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedEquipment.id, "Rejected")
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
                  >
                    <X size={15} />
                    Reject Listing
                  </button>
                </div>
              )}

              {selectedEquipment.status !== "Pending" && (
                <button
                  type="button"
                  onClick={() => setSelectedEquipment(null)}
                  className="mt-5 w-full rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
                >
                  Close Details
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {editingEquipment && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-equipment-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="edit-equipment-title"
                  className="font-bold text-slate-900 dark:text-white"
                >
                  Edit Equipment
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Update listing information.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingEquipment(null)}
                aria-label="Close edit form"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                saveEquipmentChanges();
              }}
            >
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Equipment Name
                <input
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className={`${inputClass} mt-2`}
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Category
                  <select
                    value={editForm.category}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className={`${inputClass} mt-2`}
                  >
                    <option value="Construction">Construction</option>
                    <option value="Photography">Photography</option>
                    <option value="Vehicles & Transportation">
                      Vehicles & Transportation
                    </option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Event Equipment">Event Equipment</option>
                  </select>
                </label>

                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Condition
                  <select
                    value={editForm.condition}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        condition: event.target.value as Equipment["condition"],
                      }))
                    }
                    className={`${inputClass} mt-2`}
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </label>
              </div>

              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Location
                <input
                  value={editForm.location}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      location: event.target.value,
                    }))
                  }
                  className={`${inputClass} mt-2`}
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Rental Price ($)
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={editForm.price}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        price: event.target.value,
                      }))
                    }
                    className={`${inputClass} mt-2`}
                    required
                  />
                </label>

                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Available Quantity
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={editForm.quantity}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        quantity: event.target.value,
                      }))
                    }
                    className={`${inputClass} mt-2`}
                    required
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEquipment(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-brand-teal py-3 text-xs font-bold text-brand-navy transition hover:bg-brand-green"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingEquipment && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-equipment-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-equipment-title"
              className="mt-4 text-lg font-bold text-slate-900 dark:text-white"
            >
              Delete Equipment?
            </h2>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800 dark:text-white">
                {deletingEquipment.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeletingEquipment(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteEquipment}
                className="flex-1 rounded-xl bg-red-500 py-3 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
