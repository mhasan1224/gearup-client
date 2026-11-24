
import { Suspense, type ReactNode } from "react";

export default function PaymentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[75vh] items-center justify-center bg-background px-4">
          <div className="text-center">
            <div className="mx-auto size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              Loading payment page...
            </p>
          </div>
        </main>
      }
    >
      {children}
    </Suspense>
  );
}
