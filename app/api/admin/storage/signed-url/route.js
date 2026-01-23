import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { supabaseAdmin } from "../../../../lib/supabase/admin";

export async function POST(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // verify admin via RLS-enabled table
  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).single();
  if (!adminRow) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { bucket, path } = await req.json();
  if (!bucket || !path) return NextResponse.json({ error: "Missing bucket/path" }, { status: 400 });

  const expiresIn = Number(process.env.SIGNED_URL_EXPIRES_SECONDS || 600);

  const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ signedUrl: data.signedUrl });
}
