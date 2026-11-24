
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "paid"
  | "failed"
  | "refunded";

export type RentalType = "daily" | "weekly" | "monthly";

export type BookingEquipment = {
  _id: string;
  name: string;
  image: string;
  category: string;
  location: string;
  rentalType: RentalType;
};

export type OwnerRentalEquipment = BookingEquipment & {
  rentalPrice: number;
};

export type RentalCustomer = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
};

export type Booking = {
  _id: string;
  equipment: BookingEquipment;
  startDate: string;
  endDate: string;
  quantity: number;
  phone: string;
  deliveryAddress: string;
  notes: string;
  rentalPrice: number;
  rentalType: RentalType;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OwnerRental = Omit<Booking, "equipment"> & {
  equipment: OwnerRentalEquipment;
  customer: RentalCustomer;
  owner: string;
};

export type MyRentalsResponse = {
  success: boolean;
  message: string;
  data: Booking[];
  meta: {
    total: number;
  };
};

export type OwnerRentalsResponse = {
  success: boolean;
  message: string;
  data: OwnerRental[];
  meta: {
    total: number;
  };
};


export type CreateBookingPayload = {
  equipmentId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  phone: string;
  deliveryAddress: string;
  notes?: string;
};
