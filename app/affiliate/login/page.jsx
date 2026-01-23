"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { createBrowserClient } from "@supabase/ssr";

export default function AffiliateLoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErr(error.message || "Login failed");
      return;
    }

    // Go to server redirect route (admin vs affiliate vs pending)
    window.location.href = "/api/auth/redirect";
  }

  async function handleGoogleLogin() {
    setErr("");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900">Affiliate Login</h1>
            <p className="text-sm text-slate-600 mt-1">
              Sign in to access your dashboard (after approval).
            </p>

            {err && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {err}
              </div>
            )}

            {/* IMPORTANT: no giant spacing; keep it compact so button never hides */}
            <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm pl-9 px-[-10] outline-none focus:border-slate-400"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-justify outline-none focus:border-slate-400"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* ✅ Sign in button (visible) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px bg-blue-800 flex-1" />
                <span className="text-xs text-white-500">OR</span>
                <div className="h-px bg-blue-800 flex-1" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full rounded-xl border border-blue-200 bg-white py-3 text-sm font-semibold hover:bg-slate-50 transition"
              >
                Continue with Google
              </button>

              <p className="text-xs text-blue-600 text-center pt-1">
                New here?{" "}
                <a className="underline text-slate-800" href="/affiliate/signup">
                  Create an account
                </a>
              </p>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-white/70 mt-6">
          © {new Date().getFullYear()} Doppel Homes
        </p>
      </motion.div>
    </div>
  );
}
