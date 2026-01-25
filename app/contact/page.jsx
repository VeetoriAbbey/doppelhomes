"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ContactPage() {
  // ✅ EDIT THESE
  const COMPANY = useMemo(
    () => ({
      name: "Doppel Homes",
      email: "info@doppelhomes.com", // change
      phone: "+234 906 169 9005", // change
      whatsapp: "+2349061699005", // no plus sign spaces in URL later (we sanitize anyway)
      address: "17 Oladipo Diya Way, AGL Motors, Gudu, Abuja, Nigeria", // change
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4923.9871866985395!2d7.48387759245153!3d8.995553866515392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0d00261c8d91%3A0xca5eceb913591f3a!2sAGL%20MOTORS%20LTD!5e0!3m2!1sen!2sng!4v1768987594890!5m2!1sen!2sng", 
      businessHours: [
        { day: "Mon - Fri", time: "8:00am - 5:00pm" },
        { day: "Saturday", time: "10:00am - 4:00pm" },
        { day: "Sunday", time: "Closed" },
      ],
    }),
    []
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" }); // idle | loading | success | error

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  // Simple client-side validation
  function validate() {
    if (!form.fullName.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!form.message.trim()) return "Please enter a message.";
    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return "Please enter a valid email address.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }

    setStatus({ type: "loading", message: "Sending..." });

      try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Message sent! We’ll get back to you shortly.",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  const waNumber = (COMPANY.whatsapp || "").replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi ${COMPANY.name}, I’m interested in your services.`
  )}`;

  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    "Inquiry - " + COMPANY.name
  )}`;

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Optional blurred background */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/65 to-white" />
          <div className="absolute inset-0 backdrop-blur-sm" />
         <Image
                    src="/images/contact-bg.jpg"
                    alt="Contact background"
                    fill
                    priority
                    className="object-cover blur-sm scale-105"
                  />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-14 sm:pt-28 sm:pb-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15 backdrop-blur"
            >
              <MessageCircle className="h-4 w-4" />
              Contact {COMPANY.name}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Let’s talk about verified land, documentation, and your next move.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Reach out for consultation, land verification guidance, and available
              listings. We respond as quickly as possible during business hours.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:opacity-90"
              >
                WhatsApp us <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={mailto}
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15"
              >
                Send an email
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="mx-auto max-w-6xl px-4 -mt-8 pb-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-4 py-9 lg:grid-cols-3"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <Phone className="h-5 w-5" />
            <p className="mt-3 font-semibold text-neutral-900">Phone</p>
            <p className="mt-1 text-sm text-neutral-700">{COMPANY.phone}</p>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
            >
              Call now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <Mail className="h-5 w-5" />
            <p className="mt-3 font-semibold text-neutral-900">Email</p>
            <p className="mt-1 text-sm text-neutral-700">{COMPANY.email}</p>
            <a
              href={mailto}
              className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
            >
              Email us <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <MapPin className="h-5 w-5" />
            <p className="mt-3 font-semibold text-neutral-900">Office</p>
            <p className="mt-1 text-sm text-neutral-700">{COMPANY.address}</p>
            <Link
              href="#map"
              className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
            >
              View map <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FORM + HOURS */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Fill the form and we’ll respond as soon as possible.
            </p>

            {/* STATUS */}
            {status.type !== "idle" && (
              <div
                className={[
                  "mt-5 rounded-2xl border p-4 text-sm",
                  status.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : status.type === "error"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-neutral-200 bg-neutral-50 text-neutral-800",
                ].join(" ")}
              >
                <div className="flex items-start gap-2">
                  {status.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                  ) : status.type === "error" ? (
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                  ) : (
                    <span className="mt-0.5 h-5 w-5 rounded-full border border-neutral-300" />
                  )}
                  <p>{status.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="e.g. Florence Ajoke"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="e.g. you@email.com"
                  type="email"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Phone (optional)"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="e.g. +234..."
                />
                <Field
                  label="Subject (optional)"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="e.g. Land verification"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-neutral-900">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={6}
                  placeholder="Tell us what you need..."
                  className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:ring-2 focus:ring-neutral-900/20"
                />
              </div>

              <button
                disabled={status.type === "loading"}
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.type === "loading" ? "Sending..." : "Send message"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <p className="text-xs text-neutral-500">
                By submitting, you agree to be contacted by {COMPANY.name}.
              </p>
            </form>
          </motion.div>

          {/* HOURS + QUICK LINKS */}
          <motion.aside
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              Business hours
            </h3>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              {COMPANY.businessHours.map((h) => (
                <div key={h.day} className="flex items-center justify-between">
                  <span className="font-semibold">{h.day}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-900">
                Prefer WhatsApp?
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Message us directly and we’ll respond as quickly as possible.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 ring-1 ring-neutral-200 transition hover:bg-neutral-50"
              >
                Open WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-neutral-900">
                Quick links
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link
                  href="/properties/all"
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  View listings
                </Link>
                <Link
                  href="/services"
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  Our services
                </Link>
                <Link
                  href="/about"
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  About us
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-[28px] overflow-hidden border border-neutral-200 bg-white shadow-sm"
          >
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Visit our office
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Address: <span className="font-semibold">{COMPANY.address}</span>
              </p>
            </div>

            <div className="relative h-[380px] w-full">
              <iframe
                title="Google Map"
                src={COMPANY.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* FAQ */}
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              {
                q: "Do you help with verification?",
                a: "Yes. We guide verification steps and documentation clarity so you can avoid common land-buying risks.",
              },
              {
                q: "Do you offer installment payment plans?",
                a: "Depending on the listing, installment options may be available. Contact us with your preferred location and budget.",
              },
              {
                q: "Can you help me find land in Abuja?",
                a: "Yes. Share your preferred areas, budget, and timeline, and we’ll recommend suitable verified options.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="font-semibold text-neutral-900">{item.q}</p>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-[28px] border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 shadow-sm sm:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-neutral-900">
                Need help deciding?
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                Get a quick consultation today.
              </h3>
              <p className="mt-3 text-neutral-700 leading-relaxed">
                We’ll help you understand the process, documentation, and next
                steps for safe land acquisition.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                WhatsApp now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/properties/all"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                View listings
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-neutral-900">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:ring-2 focus:ring-neutral-900/20"
      />
    </div>
  );
}
