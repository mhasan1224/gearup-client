
import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

interface DashboardRootLayoutProps {
  children: ReactNode;
}

export default function DashboardRootLayout({
  children,
}: DashboardRootLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
