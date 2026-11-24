import { apiRequest } from "@/lib/api-client";
import type {
  AddFavoritePayload,
  MyFavoritesResponse,
} from "@/types/favorite";

export async function getMyFavorites(): Promise<MyFavoritesResponse> {
  return apiRequest<MyFavoritesResponse>("/favorites", {
    method: "GET",
  });
}

export async function addFavorite(
  payload: AddFavoritePayload,
): Promise<void> {
  await apiRequest("/favorites", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function removeFavorite(
  equipmentId: string,
): Promise<void> {
  await apiRequest(`/favorites/${equipmentId}`, {
    method: "DELETE",
  });
}