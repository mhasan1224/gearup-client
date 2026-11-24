
import { apiRequest } from "@/lib/api-client";

import type {
  AdminAnalyticsResponse,
} from "@/types/admin-analytics";

export async function getAdminAnalytics(): Promise<AdminAnalyticsResponse> {
  return apiRequest<AdminAnalyticsResponse>("/admin/analytics", {
    method: "GET",
  });
}
