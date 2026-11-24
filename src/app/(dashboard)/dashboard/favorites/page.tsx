
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  Heart,
  MapPin,
  Package,
  RefreshCw,
  Trash2,
} from "lucide-react";

import {
  getMyFavorites,
  removeFavorite,
} from "@/services/favorite-service";
import type { Favorite } from "@/types/favorite";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async () => {
      setIsLoading(true);
      setError("");

      try {
        const result = await getMyFavorites();

        if (isActive) {
          setFavorites(result.data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your favorites.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadFavorites();

    return () => {
      isActive = false;
    };
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((current) => current + 1);
  };

  const handleRemove = async (equipmentId: string) => {
    setRemovingId(equipmentId);
    setError("");

    try {
      await removeFavorite(equipmentId);

      setFavorites((current) =>
        current.filter(
          (favorite) => favorite.equipment._id !== equipmentId,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove this favorite.",
      );
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">
            Customer Workspace
          </p>

          <h1 className="mt-2 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            My Favorites
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Keep your preferred equipment in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="font-heading text-lg font-bold text-foreground">
          Saved Equipment
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {favorites.length}{" "}
          {favorites.length === 1 ? "item" : "items"} saved
        </p>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle size={20} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card">
          <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading your favorites...
          </p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Heart size={30} />
          </div>

          <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
            No favorites yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            You haven&apos;t saved any equipment yet. Explore available
            equipment and add your favorites.
          </p>

          <Link
            href="/equipment"
            className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore Equipment
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((favorite) => {
            const equipment = favorite.equipment;

            return (
              <article
                key={favorite._id}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/equipment/${equipment._id}`}
                  className="group relative block aspect-[16/10] overflow-hidden bg-muted"
                >
                  {equipment.image ? (
                    <Image
                      src={equipment.image}
                      alt={equipment.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Package size={36} />
                    </div>
                  )}
                </Link>

                <div className="space-y-4 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {equipment.category}
                    </p>

                    <Link
                      href={`/equipment/${equipment._id}`}
                      className="mt-1 block font-heading text-lg font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {equipment.name}
                    </Link>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin size={15} />
                      {equipment.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-lg font-extrabold text-foreground">
                        {formatCurrency(equipment.rentalPrice)}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Per {equipment.rentalType.replace("ly", "")}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {equipment.availableQuantity > 0
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      {formatLabel(equipment.condition)}
                    </span>

                    <button
                      type="button"
                      onClick={() => void handleRemove(equipment._id)}
                      disabled={removingId === equipment._id}
                      className="inline-flex items-center gap-2 rounded-lg border border-destructive/20 px-3 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {removingId === equipment._id ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
