"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaShieldAlt, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

export default function FeaturedProperties() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "King's Court, Maitama 2 – 500sqm 5-Bedroom Duplex with BQ",
      content:
        "Meticulously verified land in Abuja’s most sought-after enclave, paired with a contemporary duplex design that balances generous family living spaces and premium finishes.",
    },
    {
      title: "How does this work?",
      content: (
        <div className="space-y-3">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Select Your Plot</li>
            <li>Secure with Deposit</li>
            <li>Flexible Installments</li>
            <li>Progress Updates</li>
            <li>Handover & Move-In</li>
          </ol>

          <p className="italic font-semibold text-gray-900">
            Transparent milestones, no hidden fees—just straightforward steps to your new Doppel Homes residence.
          </p>
        </div>
      ),
    },
    {
      title: "Why is Doppel Homes the best?",
      content:
        "Doppel Homes stands out by offering fully verified land titles in prime, master-planned estates, paired with quality turnkey homes and transparent, flexible payment plans.",
    },
  ];

  return (
    // ✅ Mobile background set to WHITE, desktop stays gray-50
    <section className="py-16 bg-white md:bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10 items-start">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="/images/mai3.jpg"
            alt="Featured Property"
            className="rounded-2xl shadow-lg w-full object-cover"
          />

          <a
            href="/properties/all"
            className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-3 rounded-full shadow-md border border-gray-200 active:scale-95 transition"
            aria-label="View all properties"
          >
            <FaHome className="text-blue-800 text-2xl" />
          </a>
        </motion.div>

        {/* CENTER CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="mb-6">
            <h6 className="text-green-600 font-semibold uppercase">| Featured</h6>
            <h2 className="text-3xl font-bold text-gray-900">Property Spotlight</h2>
          </div>

          {/* ACCORDION */}
          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={item.title} // ✅ better than index (stable key)
                className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="
                    w-full flex justify-between items-center gap-4
                    p-4 text-left font-semibold
                    text-gray-900
                    hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-blue-200
                  "
                >
                  {/* ✅ force readable title on mobile */}
                  <span className="text-[15px] md:text-base leading-snug">
                    {item.title}
                  </span>

                  <span
                    className="shrink-0 w-8 h-8 rounded-full grid place-items-center bg-gray-100 text-gray-900"
                    aria-hidden="true"
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4"
                    >
                      {/* ✅ stronger contrast text */}
                      <div className="text-gray-800 text-[15px] md:text-base leading-relaxed">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT INFO TABLE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <FaHome className="text-blue-800 text-2xl" />
              <div>
                <h4 className="font-bold text-gray-900">500sqm</h4>
                {/* ✅ was text-gray-500 (too faint), now stronger */}
                <p className="text-gray-700 text-sm">Total Land Size</p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <FaCheckCircle className="text-green-600 text-2xl" />
              <div>
                <h4 className="font-bold text-gray-900">BQ</h4>
                <p className="text-gray-700 text-sm">Yes</p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <FaShieldAlt className="text-purple-600 text-2xl" />
              <div>
                <h4 className="font-bold text-gray-900">Safety</h4>
                <p className="text-gray-700 text-sm">24/7 Security</p>
              </div>
            </li>

            <li className="flex items-center gap-4">
              <FaMoneyBillWave className="text-emerald-600 text-2xl" />
              <div>
                <h4 className="font-bold text-gray-900">Payment</h4>
                <p className="text-gray-700 text-sm">50% Deposit</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
