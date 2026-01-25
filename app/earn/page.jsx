"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiPhone, FiMail, FiUser, FiMapPin, FiUpload } from "react-icons/fi";

/**
 * EarnPage (Affiliate Application) — FULL WORKING VERSION
 *
 * Works with the backend we built:
 *  - POST /api/affiliate/upload   (FormData: passport, idDoc)
 *  - POST /api/affiliate/apply    (JSON: fullName, phone, idDocType, passportPath, idDocPath)
 *
 * Fixes "Unexpected token <" and "not valid JSON" by safely parsing responses.
 * If not logged in, it redirects to /affiliate/login.
 */

const REQUIRED_W = 600;
const REQUIRED_H = 600;

async function checkImageDimensions(file) {
  if (!file?.type?.startsWith("image/")) {
    return { ok: false, error: "Passport must be an image (JPG/PNG/WEBP)." };
  }

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    if (img.width !== REQUIRED_W || img.height !== REQUIRED_H) {
      return {
        ok: false,
        error: `Passport must be ${REQUIRED_W}x${REQUIRED_H}px (current: ${img.width}x${img.height}px).`,
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not read passport image dimensions." };
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const json = await res.json();
    return { isJson: true, json };
  }
  const text = await res.text();
  return { isJson: false, text };
}

function extractErrorMessage(body, fallback = "Request failed") {
  if (body?.isJson) return body.json?.error || fallback;
  // Avoid dumping a whole HTML page in the UI; show a short message.
  const raw = (body?.text || "").trim();
  if (!raw) return fallback;
  if (raw.startsWith("<!DOCTYPE") || raw.startsWith("<html")) return fallback;
  return raw.slice(0, 300);
}

export default function EarnPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    gender: "",
    location: "",
    nin: "",
    idDocType: "NIN Slip",
    passport: null,
    validId: null,
    state: "",
    country: "",
    address: "",
    staffName: "",
    staffEmail: "",
    staffNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage("");
    setLoading(true);

    try {
      if (!form.fullName?.trim()) throw new Error("Full name is required.");
      if (!form.whatsapp?.trim()) throw new Error("WhatsApp number is required.");
      if (!form.passport) throw new Error("Passport is required.");
      if (!form.validId) throw new Error("Valid ID is required.");

      // Passport dimension check (client-side)
      const dim = await checkImageDimensions(form.passport);
      if (!dim.ok) throw new Error(dim.error);

      // 1) Upload files
      const fd = new FormData();
      fd.append("passport", form.passport);
      fd.append("idDoc", form.validId); // IMPORTANT: API expects "idDoc"

      const upRes = await fetch("/api/affiliate/upload", {
        method: "POST",
        body: fd,
      });

      const upBody = await parseResponse(upRes);

      if (!upRes.ok) {
        // If not logged in, send to login (most common reason for HTML responses)
        if (upRes.status === 401) {
          window.location.href = "/affiliate/login";
          return;
        }
        throw new Error(extractErrorMessage(upBody, "Upload failed"));
      }

      const { passportPath, idDocPath } = upBody.json || {};
      if (!passportPath || !idDocPath) {
        throw new Error("Upload succeeded but missing returned file paths.");
      }

      // 2) Submit application (DB insert)
      const appRes = await fetch("/api/affiliate/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.whatsapp, // map WhatsApp -> phone
          idDocType: form.idDocType,
          passportPath,
          idDocPath,
        }),
      });

      const appBody = await parseResponse(appRes);

      if (!appRes.ok) {
        if (appRes.status === 401) {
          window.location.href = "/affiliate/login";
          return;
        }
        throw new Error(extractErrorMessage(appBody, "Application submission failed"));
      }

      setMessage("Application submitted successfully! Please await admin approval.");
      router.push("/affiliate/pending");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none";

  const labelClass = "text-sm font-medium text-gray-700 mb-1";

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12"
      >
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-blue-600">Refer & Earn Commission</h2>

          <p className="text-gray-600 leading-relaxed">
            Join our affiliate program and earn up to <strong>5% commission</strong>{" "}
            when your referrals buy land from Doppel Homes.
          </p>

          <div className="rounded-xl border bg-white p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-1">Passport requirement</p>
            <p>
              Passport photo must be exactly <b>{REQUIRED_W}x{REQUIRED_H}px</b>.
            </p>
          </div>

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
          <p className="text-sm text-gray-600">
            New affiliate?{" "}
            <a href="/affiliate/signup" className="text-blue-600 underline">
              Create an account
            </a>{" "}
            • Already an affiliate?{" "}
            <a href="/affiliate/login" className="text-blue-600 underline">
              Login here
            </a>
          </p>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-700">{message}</p>}

          {/* FULL NAME & EMAIL (Email optional; backend uses session email) */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email Address (optional)</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="We use your logged-in email"
              />
            </div>
          </div>

          {/* WHATSAPP & GENDER */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className={`${inputClass} text-center focus:text-left`}
                placeholder="08012345678"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Gender (optional)</label>
              <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* LOCATION & NIN (Optional for now; not saved unless you add columns) */}
          <div>
            <label className={labelClass}>Location (optional)</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>NIN (optional)</label>
            <input type="text" name="nin" value={form.nin} onChange={handleChange} className={inputClass} />
          </div>

          {/* ID TYPE (Required by backend) */}
          <div>
            <label className={labelClass}>ID Type</label>
            <select
              name="idDocType"
              value={form.idDocType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="NIN Slip">NIN Slip</option>
              <option value="Driver's License">Driver&apos;s License</option>
              <option value="Voter's Card">Voter&apos;s Card</option>
              <option value="International Passport">International Passport</option>
            </select>
          </div>

          {/* FILE UPLOADS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Passport Photograph (JPG/PNG/WEBP)</label>
              <label className="flex items-center gap-3 cursor-pointer border border-dashed rounded-lg px-4 py-3 text-sm text-gray-600 hover:border-blue-500">
                <FiUpload />
                {form.passport ? `Selected: ${form.passport.name}` : "Upload Passport"}
                <input
                  type="file"
                  name="passport"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleChange}
                  hidden
                  required
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Must be {REQUIRED_W}x{REQUIRED_H}px.
              </p>
            </div>

            <div>
              <label className={labelClass}>ID Document (Image/PDF)</label>
              <label className="flex items-center gap-3 cursor-pointer border border-dashed rounded-lg px-4 py-3 text-sm text-gray-600 hover:border-blue-500">
                <FiUpload />
                {form.validId ? `Selected: ${form.validId.name}` : "Upload ID"}
                <input
                  type="file"
                  name="validId"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                  hidden
                  required
                />
              </label>
            </div>
          </div>

          {/* ADDRESS (optional) */}
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

          {/* STAFF REFERRAL (optional) */}
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

          {/* SUBMIT */}
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
      </motion.div>
    </section>
  );
}
