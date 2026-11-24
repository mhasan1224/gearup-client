
"use client";

import { useSession } from "@/lib/auth-client";
import DashboardSidebar from "./dashboard-sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm font-medium text-muted-foreground">
          Please sign in to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar />
        </div>
      </div>

      <div className="min-w-0">
        <div className="border-b border-border bg-card px-4 py-4 lg:hidden">
          <DashboardSidebar />
        </div>

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
