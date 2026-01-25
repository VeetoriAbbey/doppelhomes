import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(req) {
  const url = new URL(req.url);
  const origin = url.origin;

  const supabase = await createClient();

  // 1) Check session/user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return NextResponse.redirect(new URL("/affiliate/login", origin));
  }

  // 2) Check admin (use maybeSingle to avoid throw)
  const { data: adminRow, error: adminErr } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (adminErr) {
    // If table/permissions issue, fail gracefully
    return NextResponse.redirect(new URL("/affiliate/apply", origin));
  }

  if (adminRow) {
    // ✅ Choose ONE of these depending on your actual admin route:

    // If your admin area is /admin:
    // return NextResponse.redirect(new URL("/admin", origin));

    // If your admin area is /affiliate (as you had it):
    return NextResponse.redirect(new URL("/affiliate", origin));
  }

  // 3) Check affiliate status
  const { data: aff, error: affErr } = await supabase
    .from("affiliates")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  // If affiliates table has RLS issues, don't crash
  if (affErr) {
    return NextResponse.redirect(new URL("/affiliate/apply", origin));
  }

  if (!aff) return NextResponse.redirect(new URL("/affiliate/apply", origin));
  if (aff.status !== "approved")
    return NextResponse.redirect(new URL("/affiliate/pending", origin));

  return NextResponse.redirect(new URL("/affiliate/dashboard", origin));
}
