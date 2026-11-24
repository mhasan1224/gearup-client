
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

import { equipmentCategories } from "@/lib/equipment-categories";
import {
  getAllAdminEquipment,
  updateAdminEquipment,
} from "@/services/admin-equipment-service";
import { uploadEquipmentImage } from "@/services/upload-service";

import type {
  CreateEquipmentPayload,
  EquipmentCategory,
  RentalType,
} from "@/types/equipment";

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary";

export default function AdminEditEquipmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const equipmentId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "" as EquipmentCategory | "",
    location: "",
    rentalPrice: "",
    rentalType: "daily" as RentalType,
    availableQuantity: "1",
    condition: "",
    brand: "",
    model: "",
    terms: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadEquipment = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await getAllAdminEquipment();

        const equipment = response.data.find(
          (item) => item.id === equipmentId,
        );

        if (!equipment) {
          throw new Error("Equipment not found.");
        }

        if (!isActive) return;

        setFormData({
          name: equipment.name,
          description: equipment.description,
          category: equipment.category,
          location: equipment.location,
          rentalPrice: String(equipment.rentalPrice),
          rentalType: equipment.rentalType,
          availableQuantity: String(equipment.availableQuantity),
          condition: equipment.condition,
          brand: equipment.brand || "",
          model: equipment.model || "",
          terms: equipment.terms,
        });

        setCurrentImage(equipment.image);
        setImagePreview(equipment.image);
      } catch (error) {
        if (isActive) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load equipment.",
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    if (equipmentId) {
      void loadEquipment();
    }

    return () => {
      isActive = false;
    };
  }, [equipmentId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.category) {
      setErrorMessage("Please select an equipment category.");
      return;
    }

    if (!currentImage && !imageFile) {
      setErrorMessage("Please select an equipment image.");
      return;
    }

    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file.");
        return;
      }

      if (imageFile.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size must be less than 5MB.");
        return;
      }
    }

    if (
      !Number.isFinite(Number(formData.rentalPrice)) ||
      Number(formData.rentalPrice) < 0
    ) {
      setErrorMessage("Please enter a valid rental price.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.availableQuantity)) ||
      Number(formData.availableQuantity) < 1
    ) {
      setErrorMessage("Available quantity must be at least 1.");
      return;
    }

    try {
      setIsSubmitting(true);

      const imageUrl = imageFile
        ? await uploadEquipmentImage(imageFile)
        : currentImage;

      const payload: CreateEquipmentPayload = {
        ...formData,
        category: formData.category,
        rentalPrice: Number(formData.rentalPrice),
        availableQuantity: Number(formData.availableQuantity),
        image: imageUrl,
      };

      await updateAdminEquipment(equipmentId, payload);

      setSuccessMessage("Equipment updated successfully.");

      setTimeout(() => {
        router.push("/dashboard/equipment");
        router.refresh();
      }, 800);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to update equipment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-3">
        <Loader2 className="animate-spin text-primary" size={24} />
        <p className="text-sm text-muted-foreground">
          Loading equipment...
        </p>
      </div>
    );
  }

  if (errorMessage && !formData.name) {
    return (
      <div className="space-y-5">
        <Link
          href="/dashboard/equipment"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={17} />
          Back to Equipment
        </Link>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-10">
      <section>
        <Link
          href="/dashboard/equipment"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to Equipment
        </Link>

        <p className="text-sm font-semibold text-primary">
          Equipment Management
        </p>

        <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Edit Equipment
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update equipment information and listing details.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Equipment Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Make the necessary changes and save your updates.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Equipment Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    category: event.target.value as EquipmentCategory | "",
                  })
                }
                className={inputClass}
                required
              >
                <option value="">Select category</option>
                {equipmentCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(event) =>
                  setFormData({ ...formData, location: event.target.value })
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Condition *
              </label>
              <input
                type="text"
                value={formData.condition}
                onChange={(event) =>
                  setFormData({ ...formData, condition: event.target.value })
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Rental Price (USD) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.rentalPrice}
                onChange={(event) =>
                  setFormData({ ...formData, rentalPrice: event.target.value })
                }
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Rental Type *
              </label>
              <select
                value={formData.rentalType}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    rentalType: event.target.value as RentalType,
                  })
                }
                className={inputClass}
              >
                <option value="daily">Per Day</option>
                <option value="weekly">Per Week</option>
                <option value="monthly">Per Month</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Available Quantity *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formData.availableQuantity}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    availableQuantity: event.target.value,
                  })
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Brand
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(event) =>
                  setFormData({ ...formData, brand: event.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Model
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(event) =>
                  setFormData({ ...formData, model: event.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Rental Terms *
            </label>
            <textarea
              value={formData.terms}
              onChange={(event) =>
                setFormData({ ...formData, terms: event.target.value })
              }
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Equipment Image
            </label>

            <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background p-5 text-center transition hover:border-primary">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;

                  setImageFile(file);

                  if (!file) {
                    setImagePreview(currentImage);
                    return;
                  }

                  const reader = new FileReader();

                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      setImagePreview(reader.result);
                    }
                  };

                  reader.readAsDataURL(file);
                }}
              />

              <span className="font-medium text-foreground">
                {imageFile ? imageFile.name : "Click to change equipment image"}
              </span>

              <span className="mt-2 text-xs text-muted-foreground">
                PNG, JPG or WEBP (Maximum 5MB)
              </span>
            </label>

            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Equipment preview"
                  width={600}
                  height={400}
                  unoptimized
                  className="h-48 w-full rounded-xl border border-border object-cover sm:w-72"
                />
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
