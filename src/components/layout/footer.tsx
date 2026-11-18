
import Link from "next/link";
import {
  ArrowUpRight,
  Zap,
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "All Equipment", href: "/equipment" },
    { label: "Categories", href: "/equipment" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  account: [
    { label: "Log In", href: "/login" },
    { label: "Create Account", href: "/register" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:-rotate-6">
                <Zap size={22} strokeWidth={2.5} />
              </span>

              <span className="font-heading text-2xl font-extrabold tracking-tight">
                Gear<span className="text-accent">Up</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Your trusted equipment rental marketplace.
              Find the tools you need for every project
              or earn more by sharing the equipment you own.
            </p>

            <Link
              href="/equipment"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
            >
              Explore the marketplace
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-heading text-sm font-bold">
              Explore
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading text-sm font-bold">
              Company
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-heading text-sm font-bold">
              Your Account
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GearUp. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built for smarter equipment sharing.
          </p>
        </div>
      </div>
    </footer>
  );
}
