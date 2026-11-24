
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface CustomerReview {
  id: string;
  booking: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    paymentStatus: string;
  } | null;
  customer: {
    id: string;
    name: string;
    profileImage?: string;
  } | null;
  equipment: {
    id: string;
    name: string;
  } | null;
  rating: number;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewListResponse {
  success: boolean;
  message: string;
  data: CustomerReview[];
  meta: {
    total: number;
  };
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewStatusPayload {
  status: "approved" | "rejected";
}

export interface SingleReviewResponse {
  success: boolean;
  message: string;
  data: CustomerReview;
}

export interface MyReviewStatus {
  bookingId: string;
  status: ReviewStatus;
}

export interface MyReviewsResponse {
  success: boolean;
  message: string;
  data: MyReviewStatus[];
  meta: {
    total: number;
  };
}