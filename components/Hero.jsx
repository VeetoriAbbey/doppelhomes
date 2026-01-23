"use client";


import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Grace Vine",
    location: "Airport Rd",
    subtitle: "Sharing Fence with Hutu",
     image: "/images/banner1.png"
  },
  {
    id: 2,
    title: "Amazon City",
    location: "Kuje",
    subtitle: "Beside Wood Hill Estate",
    image: "/images/banner2.png",
  },
  {
    id: 3,
    title: "Max Smart City",
    location: "Asokoro",
    subtitle: "Asokoro Hilltop",
    image: "/images/banner3.png",
  },
  {
    id: 4,
    title: "Kings Court Estate",
    location: "Maitama 2",
    subtitle: "Sharing Boundaries with Navy Town",
    image: "/images/banner4.jpg",
  },
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
    <section className="relative w-full h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Glass Content */}
          {/* Text Overlay */}
<div className="absolute inset-0 flex items-center px-6 md:px-20">
  <div className="max-w-3xl text-white">

    {/* Location pill */}
    <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full 
                    bg-white/20 backdrop-blur-md border border-white/30">
      <span className="text-red-500">📍</span>
      <span className="text-blue-400 font-semibold">{slide.location}</span>
      <span className="text-white/90">Abuja</span>
    </div>

    {/* Estate name */}
    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide uppercase">
      {slide.title}
    </h1>

    {/* Subtitle */}
    <p className="mt-4 text-lg md:text-2xl text-white/90">
      {slide.subtitle}
    </p>

    {/* CTA */}
    <a
      href="https://calendar.app.google/xf1evp8ohtsnY7Qo8"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-8 px-8 py-4 rounded-full 
                 bg-white text-black font-semibold 
                 hover:bg-gray-200 transition"
    >
      Schedule a Site Inspection
    </a>

  </div>
</div>

        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
