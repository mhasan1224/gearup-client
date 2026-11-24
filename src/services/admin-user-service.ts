
import { apiRequest } from "@/lib/api-client";

import type {
  AdminUsersResponse,
  UpdateUserRolePayload,
  UpdateUserRoleResponse,
} from "@/types/admin-user";

export async function getAllUsers(): Promise<AdminUsersResponse> {
  return apiRequest<AdminUsersResponse>("/users", {
    method: "GET",
  });
}

export async function updateUserRole(
  userId: string,
  payload: UpdateUserRolePayload,
): Promise<UpdateUserRoleResponse> {
  return apiRequest<UpdateUserRoleResponse>(
    `/users/${userId}/role`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}
