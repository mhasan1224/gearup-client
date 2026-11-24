
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  Loader2,
  Package,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  deleteAdminEquipment,
  getAllAdminEquipment,
  updateAdminEquipmentStatus,
} from "@/services/admin-equipment-service";

import type {
  Equipment,
  EquipmentStatus,
} from "@/types/equipment";

type StatusFilter = "all" | EquipmentStatus;

const statusStyles: Record<EquipmentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export default function AdminEquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEquipment = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getAllAdminEquipment({
        search: search.trim() || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
      });

      setEquipment(response.data);
      setTotal(response.meta.total);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load equipment.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchEquipment();
    }, 300);

    return () => clearTimeout(timeout);
  }, [fetchEquipment]);

  const stats = useMemo(
    () => ({
      pending: equipment.filter((item) => item.status === "pending").length,
      approved: equipment.filter((item) => item.status === "approved").length,
      rejected: equipment.filter((item) => item.status === "rejected").length,
    }),
    [equipment],
  );

  const handleStatusChange = async (
    item: Equipment,
    status: "approved" | "rejected",
  ) => {
    const action = status === "approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} "${item.name}"?`)) {
      return;
    }

    setActionId(item.id);
    setError("");
    setSuccessMessage("");

    try {
      await updateAdminEquipmentStatus(item.id, status);
      setSuccessMessage(`Equipment ${action}d successfully.`);
      await fetchEquipment();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${action} equipment.`,
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (item: Equipment) => {
    if (!window.confirm(`Delete "${item.name}" permanently? This cannot be undone.`)) {
      return;
    }

    setActionId(item.id);
    setError("");
    setSuccessMessage("");

    try {
      await deleteAdminEquipment(item.id);
      setSuccessMessage("Equipment deleted successfully.");
      await fetchEquipment();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete equipment.",
      );
    } finally {
      setActionId(null);
    }
  };

  const filters: { label: string; value: StatusFilter }[] = [
    { label: "All Equipment", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Administration
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#071827] sm:text-3xl">
            Equipment Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review, manage, and monitor all listed equipment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchEquipment()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Equipment</p>
            <Package className="text-emerald-600" size={20} />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#071827]">{total}</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-amber-800">Pending</p>
            <Clock className="text-amber-600" size={20} />
          </div>
          <p className="mt-3 text-2xl font-bold text-amber-800">{stats.pending}</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-emerald-800">Approved</p>
            <Check className="text-emerald-600" size={20} />
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-800">{stats.approved}</p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-red-800">Rejected</p>
            <X className="text-red-600" size={20} />
          </div>
          <p className="mt-3 text-2xl font-bold text-red-800">{stats.rejected}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search equipment, category, location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  statusFilter === filter.value
                    ? "bg-[#071827] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <Check size={17} />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-bold text-[#071827]">Equipment Listings</h2>
            <p className="mt-1 text-xs text-slate-500">
              Showing {equipment.length} of {total} equipment items
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-emerald-600" size={30} />
            <p className="text-sm text-slate-500">Loading equipment...</p>
          </div>
        ) : equipment.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <Package size={38} className="text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-700">
              No equipment found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Equipment</th>
                    <th className="px-5 py-4 font-semibold">Owner</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {equipment.map((item) => (
                    <tr key={item.id} className="transition hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex min-w-56 items-center gap-3">
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <Package className="m-auto text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#071827]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs capitalize text-slate-500">
                              {item.category} · {item.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-700">
                          {item.owner?.name || "Unknown"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {formatPrice(item.rentalPrice)}
                        </p>
                        <p className="text-xs text-slate-500">
                          / {item.rentalType}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.status !== "approved" && (
                            <button
                              type="button"
                              title="Approve"
                              disabled={actionId === item.id}
                              onClick={() => void handleStatusChange(item, "approved")}
                              className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-40"
                            >
                              <Check size={17} />
                            </button>
                          )}
                          {item.status !== "rejected" && (
                            <button
                              type="button"
                              title="Reject"
                              disabled={actionId === item.id}
                              onClick={() => void handleStatusChange(item, "rejected")}
                              className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50 disabled:opacity-40"
                            >
                              <X size={17} />
                            </button>
                          )}
                          <Link
                            href={`/equipment/${item.id}`}
                            title="View equipment"
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                          >
                            <Eye size={17} />
                          </Link>
                          <Link
                            href={`/dashboard/equipment/${item.id}/edit`}
                            title="Edit equipment"
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Edit size={17} />
                          </Link>
                          <button
                            type="button"
                            title="Delete equipment"
                            disabled={actionId === item.id}
                            onClick={() => void handleDelete(item)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                          >
                            {actionId === item.id ? (
                              <Loader2 size={17} className="animate-spin" />
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {equipment.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 p-3.5"
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <Package className="m-auto text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold text-[#071827]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs capitalize text-slate-500">
                        {item.category} · {item.location}
                      </p>
                      <p className="mt-2 text-sm font-bold text-emerald-700">
                        {formatPrice(item.rentalPrice)} / {item.rentalType}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[item.status]}`}>
                      {item.status}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.status !== "approved" && (
                        <button
                          type="button"
                          title="Approve"
                          disabled={actionId === item.id}
                          onClick={() => void handleStatusChange(item, "approved")}
                          className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 disabled:opacity-40"
                        >
                          <Check size={17} />
                        </button>
                      )}
                      {item.status !== "rejected" && (
                        <button
                          type="button"
                          title="Reject"
                          disabled={actionId === item.id}
                          onClick={() => void handleStatusChange(item, "rejected")}
                          className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 disabled:opacity-40"
                        >
                          <X size={17} />
                        </button>
                      )}
                      <Link
                        href={`/equipment/${item.id}`}
                        title="View equipment"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                      >
                        <Eye size={17} />
                      </Link>
                      <Link
                        href={`/dashboard/equipment/${item.id}/edit`}
                        title="Edit equipment"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={17} />
                      </Link>
                      <button
                        type="button"
                        title="Delete equipment"
                        disabled={actionId === item.id}
                        onClick={() => void handleDelete(item)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner?.name || "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
