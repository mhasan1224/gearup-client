
export type AdminUser = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "customer" | "owner" | "admin";
  phone?: string;
  address?: string;
  createdAt?: string;
};

export type AdminUsersResponse = {
  success: boolean;
  message: string;
  data: AdminUser[];
  meta: {
    total: number;
  };
};

export type UpdateUserRoleResponse = {
  success: boolean;
  message: string;
  data: {
    user: AdminUser;
  };
};

export type UpdateUserRolePayload = {
  role: "customer" | "owner";
};
