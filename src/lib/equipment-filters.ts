
import type {
  EquipmentCategory,
  RentalType,
} from "@/types/equipment";

export const equipmentCategoryOptions: {
  label: string;
  value: EquipmentCategory | "";
}[] = [
  { label: "All Categories", value: "" },
  { label: "Construction Equipment", value: "construction" },
  { label: "Photography Equipment", value: "photography" },
  { label: "Vehicles & Transportation", value: "vehicles" },
  { label: "Agriculture Equipment", value: "agriculture" },
  { label: "Electronics", value: "electronics" },
  { label: "Event Equipment", value: "events" },
];

export const rentalTypeOptions: {
  label: string;
  value: RentalType | "";
}[] = [
  { label: "All Rental Types", value: "" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export const equipmentSortOptions = [
  { label: "Recently Added", value: "recent" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const;
