
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        {/* Eyebrow */}
        <span className="mb-6 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
          Your project starts with the right equipment
        </span>

        {/* Hero Heading */}
        <h1 className="max-w-4xl font-heading text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Rent smarter.
          <span className="block text-accent">
            Work better.
          </span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Discover reliable equipment for your next project.
          Rent what you need or turn your idle equipment into
          income with GearUp.
        </p>

        {/* Hero Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/equipment"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Search className="size-4" />
            Explore Equipment
          </Link>

          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
