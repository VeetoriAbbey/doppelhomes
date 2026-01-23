"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPinned,
  FileCheck,
  Building2,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ---------- ANIMATIONS ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-blue-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-white"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
            >
              What We Do
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Reliable real estate services built on trust & verification
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-white/90 leading-relaxed"
            >
              At Doppel Homes, we provide structured real estate services focused on
              verified land sales, professional guidance, and long-term value.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:opacity-90"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Our core services
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-3xl text-gray-600"
          >
            We guide clients through every stage of land acquisition — from
            verification to ownership — ensuring clarity and peace of mind.
          </motion.p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-gray-600">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              How we work
            </motion.h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm"
                >
                  <p className="text-sm font-bold text-blue-700">
                    {step.step}
                  </p>
                  <h4 className="mt-3 font-semibold text-gray-900">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-blue-700 p-10 text-white flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold">
              Ready to acquire verified land with confidence?
            </h3>
            <p className="mt-3 text-white/90">
              Speak with our team today and let’s guide you through a safe and
              transparent real estate process.
            </p>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View listings
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ---------- DATA ---------- */

const services = [
  {
    title: "Verified Land Sales",
    icon: ShieldCheck,
    description:
      "We offer land options that go through structured checks to reduce risk and uncertainty.",
    points: [
      "Verified ownership & documentation",
      "Clear property information",
      "Safe transaction guidance",
    ],
  },
  {
    title: "Land Acquisition Advisory",
    icon: MapPinned,
    description:
      "Not sure where or how to buy? We guide you based on your budget and purpose.",
    points: [
      "Location suitability advice",
      "Investment-focused recommendations",
      "Risk assessment support",
    ],
  },
  {
    title: "Documentation Support",
    icon: FileCheck,
    description:
      "We help clients understand and navigate land documents and processes.",
    points: [
      "Title & document explanation",
      "Next-step guidance",
      "Compliance awareness",
    ],
  },
  {
    title: "Build Advisory",
    icon: Building2,
    description:
      "We advise on land suitability and planning before construction begins.",
    points: [
      "Build-ready land guidance",
      "Planning considerations",
      "Long-term usability",
    ],
  },
  {
    title: "Client Consultation",
    icon: Users,
    description:
      "We provide one-on-one consultation to answer questions and clarify options.",
    points: [
      "Personalized support",
      "Transparent communication",
      "Professional assistance",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "We understand your needs, budget, and preferred location.",
  },
  {
    step: "02",
    title: "Verification",
    description: "We guide checks on land status and documentation.",
  },
  {
    step: "03",
    title: "Acquisition",
    description: "We support payment structure and acquisition steps.",
  },
  {
    step: "04",
    title: "After-Sales",
    description: "We assist with next steps and ownership clarity.",
  },
];
