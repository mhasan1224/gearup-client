import { apiRequest } from "@/lib/api-client";

import type {
  ReviewListResponse,
  SingleReviewResponse,
  CreateReviewPayload,
  UpdateReviewStatusPayload,
  MyReviewsResponse,
} from "@/types/review";

export const reviewService = {
  getAll: (limit = 10) =>
    apiRequest<ReviewListResponse>("reviews", {
      method: "GET",
      params: { limit },
    }),

  getFeatured: (limit = 4) =>
    apiRequest<ReviewListResponse>("reviews/featured", {
      method: "GET",
      params: { limit },
    }),

  getMy: () =>
    apiRequest<MyReviewsResponse>("reviews/my", {
      method: "GET",
    }),

  create: (payload: CreateReviewPayload) =>
    apiRequest<SingleReviewResponse>("reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateStatus: (reviewId: string, payload: UpdateReviewStatusPayload) =>
    apiRequest<SingleReviewResponse>(`reviews/${reviewId}/status`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};
