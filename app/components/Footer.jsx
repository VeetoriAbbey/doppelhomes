import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= TOP GRID ================= */}
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-gray-700">

          {/* ===== BRAND ===== */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Doppel Homes
            </h3>
            <p className="text-sm leading-relaxed">
              Doppel Homes Limited is a trusted real estate company providing
              verified land sales and expert real estate advisory services
              across Nigeria.
            </p>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== CONTACT INFO ===== */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Office Address
            </h4>

            <div className="space-y-3 text-sm">
              <p className="flex gap-2">
                <FaMapMarkerAlt className="mt-1 text-green-500" />
                <span>
                  No. 17, Oladipo Diya Way, AGL Motors,<br />
                  Gudu, Abuja
                </span>
              </p>

              <p className="flex gap-2">
                <FaPhoneAlt className="mt-1 text-green-500" />
                <a href="tel:+2349061699005" className="hover:text-white">
                  +234 906 169 9005
                </a>
              </p>

              <p className="flex gap-2">
                <FaEnvelope className="mt-1 text-green-500" />
                <a
                  href="mailto:info@doppelhomes.com"
                  className="hover:text-white"
                >
                  info@doppelhomes.com
                </a>
              </p>
            </div>
          </div>

          {/* ===== SOCIALS ===== */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h4>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1CdReFxhX4/"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-700 text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/doppelgroups_ltd?igsh=bDBpdnJtdWhobWVq"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-700 text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@doppel.homes.ltd"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-700 text-white transition"
              >
                <FaTiktok />
              </a>
              <a
                href="https://wa.me/2349061696005"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-700 text-white transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Doppel Homes Limited. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
