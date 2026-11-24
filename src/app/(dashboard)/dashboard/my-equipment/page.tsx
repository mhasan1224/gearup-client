
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RefreshCw,
  Plus,
  MapPin,
  Package,
  Pencil,
  X,
  Save,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import { equipmentService } from "@/services/equipment-service";
import type {
  Equipment,
  EquipmentStatus,
  CreateEquipmentPayload,
  EquipmentCategory,
  RentalType,
} from "@/types/equipment";

import { equipmentCategories } from "@/lib/equipment-categories";

const statusConfig: Record<
  EquipmentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending Approval",
    className: "bg-amber-50 text-amber-700",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-50 text-emerald-700",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700",
  },
};

type EquipmentFormData = {
  name: string;
  description: string;
  category: EquipmentCategory;
  location: string;
  rentalPrice: string;
  rentalType: RentalType;
  availableQuantity: string;
  image: string;
  condition: string;
  brand: string;
  model: string;
  terms: string;
};

const emptyForm: EquipmentFormData = {
  name: "",
  description: "",
  category: "construction",
  location: "",
  rentalPrice: "",
  rentalType: "daily",
  availableQuantity: "",
  image: "",
  condition: "",
  brand: "",
  model: "",
  terms: "",
};

const MyEquipmentPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    EquipmentStatus | "all"
  >("all");

  const [editingEquipment, setEditingEquipment] =
    useState<Equipment | null>(null);

  const [formData, setFormData] =
    useState<EquipmentFormData>(emptyForm);

  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const [deletingEquipment, setDeletingEquipment] =
    useState<Equipment | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadEquipment = useCallback(async () => {
    setErrorMessage("");

    try {
      const response = await equipmentService.getMyEquipment(
        selectedStatus === "all" ? undefined : selectedStatus,
      );

      setEquipment(response.data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load your equipment.",
      );
    }
  }, [selectedStatus]);

  useEffect(() => {
    let isActive = true;

    const fetchEquipment = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await equipmentService.getMyEquipment(
          selectedStatus === "all" ? undefined : selectedStatus,
        );

        if (isActive) {
          setEquipment(response.data);
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load your equipment.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void fetchEquipment();

    return () => {
      isActive = false;
    };
  }, [selectedStatus]);

  const statusCounts = {
    all: equipment.length,
    pending: equipment.filter((item) => item.status === "pending").length,
    approved: equipment.filter((item) => item.status === "approved").length,
    rejected: equipment.filter((item) => item.status === "rejected").length,
  };

  const statusFilters: {
    value: EquipmentStatus | "all";
    label: string;
  }[] = [
    { value: "all", label: "All Equipment" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const openEditModal = (item: Equipment) => {
    setEditingEquipment(item);

    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      location: item.location,
      rentalPrice: String(item.rentalPrice),
      rentalType: item.rentalType,
      availableQuantity: String(item.availableQuantity),
      image: item.image,
      condition: item.condition,
      brand: item.brand || "",
      model: item.model || "",
      terms: item.terms,
    });

    setEditError("");
    setEditSuccess("");
  };

  const closeEditModal = () => {
    if (isSaving) return;

    setEditingEquipment(null);
    setFormData(emptyForm);
    setEditError("");
    setEditSuccess("");
  };

  const handleFormChange = (
    field: keyof EquipmentFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleUpdateEquipment = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!editingEquipment) return;

    setEditError("");
    setEditSuccess("");

    const rentalPrice = Number(formData.rentalPrice);
    const availableQuantity = Number(formData.availableQuantity);

    if (!Number.isFinite(rentalPrice) || rentalPrice < 0) {
      setEditError("Please enter a valid rental price.");
      return;
    }

    if (
      !Number.isInteger(availableQuantity) ||
      availableQuantity < 0
    ) {
      setEditError("Please enter a valid available quantity.");
      return;
    }

    const payload: CreateEquipmentPayload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      location: formData.location.trim(),
      rentalPrice,
      rentalType: formData.rentalType,
      availableQuantity,
      image: formData.image.trim(),
      condition: formData.condition.trim(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      terms: formData.terms.trim(),
    };

    try {
      setIsSaving(true);

      await equipmentService.update(editingEquipment.id, payload);

      setEditSuccess(
        "Equipment updated successfully and submitted for approval.",
      );

      await loadEquipment();

      setEditingEquipment(null);
      setFormData(emptyForm);
    } catch (error) {
      setEditError(
        error instanceof Error
          ? error.message
          : "Unable to update equipment.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEquipment = async () => {
    if (!deletingEquipment) return;

    setDeleteError("");

    try {
      setIsDeleting(true);

      await equipmentService.delete(deletingEquipment.id);

      setEquipment((current) =>
        current.filter((item) => item.id !== deletingEquipment.id),
      );

      setDeletingEquipment(null);
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Unable to delete equipment.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    if (isDeleting) return;

    setDeletingEquipment(null);
    setDeleteError("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            OWNER DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071827]">
            My Equipment
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and track your listed rental equipment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void loadEquipment()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              className={`size-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <Link
            href="/dashboard/add-equipment"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00D6A3] px-4 py-3 text-sm font-semibold text-[#071827] transition hover:bg-[#00bd90]"
          >
            <Plus className="size-4" />
            Add Equipment
          </Link>
        </div>
      </div>

      {editSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {editSuccess}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setSelectedStatus(filter.value)}
            className={`rounded-2xl border p-4 text-left transition ${
              selectedStatus === filter.value
                ? "border-[#00D6A3] bg-emerald-50/50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-sm text-slate-500">{filter.label}</p>

            <p className="mt-2 text-2xl font-bold text-[#071827]">
              {statusCounts[filter.value]}
            </p>
          </button>
        ))}
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}

          <button
            type="button"
            onClick={() => void loadEquipment()}
            className="ml-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <RefreshCw className="size-5 animate-spin" />
            Loading your equipment...
          </div>
        </div>
      ) : !errorMessage && equipment.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#087F68]">
            <Package className="size-7" />
          </div>

          <h2 className="mt-5 text-lg font-bold text-[#071827]">
            No equipment found
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            {selectedStatus === "all"
              ? "You have not listed any equipment yet."
              : `You do not have any ${selectedStatus} equipment.`}
          </p>

          <Link
            href="/dashboard/add-equipment"
            className="mt-5 rounded-xl bg-[#00D6A3] px-5 py-3 text-sm font-semibold text-[#071827] hover:bg-[#00bd90]"
          >
            List Your Equipment
          </Link>
        </div>
      ) : (
        !errorMessage && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {equipment.map((item) => {
              const status = statusConfig[item.status];

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-52 w-full shrink-0 bg-slate-100 sm:h-auto sm:w-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 192px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                          {item.category}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <h2 className="mt-3 line-clamp-1 text-lg font-bold text-[#071827]">
                        {item.name}
                      </h2>

                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="size-4 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <div>
                          <p className="text-xs text-slate-500">
                            Rental price
                          </p>

                          <p className="mt-1 text-lg font-bold text-[#087F68]">
                            ${item.rentalPrice.toLocaleString("en-US")}

                            <span className="ml-1 text-xs font-medium text-slate-500">
                              / {item.rentalType}
                            </span>
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-500">
                            Available quantity
                          </p>

                          <p className="mt-1 font-semibold text-[#071827]">
                            {item.availableQuantity}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00D6A3] px-3 py-2.5 text-sm font-semibold text-[#087F68] transition hover:bg-emerald-50"
                        >
                          <Pencil className="size-4" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteError("");
                            setDeletingEquipment(item);
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )
      )}

      {editingEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071827]/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-[#071827]">
                  Edit Equipment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your equipment information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSaving}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
                aria-label="Close edit form"
              >
                <X className="size-5" />
              </button>
            </div>

            <form
              onSubmit={handleUpdateEquipment}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                {editError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {editError}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Equipment Name
                    </label>

                    <input
                      required
                      maxLength={120}
                      value={formData.name}
                      onChange={(event) =>
                        handleFormChange("name", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00D6A3] focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(event) =>
                        handleFormChange("description", event.target.value)
                      }
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#00D6A3] focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <select
                      required
                      value={formData.category}
                      onChange={(event) =>
                        handleFormChange("category", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    >
                      {equipmentCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>

                    <input
                      required
                      value={formData.location}
                      onChange={(event) =>
                        handleFormChange("location", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Rental Price ($)
                    </label>

                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.rentalPrice}
                      onChange={(event) =>
                        handleFormChange("rentalPrice", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Rental Type
                    </label>

                    <select
                      required
                      value={formData.rentalType}
                      onChange={(event) =>
                        handleFormChange("rentalType", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Available Quantity
                    </label>

                    <input
                      required
                      type="number"
                      min="0"
                      step="1"
                      value={formData.availableQuantity}
                      onChange={(event) =>
                        handleFormChange(
                          "availableQuantity",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Condition
                    </label>

                    <input
                      required
                      value={formData.condition}
                      onChange={(event) =>
                        handleFormChange("condition", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Brand
                    </label>

                    <input
                      value={formData.brand}
                      onChange={(event) =>
                        handleFormChange("brand", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Model
                    </label>

                    <input
                      value={formData.model}
                      onChange={(event) =>
                        handleFormChange("model", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Equipment Image URL
                    </label>

                    <input
                      required
                      type="url"
                      value={formData.image}
                      onChange={(event) =>
                        handleFormChange("image", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />

                    <div className="relative mt-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-64">
                      {formData.image && (
                        <Image
                          src={formData.image}
                          alt="Equipment preview"
                          fill
                          sizes="256px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Rental Terms
                    </label>

                    <textarea
                      required
                      rows={3}
                      value={formData.terms}
                      onChange={(event) =>
                        handleFormChange("terms", event.target.value)
                      }
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#00D6A3]"
                    />
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  After updating, your equipment will return to Pending
                  Approval until an administrator reviews the changes.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D6A3] px-5 py-3 text-sm font-semibold text-[#071827] transition hover:bg-[#00bd90] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071827]/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="size-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#071827]">
              Delete Equipment?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {deletingEquipment.name}
              </span>
              ? This action cannot be undone.
            </p>

            {deleteError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {deleteError}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleDeleteEquipment()}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete Equipment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEquipmentPage;
