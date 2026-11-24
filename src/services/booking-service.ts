import { apiRequest } from "@/lib/api-client";

import type {
  MyRentalsResponse,
  OwnerRentalsResponse,
  CreateBookingPayload,
  Booking,
} from "@/types/booking";

type MyRentalsParams = {
  status?: string;
};

export type CreateBookingResponse = {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
    checkoutUrl: string;
  };
};

export type BookingPaymentStatus = {
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "failed" | "refunded";
  totalAmount: number;
  paidAt?: string | null;
  createdAt: string;
  equipment: {
    name: string;
    image?: string;
  } | null;
};

export type BookingPaymentStatusResponse = {
  success: boolean;
  message: string;
  data: BookingPaymentStatus;
};

export async function getMyRentals(
  params: MyRentalsParams = {},
): Promise<MyRentalsResponse> {
  return apiRequest<MyRentalsResponse>("/bookings/my-rentals", {
    method: "GET",
    params,
  });
}

export async function getOwnerRentals(
  params: MyRentalsParams = {},
): Promise<OwnerRentalsResponse> {
  return apiRequest<OwnerRentalsResponse>("/bookings/owner-rentals", {
    method: "GET",
    params,
  });
}

export async function completeOwnerRental(
  bookingId: string,
): Promise<{ success: boolean; message: string; data: Booking }> {
  return apiRequest<{ success: boolean; message: string; data: Booking }>(
    `/bookings/${bookingId}/complete`,
    {
      method: "PATCH",
    },
  );
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<CreateBookingResponse> {
  return apiRequest<CreateBookingResponse>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getBookingPaymentStatus(
  sessionId: string,
): Promise<BookingPaymentStatusResponse> {
  return apiRequest<BookingPaymentStatusResponse>("/bookings/payment-status", {
    method: "GET",
    params: {
      session_id: sessionId,
    },
  });
}
