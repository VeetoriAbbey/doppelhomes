"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ShieldCheck,
  MapPin,
  Users,
  Sparkles,
  CheckCircle2,
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-700 via-blue-800 to-white"></div>
          {/* Replace with your own image */}
          <Image
            src="/images/banner2.png"
            alt="About background"
            fill
            priority
            className="object-cover blur-sm scale-105"
          />
           <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              About Doppel Homes
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              We help people buy verified land with confidence — and build with
              clarity.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg"
            >
              Doppel Homes is a real estate advisory and verified land sales
              company focused on helping clients make safe, informed property
              decisions. We combine due diligence, documentation guidance, and
              transparent communication to reduce risk and protect your
              investment.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/properties/all"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:opacity-90"
              >
                Explore Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-black/40 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/35 backdrop-blur transition hover:bg-black/55"
              >
                Talk to Us
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: ShieldCheck, title: "Verified Listings", desc: "Due diligence first" },
                { icon: BadgeCheck, title: "Document Support", desc: "Guidance & clarity" },
                { icon: Users, title: "Client-First", desc: "Transparent process" },
                { icon: Building2, title: "Build Advisory", desc: "From land to home" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur"
                >
                  <item.icon className="h-5 w-5" />
                  <p className="mt-3 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-white/80">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-neutral-900">
              Who we are
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-neutral-700 leading-relaxed">
              Doppel Homes is built on a simple belief: real estate should be safe,
              understandable, and accessible. Many people lose money because they
              buy land without proper verification, unclear documentation, or
              honest guidance. We exist to change that experience.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-neutral-700 leading-relaxed">
              Our work focuses on verified land sales, land acquisition advisory,
              and end-to-end support that helps clients move from “interest” to
              “ownership” with confidence. Whether you’re buying for investment,
              a future home, or immediate development, we help you follow the
              right steps.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-2 h-5 w-5 text-blue-800" strokeWidth={2.2}>
              {[
                {
                  icon: MapPin,
                  title: "Local knowledge",
                  desc: "We understand locations, processes, and market realities.",
                },
                {
                  icon: ShieldCheck,
                  title: "Risk reduction",
                  desc: "Verification and guidance to help protect your money.",
                },
                {
                  icon: Users,
                  title: "Human support",
                  desc: "Clear communication and assistance at every stage.",
                },
                {
                  icon: Building2,
                  title: "Build-minded",
                  desc: "Advice on buying land that’s genuinely buildable.",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <f.icon className="h-5 w-5" />
                  <p className="mt-3 font-semibold text-neutral-900">{f.title}</p>
                  <p className="mt-1 text-sm text-neutral-700">{f.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-neutral-100 to-neutral-50"></div>
            <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
              {/* Replace with your own image */}
              <div className="relative h-[360px] w-full">
                <Image
                  src="/images/bg.jpg"
                  alt="Team or office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-neutral-900">What you can expect</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  {[
                    "Clear explanations of land titles and documentation",
                    "Guidance on verification steps and risk checks",
                    "Transparent pricing and process updates",
                    "Support from inquiry to closing and beyond",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Request a consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                  >
                    View our services
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-neutral-900">
              Mission, vision & values
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
              Our mission and values guide how we serve clients, verify opportunities,
              and build trust. We keep the process clear, practical, and professional.
            </motion.p>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <motion.div variants={fadeUp} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">Our Mission</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  To help clients acquire verified, buildable land through transparent
                  advisory, due diligence, and end-to-end support — reducing risk and
                  protecting investments.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">Our Vision</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                  To become a trusted standard for land verification and real estate
                  guidance — where every buyer can make confident decisions with clarity.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">Core Values</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {[
                    "Integrity & transparency",
                    "Client-first service",
                    "Due diligence & accountability",
                    "Professional excellence",
                    "Clear communication",
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CHAIRMAN SPEECH */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[28px] border border-blue-200 bg-white shadow-sm">
              {/* Replace with chairman image */}
              <div className="relative h-[580px] w-full">
                <Image
                  src="/images/chairman.jpeg"
                  alt="Chairman"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-neutral-900">Chairman</p>
                <p className="mt-1 text-sm text-neutral-600">Doppel Homes Leadership</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-neutral-900">
              Chairman’s speech
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-4 text-neutral-700 leading-relaxed">
              At Doppel Homes, we understand that buying land is a major decision.
              It should never feel confusing or risky. That’s why we built a process
              anchored on verification, clarity, and trust. Our goal is to help you
              secure land that is genuinely buildable and properly documented — so you
              can invest with peace of mind.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 text-neutral-700 leading-relaxed">
              We are committed to transparent guidance, honest communication, and
              professional support at every stage. Whether you’re purchasing for
              investment or preparing to build your home, we will help you follow the
              right steps and make informed choices.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 text-neutral-700 leading-relaxed">
              Thank you for trusting Doppel Homes. We look forward to helping you
              achieve secure ownership and long-term value.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Speak with our team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/properties/all"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Browse verified listings
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-semibold tracking-tight text-neutral-900">
              Our focus areas
            </motion.h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Verified Lands", value: "100%", icon: ShieldCheck },
                { label: "Client Support", value: "End-to-end", icon: Users },
                { label: "Documentation", value: "Guided", icon: BadgeCheck },
                { label: "Build Advisory", value: "Practical", icon: Building2 },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <s.icon className="h-5 w-5 text-blue-800" strokeWidth={2.2} />
                  <p className="mt-4 text-2xl font-semibold text-neutral-900">{s.value}</p>
                  <p className="mt-1 text-sm text-neutral-700">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-neutral-900">
            How we work
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
            We keep it simple and structured — from your first inquiry to final documentation.
          </motion.p>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "We understand your needs, budget, and preferred location.",
              },
              {
                step: "02",
                title: "Verification",
                desc: "We guide due diligence checks and documentation clarity.",
              },
              {
                step: "03",
                title: "Acquisition",
                desc: "We support negotiation, payment structure, and closing steps.",
              },
              {
                step: "04",
                title: "After-sales",
                desc: "We help with next steps: documentation, planning, and build direction.",
              },
            ].map((t, i) => (
              <motion.div
                key={t.step}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-neutral-500">{t.step}</p>
                <p className="mt-3 text-lg font-semibold text-neutral-900">{t.title}</p>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
              <p className="text-sm font-semibold text-neutral-900">Ready to buy verified land?</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                Let’s help you avoid mistakes and buy with confidence.
              </h3>
              <p className="mt-3 text-neutral-700 leading-relaxed">
                Speak with our team for consultation, verification guidance, and available options
                that match your goals.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Contact us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
