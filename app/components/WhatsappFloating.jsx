"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappFloating() {
  return (
    <motion.a
      href="https://wa.me/2349061696005"
      target="_blank"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
