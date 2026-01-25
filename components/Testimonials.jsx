"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ibrahim S.",
    role: "Land Buyer, Abuja",
    quote:
      "Doppel Homes made the entire process seamless. From inspection to documentation, everything was transparent.",
  },
  {
    name: "Deborah A.",
    role: "First-time Investor",
    quote:
      "I felt confident buying land for the first time. The team explained everything clearly and patiently.",
  },
  {
    name: "Chukwuemeka O.",
    role: "Client",
    quote:
      "Professional, responsive, and trustworthy. Doppel Homes delivers exactly what they promise.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // ✅ Auto slide (safe: uses state updater)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 overflow-x-hidden">
      <div className="text-center mb-12">
        <p className="text-blue-700 font-semibold">Testimonials</p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          What Our Clients Say
        </h2>

        {/* ✅ stronger on mobile */}
        <p className="text-gray-700 md:text-gray-600 max-w-xl mx-auto mt-3">
          Real experiences from people who trusted Doppel Homes with their
          property journey.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            // ✅ Use smaller translate + GPU transform to avoid overflow “shake”
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 md:p-8 text-center transform-gpu"
          >
            {/* ✅ stronger text on mobile */}
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              “{testimonials[index].quote}”
            </p>

            <div className="mt-6">
              <p className="font-bold text-gray-900">
                {testimonials[index].name}
              </p>
              <p className="text-sm text-gray-700 md:text-gray-500">
                {testimonials[index].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        {/* ✅ Keep buttons INSIDE with padding so they don’t cause overflow on small screens */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-blue-700" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
