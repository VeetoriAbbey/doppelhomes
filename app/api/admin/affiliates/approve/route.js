import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { supabaseAdmin } from "../../../../lib/supabase/admin";

export async function POST(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).single();
  if (!adminRow) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { affiliateId, action } = await req.json();
  if (!affiliateId || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const update = action === "approve"
    ? { status: "approved", approved_at: new Date().toISOString() }
    : { status: "rejected" };

  const { error } = await supabaseAdmin.from("affiliates").update(update).eq("id", affiliateId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
