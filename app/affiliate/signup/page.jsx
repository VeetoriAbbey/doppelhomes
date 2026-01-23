"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Affiliate Signup Page (Supabase Auth)
 * - Creates user via email/password
 * - Optional: you can also offer Google signup (OAuth)
 *
 * Route: app/affiliate/signup/page.js
 */

export default function AffiliateSignupPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // If email confirmations are enabled, user may need to verify email first
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setErr(error.message || "Signup failed");
      return;
    }

    setMsg("Account created!");
    // If your project has email confirmation disabled, you can redirect immediately:
    router.push("/affiliate/apply");
  };

  const signUpWithGoogle = async () => {
    setErr("");
    setMsg("");

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={signUp} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center text-blue-700">Create Affiliate Account</h1>

        {err && <p className="text-sm text-red-600">{err}</p>}
        {msg && <p className="text-sm text-green-700">{msg}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full border rounded p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            className="w-full border rounded p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Min 6 characters"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="text-center text-sm text-gray-500">OR</div>

        <button
          type="button"
          onClick={signUpWithGoogle}
          className="w-full border py-2 rounded"
        >
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/affiliate/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
