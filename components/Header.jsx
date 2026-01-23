"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navigate = (locationSlug) => {
    setDropdown(false);
    setMenuOpen(false);

    if (locationSlug === "all") {
      router.push("/properties/all");
    } else {
      router.push(`/properties/${locationSlug}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:text-blue-700">
          <Image
            src="/logo.png"
            alt="Doppel Homes Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-bold">Doppel Homes</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8">
          <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-700">About Us</Link></li>

          <li
            className="relative"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button className="flex items-center gap-1 hover:text-blue-700">
              Properties <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {dropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-10 left-0 w-56 rounded-2xl bg-white shadow-xl py-3"
                >
                  {LOCATIONS.map((loc) => (
                    <li
                      key={loc.slug}
                      onClick={() => navigate(loc.slug)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 hover:text-blue-700"
                    >
                      {loc.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><Link href="/contact" className="hover:text-blue-700">Contact Us</Link></li>
           <li>
           <Link href="/earn" className="font-semibold text-blue-700 hover:text-blue-800">
              Earn With Us
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="https://calendar.app.google/xf1evp8ohtsnY7Qo8"
          className="hidden md:flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800"
          target="_blank"
        >
          <FaCalendar /> Schedule Visit
        </a>

        {/* MOBILE BUTTON */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-6 space-y-4">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>

          <details>
            <summary className="flex justify-between cursor-pointer">
              Properties <ChevronDown size={16} />
            </summary>
            <div className="pl-4 mt-2 space-y-2">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.slug}
                  onClick={() => navigate(loc.slug)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {loc.label}
                </div>
              ))}
            </div>
          </details>

          <Link href="/contact">Contact Us</Link>
          <Link href="/earn" className="font-semibold text-blue-700 hover:text-blue-800">
            Earn With Us
          </Link>
        </div>
      )}
    </header>
  );
}
