
import { apiRequest } from "@/lib/api-client";

import type {
  Equipment,
  EquipmentStatus,
  EquipmentListResponse,
  CreateEquipmentPayload,
} from "@/types/equipment";

export interface AdminEquipmentQuery {
  search?: string;
  status?: EquipmentStatus;
}

export async function getAllAdminEquipment(
  query?: AdminEquipmentQuery,
): Promise<EquipmentListResponse> {
  return apiRequest<EquipmentListResponse>("/equipment/admin", {
    method: "GET",
    params: query ? { ...query } : undefined,
  });
}

export async function updateAdminEquipmentStatus(
  equipmentId: string,
  status: Extract<EquipmentStatus, "approved" | "rejected">,
): Promise<{
  success: boolean;
  message: string;
  data: Equipment;
}> {
  return apiRequest(`/equipment/admin/${equipmentId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function updateAdminEquipment(
  equipmentId: string,
  payload: CreateEquipmentPayload,
): Promise<{
  success: boolean;
  message: string;
  data: Equipment;
}> {
  return apiRequest(`/equipment/admin/${equipmentId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminEquipment(
  equipmentId: string,
): Promise<{
  success: boolean;
  message: string;
  data: null;
}> {
  return apiRequest(`/equipment/admin/${equipmentId}`, {
    method: "DELETE",
  });
}
