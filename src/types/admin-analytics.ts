
export type MonthlyRevenue = {
  year: number;
  month: number;
  revenue: number;
};

export type AdminAnalytics = {
  users: {
    total: number;
    customers: number;
    owners: number;
    admins: number;
  };
  equipment: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  bookings: {
    total: number;
    pending: number;
    completed: number;
  };
  revenue: {
    total: number;
    monthly: number;
    monthlyBreakdown: MonthlyRevenue[];
  };
};

export type AdminAnalyticsResponse = {
  success: boolean;
  message: string;
  data: AdminAnalytics;
};
