
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  PlusCircle,
  Search,
  X,
  Zap,
} from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "Categories", href: "/equipment", hasDropdown: true },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-white/10 bg-[#071827]/95 shadow-lg shadow-black/10 backdrop-blur-2xl"
          : "border-white/10 bg-[#071827]/85 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-5 px-5 sm:h-20 sm:px-8 lg:px-10">

        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="GearUp home"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#00d6a3] text-[#071827] shadow-[0_0_24px_rgba(0,214,163,0.18)] transition-transform duration-300 group-hover:-rotate-6 sm:size-12">
            <Zap size={25} strokeWidth={2.5} />
          </span>

          <span className="flex items-baseline font-heading text-[22px] font-extrabold tracking-tight text-white sm:text-2xl">
            Gear<span className="text-[#00d6a3]">Up</span>
            <span className="ml-2 self-center font-sans text-[9px] font-bold tracking-[0.16em] text-white/65 sm:text-[10px]">
              RENTALS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden h-full items-center gap-6 xl:flex 2xl:gap-8">
          {navigationLinks.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`group relative flex h-full items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200 2xl:text-sm ${
                  active
                    ? "text-[#00d6a3]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}

                {link.hasDropdown && (
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                )}

                <span
                  className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-[#00d6a3] transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">

          <Link
            href="/equipment"
            aria-label="Search equipment"
            className="flex size-10 items-center justify-center rounded-full text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-[#00d6a3]"
          >
            <Search size={21} />
          </Link>

          <span className="h-8 w-px bg-white/15" />

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#00d6a3]/60 hover:bg-white/10"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00d6a3] px-5 text-sm font-bold text-[#071827] shadow-[0_0_20px_rgba(0,214,163,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00efbd] hover:shadow-[0_0_28px_rgba(0,214,163,0.25)]"
          >
            List Your Equipment
            <PlusCircle
              size={17}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:border-[#00d6a3]/50 hover:bg-white/10 xl:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#071827]/98 backdrop-blur-2xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-8">

              {navigationLinks.map((link, index) => {
                const active = isActiveLink(link.href);

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.045 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[#00d6a3]/10 text-[#00d6a3]"
                          : "text-white/75 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}

                      {link.hasDropdown && (
                        <ChevronDown size={16} />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00d6a3] text-sm font-bold text-[#071827] transition-colors hover:bg-[#00efbd]"
                >
                  List Equipment
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <Link
                href="/equipment"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium text-white/65 transition-colors hover:text-[#00d6a3]"
              >
                <Search size={17} />
                Search Equipment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
