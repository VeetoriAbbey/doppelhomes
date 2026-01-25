import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  const setCookieCompat = (name, value, options = {}) => {
    try {
      // Next newer signature
      cookieStore.set({ name, value, ...options });
    } catch {
      // Next older signature
      cookieStore.set(name, value, options);
    }
  };

  const getCookieCompat = (name) => {
    try {
      // cookieStore.get(name) -> { name, value, ... } | undefined
      return cookieStore.get(name)?.value;
    } catch {
      return undefined;
    }
  };

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        // ✅ Preferred in modern Next
        if (typeof cookieStore.getAll === "function") return cookieStore.getAll();

        // ✅ Fallback: read Supabase cookies by name
        // Supabase uses these cookie names depending on config/version
        const possibleNames = [
          "sb-access-token",
          "sb-refresh-token",
          "supabase-auth-token",
        ];

        // Also handle project-scoped cookie names like: sb-<ref>-auth-token
        // We can scan common patterns by checking known names first, then trying the scoped one if present.
        // Since we can't list cookies without getAll(), we return what we can.
        const results = [];

        for (const name of possibleNames) {
          const value = getCookieCompat(name);
          if (value) results.push({ name, value });
        }

        // If you configured Supabase to use a single auth cookie name like:
        // sb-<project-ref>-auth-token
        // add it here if you know it. (Optional)
        // const scoped = getCookieCompat("sb-xxxxxxxx-auth-token");
        // if (scoped) results.push({ name: "sb-xxxxxxxx-auth-token", value: scoped });

        return results;
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookieCompat(name, value, options);
        });
      },
    },
  });
}
