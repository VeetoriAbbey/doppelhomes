import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function isAdminRequest(req) {
  // Minimal protection example:
  // You can replace this with NextAuth session checks later.
  const adminEmail = process.env.ADMIN_EMAIL;
  const headerEmail = req.headers.get("x-admin-email");
  return adminEmail && headerEmail && headerEmail === adminEmail;
}

export async function GET(req) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";

    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ applications: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
