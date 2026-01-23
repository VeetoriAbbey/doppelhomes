
 "use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Square, Car } from "lucide-react";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";


export default function PropertyCard({ property }) {
  if (!property) return null; // prevent crash
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
    >
      {/* IMAGE */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden m-4">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="px-5 pb-6 space-y-4">
        {/* TITLE */}
        <h3 className="text-xl font-bold text-gray-900">
          {property.title}
        </h3>
        <p className="text-blue-800 flex items-center gap-1">
        <FaMapMarkerAlt />
        {property.location} {/* full descriptive location */}
      </p>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <BedDouble size={16} className="text-indigo-600" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>

          <div className="flex items-center gap-2">
            <Square size={16} className="text-blue-800" />
            <span>{property.size}</span>
          </div>

          <div className="flex items-center gap-2">
            <Car size={16} className="text-blue-800" />
            <span>BQ: {property.BQ ? "Yes" : "No"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Type:</span>
            <span>{property.type}</span>
          </div>
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-lg">
            <FaMoneyBillWave />
            <span>{property.price}</span>
          </div>

          <a
          href={property.schedule}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-full transition"
        >
          Schedule a visit
        </a>
        </div>
      </div>
    </motion.div>
  );
}

 