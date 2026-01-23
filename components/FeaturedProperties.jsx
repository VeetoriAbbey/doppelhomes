'use client'


import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

export default function FeaturedProperties() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title:
        "King's Court, Maitama 2 – 500sqm 5-Bedroom Duplex with BQ",
      content:
        "Meticulously verified land in Abuja’s most sought-after enclave, paired with a contemporary duplex design that balances generous family living spaces and premium finishes.",
    },
    {
      title: "How does this work?",
      content: (
        <ol className="list-decimal ml-5 space-y-1">
          <li>Select Your Plot</li>
          <li>Secure with Deposit</li>
          <li>Flexible Installments</li>
          <li>Progress Updates</li>
          <li>Handover & Move-In</li>
          <p className="mt-3 italic font-semibold">
            Transparent milestones, no hidden fees—just straightforward steps
            to your new Doppel Homes residence.
          </p>
        </ol>
      ),
    },
    {
      title: "Why is Doppel Homes the best?",
      content:
        "Doppel Homes stands out by offering fully verified land titles in prime, master-planned estates, paired with quality turnkey homes and transparent, flexible payment plans.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10 items-start">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="/images/mai3.jpg"
            alt="Featured Property"
            className="rounded-xl shadow-lg w-full object-cover"
          />
          <a
            href="/properties/all"
            className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md"
          >
            <FaHome className="text-blue-800 text-2xl" />
          </a>
        </motion.div>

        {/* CENTER CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="mb-6">
            <h6 className="text-green-600 font-semibold uppercase">
              | Featured
            </h6>
            <h2 className="text-3xl font-bold text-gray-900">
              Property Spotlight
            </h2>
          </div>

          {/* ACCORDION */}
          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg bg-white shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-4 font-semibold text-left"
                >
                  {item.title}
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-700"
                  >
                    {item.content}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT INFO TABLE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <FaHome className="text-blue-800 text-2xl" />
              <h4 className="font-bold">
                500sqm <br />
                <span className="font-normal text-gray-500">
                  Total Land Size
                </span>
              </h4>
            </li>

            <li className="flex items-center gap-4">
              <FaCheckCircle className="text-green-600 text-2xl" />
              <h4 className="font-bold">
                BQ <br />
                <span className="font-normal text-gray-500">Yes</span>
              </h4>
            </li>

            <li className="flex items-center gap-4">
              <FaShieldAlt className="text-purple-600 text-2xl" />
              <h4 className="font-bold">
                Safety <br />
                <span className="font-normal text-gray-500">
                  24/7 Security
                </span>
              </h4>
            </li>

            <li className="flex items-center gap-4">
              <FaMoneyBillWave className="text-emerald-600 text-2xl" />
              <h4 className="font-bold">
                Payment <br />
                <span className="font-normal text-gray-500">
                  50% Deposit
                </span>
              </h4>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
