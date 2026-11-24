
import { apiRequest } from "@/lib/api-client";
import type {
  UpdateProfilePayload,
  UserProfileResponse,
} from "@/types/user";

export async function getMyProfile(): Promise<UserProfileResponse> {
  return apiRequest<UserProfileResponse>("/users/me", {
    method: "GET",
  });
}

export async function updateMyProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfileResponse> {
  return apiRequest<UserProfileResponse>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
