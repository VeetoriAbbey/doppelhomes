import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${url.origin}/affiliate/login?error=oauth_failed`);
    }
  }

  // ✅ Send to your redirect decider
  return NextResponse.redirect(`${url.origin}/api/auth/redirect`);
}
