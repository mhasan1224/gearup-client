export type FavoriteEquipment = {
  _id: string;
  name: string;
  image: string;
  category: string;
  location: string;
  rentalPrice: number;
  rentalType: "daily" | "weekly" | "monthly";
  availableQuantity: number;
  condition: string;
};

export type Favorite = {
  _id: string;
  equipment: FavoriteEquipment;
  createdAt: string;
  updatedAt: string;
};

export type MyFavoritesResponse = {
  success: boolean;
  message: string;
  data: Favorite[];
  meta: {
    total: number;
  };
};

export type AddFavoritePayload = {
  equipmentId: string;
};