import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function isAdminRequest(req) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const headerEmail = req.headers.get("x-admin-email");
  return adminEmail && headerEmail && headerEmail === adminEmail;
}

export async function PATCH(req, { params }) {
  try {
    if (!isAdminRequest(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const status = body?.status; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ application: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
