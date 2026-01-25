"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AffiliateSignupPage() {
  const router = useRouter();

  // ✅ Create client once
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      // We still return a client to avoid crashing render, but we’ll show an error on submit.
      return null;
    }

    return createBrowserClient(url, key);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const getOrigin = () => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  };

  const signUp = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!supabase) {
      setErr(
        "Supabase keys are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${getOrigin()}/auth/callback`,
        },
      });

      if (error) {
        setErr(error.message || "Signup failed");
        return;
      }

      // ✅ If email confirmation is ON, session is usually null
      const needsEmailConfirm = !data?.session;

      if (needsEmailConfirm) {
        setMsg("Account created! Please check your email to confirm your account.");
        // Don’t redirect yet — user isn’t logged in.
        return;
      }

      setMsg("Account created! Redirecting...");
      router.push("/affiliate/apply");
    } catch (e2) {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    setErr("");
    setMsg("");

    if (!supabase) {
      setErr(
        "Supabase keys are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${getOrigin()}/auth/callback`,
        },
      });

      if (error) setErr(error.message || "Google signup failed");
      // If successful, Supabase will redirect automatically.
    } catch (e) {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={signUp}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-sm space-y-4 border border-gray-100"
      >
        <h1 className="text-xl font-bold text-center text-blue-700">
          Create Affiliate Account
        </h1>

        {err && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded-xl">
            {err}
          </p>
        )}

        {msg && (
          <p className="text-sm text-green-800 bg-green-50 border border-green-100 p-3 rounded-xl">
            {msg}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-200"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-200"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Min 6 characters"
            autoComplete="new-password"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="text-center text-sm text-gray-500">OR</div>

        <button
          type="button"
          onClick={signUpWithGoogle}
          disabled={loading}
          className="w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/affiliate/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
