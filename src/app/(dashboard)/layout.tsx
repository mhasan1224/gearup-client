
import DashboardLayout from "@/components/dashboard/dashboard-layout";

type DashboardRouteLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
