
import type {
  Equipment,
  EquipmentFilterValues,
  EquipmentSortOption,
} from "@/types/equipment";

export function filterEquipment(
  equipment: Equipment[],
  filters: EquipmentFilterValues,
): Equipment[] {
  const searchTerm = filters.search.trim().toLowerCase();

  return equipment.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.location.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      filters.category === "All" ||
      item.category === filters.category;

    const matchesRentalType =
      filters.rentalType === "All" ||
      item.rentalType === filters.rentalType;

    const matchesPrice =
      item.price >= filters.minPrice &&
      item.price <= filters.maxPrice;

    const matchesAvailability =
      filters.availability === "All" ||
      (filters.availability === "Available" && item.available) ||
      (filters.availability === "Unavailable" && !item.available);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesRentalType &&
      matchesPrice &&
      matchesAvailability
    );
  });
}

export function sortEquipment(
  equipment: Equipment[],
  sortBy: EquipmentSortOption,
): Equipment[] {
  const sorted = [...equipment];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );
  }
}
