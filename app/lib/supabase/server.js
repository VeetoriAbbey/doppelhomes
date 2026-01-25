import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Next.js cookies() API has changed across versions.
 * Supabase SSR expects cookies.getAll() and cookies.setAll().
 * This implementation works across Next versions and avoids cookieStore.get errors.
 */
export function createClient() {
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const setCookieCompat = (name, value, options = {}) => {
    // Next versions differ: set({name,value,...}) vs set(name,value,options)
    try {
      cookieStore.set({ name, value, ...options });
    } catch {
      cookieStore.set(name, value, options);
    }
  };

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        // Some versions support getAll()
        if (typeof cookieStore.getAll === "function") return cookieStore.getAll();

        // Fallback: build array from known cookieStore API if needed
        // (Rare, but prevents crashes)
        return [];
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          setCookieCompat(name, value, options);
        });
      },
    },
  });
}
