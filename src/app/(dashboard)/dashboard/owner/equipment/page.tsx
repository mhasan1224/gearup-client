"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  ImagePlus,
  MapPin,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type EquipmentStatus = "Approved" | "Pending" | "Rejected";
type RentalType = "Daily" | "Weekly" | "Monthly";

type Equipment = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  rentalType: RentalType;
  quantity: number;
  condition: string;
  brand: string;
  model: string;
  description: string;
  rentalTerms: string;
  image: string;
  status: EquipmentStatus;
};

const initialEquipment: Equipment[] = [
  {
    id: "EQ-1001",
    name: "CAT Excavator 320D",
    category: "Construction",
    location: "Dhaka, Bangladesh",
    price: 8500,
    rentalType: "Daily",
    quantity: 2,
    condition: "Excellent",
    brand: "Caterpillar",
    model: "320D",
    description: "Heavy-duty excavator for construction projects.",
    rentalTerms: "Operator and fuel are not included.",
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=600&auto=format&fit=crop&q=80",
    status: "Approved",
  },
  {
    id: "EQ-1002",
    name: "Professional DSLR Camera",
    category: "Photography",
    location: "Gazipur, Bangladesh",
    price: 2500,
    rentalType: "Daily",
    quantity: 3,
    condition: "Excellent",
    brand: "Canon",
    model: "EOS 5D",
    description: "Professional DSLR camera for photography and video.",
    rentalTerms: "Valid identification required.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    status: "Approved",
  },
  {
    id: "EQ-1003",
    name: "Industrial Generator",
    category: "Electronics",
    location: "Uttara, Dhaka",
    price: 4200,
    rentalType: "Daily",
    quantity: 1,
    condition: "Good",
    brand: "Honda",
    model: "EU70is",
    description: "Reliable power generator for commercial use.",
    rentalTerms: "Delivery charges apply.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80",
    status: "Pending",
  },
  {
    id: "EQ-1004",
    name: "Agricultural Tractor",
    category: "Agriculture",
    location: "Mymensingh, Bangladesh",
    price: 6000,
    rentalType: "Daily",
    quantity: 1,
    condition: "Good",
    brand: "John Deere",
    model: "5050D",
    description: "Multi-purpose tractor for agricultural operations.",
    rentalTerms: "Operator must be arranged separately.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
    status: "Rejected",
  },
];

const categories = [
  "Construction",
  "Photography",
  "Vehicles & Transportation",
  "Agriculture",
  "Electronics",
  "Event Equipment",
];

const statusStyles: Record<EquipmentStatus, string> = {
  Approved: "bg-[#00D6A3]/10 text-[#087F68] dark:text-[#00D6A3]",
  Pending: "bg-amber-500/10 text-amber-600",
  Rejected: "bg-red-500/10 text-red-600",
};

const emptyForm = {
  name: "",
  category: "Construction",
  location: "",
  price: "",
  rentalType: "Daily" as RentalType,
  quantity: "1",
  condition: "Excellent",
  brand: "",
  model: "",
  description: "",
  rentalTerms: "",
};

type EquipmentForm = typeof emptyForm;

export default function OwnerEquipmentPage() {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EquipmentForm>(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredEquipment = useMemo(() => {
    const result = equipment.filter((item) => {
      const searchMatch = `${item.name} ${item.category} ${item.location}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch =
        categoryFilter === "All Categories" || item.category === categoryFilter;

      const statusMatch =
        statusFilter === "All Status" || item.status === statusFilter;

      return searchMatch && categoryMatch && statusMatch;
    });

    if (sortOrder === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [equipment, search, categoryFilter, statusFilter, sortOrder]);

  const stats = [
    {
      label: "Total Equipment",
      value: equipment.length,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "Approved",
      value: equipment.filter((item) => item.status === "Approved").length,
      color: "text-[#087F68] dark:text-[#00D6A3]",
      bg: "bg-[#00D6A3]/10",
    },
    {
      label: "Pending Review",
      value: equipment.filter((item) => item.status === "Pending").length,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "Rejected",
      value: equipment.filter((item) => item.status === "Rejected").length,
      color: "text-red-600",
      bg: "bg-red-500/10",
    },
  ];

  function openAddModal() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setImagePreview("");
    setSelectedImage(null);
    setIsModalOpen(true);
  }

  function openEditModal(item: Equipment) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      location: item.location,
      price: String(item.price),
      rentalType: item.rentalType,
      quantity: String(item.quantity),
      condition: item.condition,
      brand: item.brand,
      model: item.model,
      description: item.description,
      rentalTerms: item.rentalTerms,
    });
    setImagePreview(item.image);
    setSelectedImage(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setImagePreview("");
    setSelectedImage(null);
  }

  function handleImageChange(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.location.trim() || !form.price) {
      toast.error("Please complete all required fields.");
      return;
    }

    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid rental price.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    const existingItem = equipment.find((item) => item.id === editingId);

    const updatedItem: Equipment = {
      id: editingId ?? `EQ-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      location: form.location.trim(),
      price,
      rentalType: form.rentalType,
      quantity,
      condition: form.condition,
      brand: form.brand.trim(),
      model: form.model.trim(),
      description: form.description.trim(),
      rentalTerms: form.rentalTerms.trim(),
      image: imagePreview || existingItem?.image || "",
      status: editingId ? (existingItem?.status ?? "Pending") : "Pending",
    };

    if (editingId) {
      setEquipment((current) =>
        current.map((item) => (item.id === editingId ? updatedItem : item)),
      );
      toast.success("Equipment updated successfully.");
    } else {
      setEquipment((current) => [updatedItem, ...current]);
      toast.success("Equipment submitted for admin approval.");
    }

    closeModal();
  }

  function handleDelete(item: Equipment) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`,
    );

    if (!confirmed) return;

    setEquipment((current) =>
      current.filter((equipmentItem) => equipmentItem.id !== item.id),
    );

    toast.success("Equipment removed from your list.");
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#087F68] dark:text-[#00D6A3]">
            <Package size={14} />
            Equipment Management
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-[#071827] sm:text-3xl dark:text-white">
            My Equipment
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your listings, update equipment details and track approval
            status.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-sm font-extrabold text-[#071827] shadow-lg shadow-[#00D6A3]/15 transition hover:bg-[#00bd90]"
        >
          <Plus size={18} />
          Add Equipment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#102B40]"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
            >
              <Package size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#071827] dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Equipment List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#102B40]">
        <div className="border-b border-slate-100 p-5 dark:border-white/10 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-base font-extrabold text-[#071827] dark:text-white">
                Your Listings
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {filteredEquipment.length} equipment items found
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(180px,1fr)_auto_auto]">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search equipment..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs text-[#071827] outline-none transition focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-xs font-semibold text-slate-600 outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-slate-300"
                >
                  <option>All Categories</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-600 outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-slate-300"
              >
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ArrowUpDown size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 outline-none dark:border-white/10 dark:bg-[#071827] dark:text-slate-300"
            >
              <option value="newest">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {filteredEquipment.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-white/10">
            {filteredEquipment.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center dark:hover:bg-white/[0.02]"
              >
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-28">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <Package size={25} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-extrabold text-[#071827] dark:text-white">
                      {item.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.category} · {item.brand || "Brand not specified"}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                    <span>{item.quantity} available</span>
                    <span>{item.condition} condition</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:min-w-36 sm:flex-col sm:items-end">
                  <div className="sm:text-right">
                    <p className="text-base font-extrabold text-[#071827] dark:text-white">
                      ৳{item.price.toLocaleString("en-BD")}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      per{" "}
                      {item.rentalType === "Daily"
                        ? "day"
                        : item.rentalType === "Weekly"
                          ? "week"
                          : "month"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toast.info(`Equipment ID: ${item.id}`)}
                      aria-label={`View ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#087F68] dark:hover:bg-white/10 dark:hover:text-[#00D6A3]"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      aria-label={`Edit ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-[#00D6A3]/10 hover:text-[#087F68] dark:hover:text-[#00D6A3]"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      aria-label={`Delete ${item.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5">
              <Package size={26} />
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-[#071827] dark:text-white">
              No equipment found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Try changing your search or filters, or add your first equipment
              listing.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00D6A3] px-4 py-2.5 text-xs font-bold text-[#071827]"
            >
              <Plus size={15} />
              Add Equipment
            </button>
          </div>
        )}
      </section>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071827]/75 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#102B40]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7 dark:border-white/10">
              <div>
                <h2 className="text-lg font-extrabold text-[#071827] dark:text-white">
                  {editingId ? "Update Equipment" : "Add New Equipment"}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Provide accurate information about your equipment.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close form"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-5 py-6 sm:px-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Equipment Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="e.g. CAT Excavator 320D"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Location *
                  </label>
                  <input
                    required
                    value={form.location}
                    onChange={(event) =>
                      setForm({ ...form, location: event.target.value })
                    }
                    placeholder="City, Country"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Rental Price (BDT) *
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={(event) =>
                      setForm({ ...form, price: event.target.value })
                    }
                    placeholder="Enter rental price"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Rental Type *
                  </label>
                  <select
                    value={form.rentalType}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        rentalType: event.target.value as RentalType,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Available Quantity *
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    step="1"
                    value={form.quantity}
                    onChange={(event) =>
                      setForm({ ...form, quantity: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Condition
                  </label>
                  <select
                    value={form.condition}
                    onChange={(event) =>
                      setForm({ ...form, condition: event.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  >
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Needs Repair</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Brand
                  </label>
                  <input
                    value={form.brand}
                    onChange={(event) =>
                      setForm({ ...form, brand: event.target.value })
                    }
                    placeholder="Equipment brand"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Model
                  </label>
                  <input
                    value={form.model}
                    onChange={(event) =>
                      setForm({ ...form, model: event.target.value })
                    }
                    placeholder="Equipment model"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Equipment Image
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImageChange(event.target.files?.[0])
                    }
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center transition hover:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827]"
                  >
                    {imagePreview ? (
                      <div className="relative h-36 w-full max-w-xs overflow-hidden rounded-lg">
                        <Image
                          src={imagePreview}
                          alt="Equipment preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <ImagePlus
                        size={28}
                        className="text-[#087F68] dark:text-[#00D6A3]"
                      />
                    )}
                    <span className="text-xs font-bold text-[#071827] dark:text-white">
                      {selectedImage?.name || "Choose an equipment image"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      JPG, PNG or WEBP · Maximum 5 MB
                    </span>
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    placeholder="Describe your equipment and its features..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Rental Terms
                  </label>
                  <textarea
                    rows={3}
                    value={form.rentalTerms}
                    onChange={(event) =>
                      setForm({ ...form, rentalTerms: event.target.value })
                    }
                    placeholder="Mention deposit, delivery, operator or other rental conditions..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#00D6A3] dark:border-white/10 dark:bg-[#071827] dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-6 py-3 text-xs font-extrabold text-[#071827] transition hover:bg-[#00bd90]"
                >
                  <Check size={16} />
                  {editingId ? "Save Changes" : "Submit for Approval"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
