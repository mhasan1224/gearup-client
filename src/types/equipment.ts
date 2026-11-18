
export type EquipmentCategory =
  | "Construction"
  | "Photography"
  | "Vehicles & Transportation"
  | "Agriculture"
  | "Electronics"
  | "Event Equipment";

export type RentalType = "Daily" | "Weekly" | "Monthly";

export type EquipmentCondition =
  | "New"
  | "Like New"
  | "Good"
  | "Fair";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  condition: EquipmentCondition;
  location: string;
  price: number;
  rentalType: RentalType;
  image: string;
  available: boolean;
  availableQuantity: number;
  rating: number;
  reviewCount: number;
  rentalTerms: string[];
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
