import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../app/lib/supabase/admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const full_name = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();

    if (!full_name || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email and message are required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([{ full_name, email, phone, subject, message }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
