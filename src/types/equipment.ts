
export type EquipmentCategory =
  | "Construction"
  | "Photography"
  | "Vehicles & Transportation"
  | "Agriculture"
  | "Electronics"
  | "Event Equipment";

export type RentalType = "Daily" | "Weekly" | "Monthly";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: EquipmentCategory;
  location: string;
  price: number;
  rentalType: RentalType;
  image: string;
  available: boolean;
  availableQuantity: number;
  rating: number;
  reviewCount: number;
  owner: {
    name: string;
    verified: boolean;
  };
  createdAt: string;
}
export interface EquipmentFilterValues {
  search: string;
  category: EquipmentCategory | "All";
  rentalType: RentalType | "All";
  minPrice: number;
  maxPrice: number;
  availability: "All" | "Available" | "Unavailable";
}

export type EquipmentSortOption =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating";