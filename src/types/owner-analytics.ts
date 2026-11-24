export type MonthlyEarning = {
  year: number;
  month: number;
  earnings: number;
};

export type OwnerAnalytics = {
  equipment: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  rentals: {
    completed: number;
  };
  earnings: {
    total: number;
    monthly: number;
    monthlyBreakdown: MonthlyEarning[];
  };
};

export type OwnerAnalyticsResponse = {
  success: boolean;
  message: string;
  data: OwnerAnalytics;
};
