
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ImageOff, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import { addFavorite } from "@/services/favorite-service";
import type { Equipment } from "@/types/equipment";

interface EquipmentCardProps {
  equipment: Equipment;
  isFavorite: boolean;
  onFavoriteAdded: (equipmentId: string) => void;
}

export default function EquipmentCard({
  equipment,
  isFavorite,
  onFavoriteAdded,
}: EquipmentCardProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSaving, setIsSaving] = useState(false);
  const [favoriteError, setFavoriteError] = useState("");

  const userRole = (
    session?.user as { role?: string } | undefined
  )?.role;

  const canFavorite = userRole === "customer";

  const handleFavorite = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (userRole !== "customer" || isSaving || isFavorite) {
      return;
    }

    setIsSaving(true);
    setFavoriteError("");

    try {
      await addFavorite({ equipmentId: equipment.id });
      onFavoriteAdded(equipment.id);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to add this equipment to favorites.";

      if (message.toLowerCase().includes("already")) {
        onFavoriteAdded(equipment.id);
      }

      setFavoriteError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {equipment.image ? (
          <Image
            src={equipment.image}
            alt={equipment.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageOff size={40} className="text-muted-foreground" />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold capitalize text-foreground backdrop-blur">
          {equipment.category.replaceAll("-", " ")}
        </span>

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
            equipment.availableQuantity > 0
              ? "bg-emerald-500/90 text-white"
              : "bg-destructive/90 text-white"
          }`}
        >
          {equipment.availableQuantity > 0 ? "Available" : "Unavailable"}
        </span>

        {canFavorite && (
          <button
            type="button"
            onClick={() => void handleFavorite()}
            disabled={isSaving || isFavorite}
            aria-label={
              isFavorite ? "Added to favorites" : "Add to favorites"
            }
            title={
              isFavorite ? "Added to favorites" : "Add to favorites"
            }
            className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-card/95 text-foreground shadow-md backdrop-blur transition-all hover:scale-110 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? (
              <span className="size-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            ) : (
              <Heart
                size={19}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }
              />
            )}
          </button>
        )}
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 font-heading text-lg font-bold text-foreground">
          {equipment.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={15} className="shrink-0 text-primary" />
          <span className="line-clamp-1">{equipment.location}</span>
        </div>

        {favoriteError && (
          <p className="mt-2 text-xs text-destructive">
            {favoriteError}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Rental Price</p>

            <p className="mt-1 font-heading text-xl font-extrabold text-foreground">
              ${equipment.rentalPrice.toLocaleString("en-US")}
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                / {equipment.rentalType}
              </span>
            </p>
          </div>

          <Link
            href={`/equipment/${encodeURIComponent(equipment.id)}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:brightness-95"
          >
            Details
            <ArrowRight size={15} />
          </Link>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {equipment.availableQuantity > 0
            ? `${equipment.availableQuantity} available`
            : "Currently unavailable"}
        </p>
      </div>
    </article>
  );
}
