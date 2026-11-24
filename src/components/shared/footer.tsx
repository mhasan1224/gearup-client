
import Link from "next/link";
import { ArrowUp, Mail, MapPin } from "lucide-react";

import { publicNavigation } from "@/lib/navigation";

const footerLinks = [
  {
    title: "Explore",
    links: [
      ...publicNavigation,
      { label: "Register", href: "/register" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Customer Dashboard", href: "/dashboard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#071827] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#00D6A3] font-[var(--font-manrope)] text-xl font-extrabold text-[#071827]">
                G
              </span>

              <span className="font-[var(--font-manrope)] text-2xl font-extrabold">
                Gear<span className="text-[#00D6A3]">Up</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Your trusted equipment rental platform. Find the right
              equipment for your projects and connect with equipment owners
              through a simple rental experience.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-[var(--font-manrope)] text-base font-bold">
                {group.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-[#00D6A3]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
          <div className="flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <Mail size={16} className="text-[#00D6A3]" />
              Contact through our platform
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-[#00D6A3]" />
              Equipment rental marketplace
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} GearUp Rentals. All rights
              reserved.
            </p>

            <Link
              href="#"
              aria-label="Back to top"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-[#00D6A3]/40 hover:text-[#00D6A3]"
            >
              <ArrowUp size={17} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
