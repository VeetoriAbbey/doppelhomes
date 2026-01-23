import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const { affiliateId, approve } = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ensure admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabase
    .from("affiliates")
    .update({
      status: approve ? "approved" : "rejected",
      approved_at: approve ? new Date() : null,
    })
    .eq("id", affiliateId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
