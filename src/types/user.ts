
export type UserRole = "customer" | "owner" | "admin";

export type UserProfile = {
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UserProfileResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
  };
};

export type UpdateProfilePayload = {
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
};
