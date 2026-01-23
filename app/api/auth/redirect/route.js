import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;

  if (!user) return NextResponse.redirect(`${origin}/affiliate/login`);

  // Is admin?
  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (adminRow) {
    // send admin to admin area
    return NextResponse.redirect(`${origin}/affiliate`);
  }

  // Is affiliate + approved?
  const { data: aff } = await supabase
    .from("affiliates")
    .select("status")
    .eq("id", user.id)
    .single();

  if (!aff) return NextResponse.redirect(`${origin}/affiliate/apply`);
  if (aff.status !== "approved") return NextResponse.redirect(`${origin}/affiliate/pending`);

  return NextResponse.redirect(`${origin}/affiliate/dashboard`);
}
