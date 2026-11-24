"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

import { equipmentCategories } from "@/lib/equipment-categories";
import { equipmentService } from "@/services/equipment-service";
import { uploadEquipmentImage } from "@/services/upload-service";

import type { EquipmentCategory, RentalType } from "@/types/equipment";

export default function AddEquipmentPage() {
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

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.category) {
      setErrorMessage("Please select an equipment category.");
      return;
    }

    if (!imageFile) {
      setErrorMessage("Please select an equipment image.");
      return;
    }

    if (!imageFile.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
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

      const imageUrl = await uploadEquipmentImage(imageFile);

      await equipmentService.create({
        ...formData,
        category: formData.category,
        rentalPrice: Number(formData.rentalPrice),
        availableQuantity: Number(formData.availableQuantity),
        image: imageUrl,
      });

      setSuccessMessage("Equipment submitted successfully for approval.");

      setFormData({
        name: "",
        description: "",
        category: "",
        location: "",
        rentalPrice: "",
        rentalType: "daily",
        availableQuantity: "1",
        condition: "",
        brand: "",
        model: "",
        terms: "",
      });

      setImageFile(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit equipment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-7">
      <section>
        <p className="text-sm font-semibold text-primary">
          Equipment Management
        </p>

        <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
          Add New Equipment
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          List your equipment and make it available for rent.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-8">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Equipment Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Provide the details of your equipment below.
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
                placeholder="e.g. Excavator Machine"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
              placeholder="Describe your equipment..."
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
                  setFormData({
                    ...formData,
                    location: event.target.value,
                  })
                }
                placeholder="e.g. Gazipur, Bangladesh"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                  setFormData({
                    ...formData,
                    condition: event.target.value,
                  })
                }
                placeholder="e.g. Excellent, Like New"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                  setFormData({
                    ...formData,
                    rentalPrice: event.target.value,
                  })
                }
                placeholder="e.g. 25"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                placeholder="Equipment brand"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
                placeholder="Equipment model"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
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
              placeholder="Write rental rules and conditions..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Equipment Image *
            </label>

            <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background p-6 text-center transition hover:border-primary">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;

                  setImageFile(file);

                  if (!file) {
                    setImagePreview("");
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
                {imageFile ? imageFile.name : "Click to upload equipment image"}
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
            className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit Equipment"}
          </button>
        </form>
      </section>
    </div>
  );
}
