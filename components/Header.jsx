"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaCalendar } from "react-icons/fa";

const LOCATIONS = [
  { label: "Show All", slug: "all" },
  { label: "Maitama 2", slug: "maitama-2" },
  { label: "Katampe Extension", slug: "katampe-extension" },
  { label: "Asokoro", slug: "asokoro" },
  { label: "Katampe Main", slug: "katampe-main" },
  { label: "Guzape 2", slug: "guzape-2" },
  { label: "Life Camp", slug: "life-camp" },
  { label: "Kuje", slug: "kuje" },
  { label: "Pyakasa", slug: "pyakasa" },
  { label: "Airport Road", slug: "airport-road" },
  { label: "Kabusa", slug: "kabusa" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const linkClass = (href) =>
    cn(
      "font-semibold transition-colors",
      isActive(href) ? "text-blue-700" : "text-gray-900 hover:text-blue-700"
    );

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(false);
  };

  const navigateLocation = (locationSlug) => {
    closeMenu();

    // Your app routes show /properties/[location]
    // You currently push /properties/all for Show All
    router.push(`/properties/${locationSlug}`);
  };

  const propertiesActive = useMemo(() => pathname?.startsWith("/properties"), [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-700"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="Doppel Homes Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold text-gray-900">Doppel Homes</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link href="/" className={linkClass("/")} onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className={linkClass("/about")} onClick={closeMenu}>
              About Us
            </Link>
          </li>

          {/* Properties dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setDesktopDropdown(true)}
            onMouseLeave={() => setDesktopDropdown(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 font-semibold transition-colors",
                propertiesActive ? "text-blue-700" : "text-gray-900 hover:text-blue-700"
              )}
              type="button"
            >
              Properties <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {desktopDropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-10 left-0 w-56 rounded-2xl bg-white shadow-xl py-3 border border-gray-100"
                >
                  {LOCATIONS.map((loc) => (
                    <li
                      key={loc.slug}
                      onClick={() => navigateLocation(loc.slug)}
                      className="cursor-pointer px-4 py-2 font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
                    >
                      {loc.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/services" className={linkClass("/services")} onClick={closeMenu}>
              Services
            </Link>
          </li>

          <li>
            <Link href="/contact" className={linkClass("/contact")} onClick={closeMenu}>
              Contact Us
            </Link>
          </li>

          <li>
            <Link
              href="/earn"
              className={cn(
                "font-semibold transition-colors",
                isActive("/earn") ? "text-blue-700" : "text-blue-700 hover:text-blue-800"
              )}
              onClick={closeMenu}
            >
              Earn With Us
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="https://calendar.app.google/xf1evp8ohtsnY7Qo8"
          className="hidden md:flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800"
          target="_blank"
          rel="noreferrer"
        >
          <FaCalendar /> Schedule Visit
        </a>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          type="button"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white px-6 pb-6 pt-2 space-y-3 border-t"
          >
            <Link href="/" onClick={closeMenu} className={cn("block py-2", linkClass("/"))}>
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className={cn("block py-2", linkClass("/about"))}
            >
              About Us
            </Link>

            {/* Mobile Properties dropdown (no <details> to avoid faint summary styling) */}
            <button
              type="button"
              onClick={() => setMobileDropdown((v) => !v)}
              className={cn(
                "w-full flex items-center justify-between py-2 font-semibold",
                propertiesActive ? "text-blue-700" : "text-gray-900"
              )}
            >
              Properties <ChevronDown size={16} className={cn(mobileDropdown && "rotate-180 transition")} />
            </button>

            <AnimatePresence>
              {mobileDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pl-2"
                >
                  <div className="space-y-1 rounded-xl border border-gray-100 p-2">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => navigateLocation(loc.slug)}
                        className="w-full text-left px-3 py-2 rounded-lg font-medium text-gray-900 hover:bg-gray-100"
                        type="button"
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/services"
              onClick={closeMenu}
              className={cn("block py-2", linkClass("/services"))}
            >
              Services
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className={cn("block py-2", linkClass("/contact"))}
            >
              Contact Us
            </Link>

            <Link
              href="/earn"
              onClick={closeMenu}
              className={cn("block py-2 font-semibold", isActive("/earn") ? "text-blue-700" : "text-blue-700")}
            >
              Earn With Us
            </Link>

            <a
              href="https://calendar.app.google/xf1evp8ohtsnY7Qo8"
              className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 mt-2"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <FaCalendar /> Schedule Visit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
