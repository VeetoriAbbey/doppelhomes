"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";

function safeText(value, fallback = "") {
  if (typeof value === "string" && value.trim()) return value;
  return fallback;
}

function humanizeSlug(value) {
  const str = safeText(value, "");
  return str ? str.replace(/-/g, " ") : "";
}

export default function PropertyHeader({
  title,
  location,
  subtitle,
  backHref = "/properties",
}) {
  // ✅ These will NEVER crash
  const displayTitle = safeText(title, "Property");
  const displayLocation = humanizeSlug(location) || safeText(location, "");
  const displaySubtitle =
    safeText(subtitle, "") ||
    (displayLocation ? `Properties in ${displayLocation}` : "Verified listings");

  return (
    <section className="relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-neutral-900" />
       <Image
                  src="/images/property-banner.jpg"
                  alt="About background"
                  fill
                  priority
                  className="object-cover blur-sm scale-105"
                />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          {displayLocation ? (
            <div className="hidden items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur sm:inline-flex">
              <MapPin className="h-4 w-4" />
              {displayLocation}
            </div>
          ) : null}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {displayTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
          className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base"
        >
          {displaySubtitle}
        </motion.p>
      </div>
    </section>
  );
}
