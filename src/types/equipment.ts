
export type RentalType = "daily" | "weekly" | "monthly";

export type EquipmentCategory =
  | "construction"
  | "photography"
  | "vehicles"
  | "agriculture"
  | "electronics"
  | "events";

export type EquipmentStatus = "pending" | "approved" | "rejected";

export interface EquipmentOwner {
  id: string;
  name: string;
  image?: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: EquipmentCategory;
  rentalPrice: number;
  rentalType: RentalType;
  location: string;
  availableQuantity: number;
  image: string;
  condition: string;
  brand: string;
  model: string;
  terms: string;
  owner: EquipmentOwner;
  status: EquipmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EquipmentQuery {
  search?: string;
  category?: EquipmentCategory;
  rentalType?: RentalType;
  minPrice?: number;
  maxPrice?: number;
  availableOnly?: boolean;
  sortBy?: "price-asc" | "price-desc" | "recent";
  limit?: number;
}

export interface EquipmentListResponse {
  success: boolean;
  message: string;
  data: Equipment[];
  meta: {
    total: number;
  };
}

export interface CreateEquipmentPayload {
  name: string;
  description: string;
  category: EquipmentCategory;
  rentalPrice: number;
  rentalType: RentalType;
  location: string;
  availableQuantity: number;
  image: string;
  condition: string;
  brand?: string;
  model?: string;
  terms: string;
}