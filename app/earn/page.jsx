"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiUser, FiMapPin, FiUpload } from "react-icons/fi";

export default function EarnPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    gender: "",
    location: "",
    nin: "",
    idDocType: "NIN Slip",
    address: "",
    staffName: "",
    staffEmail: "",
    staffNumber: "",
    passport: null,
    validId: null,
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!form.fullName.trim()) throw new Error("Full name is required");
      if (!form.whatsapp.trim()) throw new Error("WhatsApp number is required");

      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });

      const res = await fetch("/api/send-email", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to send application");

      setSuccessPopup(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none";

  const labelClass = "text-sm font-medium text-gray-700 mb-1";

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-blue-600">Refer & Earn Commission</h2>
          <p className="text-gray-600 leading-relaxed">
            Join our affiliate program and earn up to <strong>5% commission</strong>{" "}
            when your referrals buy land from Doppel Homes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-4 p-5 border rounded-xl shadow-sm bg-white">
              <FiPhone className="text-blue-600 text-2xl" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-600 text-sm">+234-906-169-9005</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 border rounded-xl shadow-sm bg-white">
              <FiMail className="text-blue-600 text-2xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 text-sm">info@doppelhomes.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6"
        >
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* FULL NAME & EMAIL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* WHATSAPP & GENDER */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Gender (optional)</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className={labelClass}>Location (optional)</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* ID TYPE */}
          <div>
            <label className={labelClass}>ID Type</label>
            <select
              name="idDocType"
              value={form.idDocType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="NIN Slip">NIN Slip</option>
              <option value="Driver’s License">Driver’s License</option>
              <option value="Voter’s Card">Voter’s Card</option>
              <option value="International Passport">International Passport</option>
            </select>
          </div>

          {/* FILE UPLOADS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Passport Photograph</label>
              <input type="file" name="passport" onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>ID Document</label>
              <input type="file" name="validId" onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className={labelClass}>Residential Address (optional)</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </div>

          {/* STAFF REFERRAL */}
          <div>
            <p className="font-semibold text-gray-800 mb-2">Staff Referral (Optional)</p>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="staffName"
                value={form.staffName}
                onChange={handleChange}
                placeholder="Staff Name"
                className={inputClass}
              />
              <input
                type="email"
                name="staffEmail"
                value={form.staffEmail}
                onChange={handleChange}
                placeholder="Staff Email"
                className={inputClass}
              />
              <input
                type="text"
                name="staffNumber"
                value={form.staffNumber}
                onChange={handleChange}
                placeholder="Staff Phone"
                className={inputClass}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </motion.button>
        </motion.form>
      </div>

      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm">
            <h3 className="text-xl font-bold text-green-600 mb-3">Form Submitted!</h3>
            <p className="text-gray-700">
              Form submitted successfully.  
              Check your email in the next 48hrs for login details.
            </p>
            <button
              onClick={() => setSuccessPopup(false)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </section>
  );
}