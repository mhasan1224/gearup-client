
import { apiRequest } from "@/lib/api-client";

import type {
  OwnerAnalyticsResponse,
} from "@/types/owner-analytics";

export async function getOwnerAnalytics(): Promise<OwnerAnalyticsResponse> {
  return apiRequest<OwnerAnalyticsResponse>("/owner/analytics", {
    method: "GET",
  });
}
