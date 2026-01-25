"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Square, Car } from "lucide-react";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PropertyCard({ property }) {
  const router = useRouter();
  if (!property) return null;

  const goToDetails = () => router.push(`/property/${property.id}`);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetails()}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 cursor-pointer"
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
        <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>

        <p className="text-blue-800 flex items-center gap-1">
          <FaMapMarkerAlt />
          {property.location}
        </p>

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

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-lg">
            <FaMoneyBillWave />
            <span>{property.price}</span>
          </div>

          {/* Stop click from opening details */}
          <a
            onClick={(e) => e.stopPropagation()}
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
