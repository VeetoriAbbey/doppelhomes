"use client";

import { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Section */}
      <section className="w-full py-20 bg-gray-50">
        {/* Heading */}
        <div className="max-w-7xl mx-auto px-4 bg-blue text-center">
          <h6 className="text-sm text-green-600 font-semibold text-primary mb-2">
            | Video View
          </h6>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Get Closer View & Different Feeling
          </h2>
        </div>

        {/* Video Thumbnail */}
        <div className="max-w-5xl mx-auto px-4 mt-12">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img
              src="/images/mai1.jpg"
              alt="Video Preview"
              className="w-full h-[260px] sm:h-[360px] md:h-[460px] object-cover"
            />

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
              <button
                onClick={() => setOpen(true)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 backdrop-blur-xl flex items-center justify-center text-white transition hover:scale-110"
              >
                <FaPlay className="ml-1 text-xl md:text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-2xl rounded-xl overflow-hidden shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-xl hover:scale-110"
            >
              <FaTimes />
            </button>

            {/* Video Embed */}
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/share/1CdReFxhX4/&show_text=false"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
