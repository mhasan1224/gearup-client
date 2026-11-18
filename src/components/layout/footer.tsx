
import Link from "next/link";
import {
  ArrowUpRight,
  Zap,
  ShieldCheck,
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#071827] via-[#102b40] to-[#071827] text-white">

      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[450px] rounded-full bg-[#00d6a3]/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[400px] rounded-full bg-[#087f68]/10 blur-[130px]" />

      {/* Top Accent Line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00d6a3]/80 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-[#071827] shadow-[0_5px_25px_rgba(0,214,163,0.2)] transition-all duration-300 group-hover:-rotate-6 group-hover:shadow-[0_8px_30px_rgba(0,214,163,0.35)]">
                <Zap size={23} strokeWidth={2.5} />
              </span>

              <span>
                <span className="block font-heading text-2xl font-extrabold tracking-tight text-white">
                  Gear<span className="text-[#00d6a3]">Up</span>
                </span>

                <span className="block text-[9px] font-bold tracking-[0.25em] text-[#b8c5d1]/70">
                  RENTALS
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#b8c5d1]">
              Your trusted equipment rental marketplace. Find the tools
              you need for every project or earn more by sharing the
              equipment you own.
            </p>

            <Link
              href="/equipment"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#00d6a3] transition-colors hover:text-white"
            >
              Explore the marketplace
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

            {/* Trust Note */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-[#00d6a3]" />
              <span className="text-xs font-medium text-[#b8c5d1]">
                Smarter. Simpler. More accessible.
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-white">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#b8c5d1]/75 transition-colors duration-200 hover:text-[#00d6a3]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#b8c5d1]/75 transition-colors duration-200 hover:text-[#00d6a3]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-heading text-sm font-bold text-white">
              Your Account
            </h3>

            <ul className="mt-6 space-y-4">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#b8c5d1]/75 transition-colors duration-200 hover:text-[#00d6a3]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-[#b8c5d1]/65">
            © {new Date().getFullYear()} GearUp. All rights reserved.
          </p>

          <p className="text-xs text-[#b8c5d1]/65">
            Built for smarter equipment sharing.
          </p>

        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#087f68] via-[#00d6a3] to-[#087f68]" />
    </footer>
  );
}
