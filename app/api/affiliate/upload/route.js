import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { supabaseAdmin } from "../../../lib/supabase/admin";

const PASSPORT_ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const ID_ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please login first." }, { status: 401 });
    }

    const formData = await req.formData();
    const passport = formData.get("passport");
    const idDoc = formData.get("idDoc");

    if (!passport || !idDoc) {
      return NextResponse.json({ error: "Passport and ID document are required" }, { status: 400 });
    }

    // ✅ Passport must be image only
    if (!PASSPORT_ALLOWED.includes(passport.type)) {
      return NextResponse.json(
        { error: "Passport must be JPG, PNG, or WEBP" },
        { status: 400 }
      );
    }

    // ✅ ID can be image OR PDF
    if (!ID_ALLOWED.includes(idDoc.type)) {
      return NextResponse.json(
        { error: "ID document must be JPG, PNG, WEBP or PDF" },
        { status: 400 }
      );
    }

    // Determine extensions
    const passportExt = passport.type.split("/")[1] || "jpg";
    const idExt = idDoc.type === "application/pdf" ? "pdf" : (idDoc.type.split("/")[1] || "jpg");

    // Store in separate folders
    const passportPath = `affiliates/${user.id}/passport-${Date.now()}.${passportExt}`;
    const idDocPath = `affiliates/${user.id}/id-${Date.now()}.${idExt}`;

    // Upload passport (set contentType)
    const { error: passErr } = await supabaseAdmin.storage
      .from("affiliate-passports")
      .upload(passportPath, passport, {
        upsert: true,
        contentType: passport.type,
      });

    if (passErr) return NextResponse.json({ error: passErr.message }, { status: 400 });

    // Upload ID (set contentType)
    const { error: idErr } = await supabaseAdmin.storage
      .from("affiliate-ids")
      .upload(idDocPath, idDoc, {
        upsert: true,
        contentType: idDoc.type,
      });

    if (idErr) return NextResponse.json({ error: idErr.message }, { status: 400 });

    return NextResponse.json({ passportPath, idDocPath });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 });
  }
}
