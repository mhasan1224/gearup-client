
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-[#071827] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#00D6A3]/15 blur-3xl" />

        <Link
          href="/"
          className="relative z-10 inline-flex w-fit items-center gap-3"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-[#00D6A3] font-heading text-xl font-extrabold text-[#071827]">
            G
          </span>
          <span className="font-heading text-2xl font-extrabold">
            GearUp
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00D6A3]/30 bg-[#00D6A3]/10 px-4 py-2 text-sm font-semibold text-[#00D6A3]">
            <ShieldCheck size={16} />
            Your Project Starts Here
          </span>

          <h1 className="mt-7 font-heading text-5xl font-extrabold leading-tight">
            The Right Equipment.
            <span className="block text-[#00D6A3]">
              The Right Opportunity.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
            Discover quality equipment, connect with trusted
            owners and make your next project easier with GearUp.
          </p>
        </div>

        <p className="relative z-10 text-sm text-slate-400">
          © {new Date().getFullYear()} GearUp. All rights reserved.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between lg:justify-end">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary lg:hidden"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-heading font-extrabold text-primary-foreground">
              G
            </span>
            GearUp
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          {children}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to GearUp's Terms of Service and Privacy Policy.
        </p>
      </section>
    </main>
  );
}
