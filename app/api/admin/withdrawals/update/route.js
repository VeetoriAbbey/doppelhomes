import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { supabaseAdmin } from "../../../../lib/supabase/admin";

export async function POST(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).single();
  if (!adminRow) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { withdrawalId, status, note } = await req.json();
  if (!withdrawalId || !["approved", "paid", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("affiliate_withdrawals")
    .update({ status, note: note || null })
    .eq("id", withdrawalId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
