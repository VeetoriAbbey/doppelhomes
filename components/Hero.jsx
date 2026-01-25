"use client";

import { useState, useEffect } from "react";

const slides = [
  { id: 1, title: "Grace Vine", location: "Airport Rd", subtitle: "Sharing Fence with Hutu", image: "/images/banner1.png" },
  { id: 2, title: "Amazon City", location: "Kuje", subtitle: "Beside Wood Hill Estate", image: "/images/banner2.png" },
  { id: 3, title: "Max Smart City", location: "Asokoro", subtitle: "Asokoro Hilltop", image: "/images/banner3.png" },
  { id: 4, title: "Kings Court Estate", location: "Maitama 2", subtitle: "Sharing Boundaries with Navy Town", image: "/images/banner4.jpg" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85svh] md:min-h-[85vh] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={[
            "absolute inset-0",
            "transition-opacity duration-700 ease-in-out",
            "will-change-opacity",
            "transform-gpu", // ✅ smoother on mobile
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none",
          ].join(" ")}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center select-none"
            draggable={false}
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* ✅ Stable container: prevents padding “jump” */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-20">
              <div className="max-w-3xl text-white">
                <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/15 border border-white/25 md:bg-white/20 md:backdrop-blur-md">
                  <span className="text-red-300">📍</span>
                  {/* ✅ stronger on mobile */}
                  <span className="text-blue-200 md:text-blue-300 font-semibold">
                    {slide.location}
                  </span>
                  {/* ✅ full white on mobile */}
                  <span className="text-white md:text-white/90">Abuja</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide uppercase drop-shadow-sm">
                  {slide.title}
                </h1>

                {/* ✅ full white on mobile */}
                <p className="mt-4 text-lg md:text-2xl text-white md:text-white/90 drop-shadow-sm">
                  {slide.subtitle}
                </p>

                <a
                  href="https://calendar.app.google/xf1evp8ohtsnY7Qo8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 active:scale-[0.98] transition"
                >
                  Schedule a Site Inspection
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${index === current ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
