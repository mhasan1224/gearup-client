
import { apiRequest } from "@/lib/api-client";

import type {
  Equipment,
  EquipmentListResponse,
  EquipmentQuery,
  CreateEquipmentPayload,
  EquipmentStatus,
} from "@/types/equipment";

export const equipmentService = {
  getAll: (query?: EquipmentQuery, signal?: AbortSignal) =>
    apiRequest<EquipmentListResponse>("equipment", {
      method: "GET",
      params: query ? { ...query } : undefined,
      signal,
    }),

  getFeatured: (limit = 6) =>
    apiRequest<EquipmentListResponse>("equipment/featured", {
      method: "GET",
      params: { limit },
    }),

  getById: (id: string) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: Equipment;
    }>(`equipment/${encodeURIComponent(id)}`, {
      method: "GET",
    }),

  create: (payload: CreateEquipmentPayload) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: Equipment;
    }>("equipment", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMyEquipment: (status?: EquipmentStatus) =>
    apiRequest<EquipmentListResponse>("equipment/my-equipment", {
      method: "GET",
      params: status ? { status } : undefined,
    }),

  update: (id: string, payload: CreateEquipmentPayload) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: Equipment;
    }>(`equipment/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  delete: (id: string) =>
    apiRequest<{
      success: boolean;
      message: string;
      data: null;
    }>(`equipment/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
};
