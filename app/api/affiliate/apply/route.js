import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { generateReferralCode } from "../../../lib/referralCode";

export async function POST(req) {
  try {
    const supabase = await createClient();

    // 1️⃣ Ensure user is logged in
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    // 2️⃣ Read request body
    const body = await req.json();
    const {
      fullName,
      phone,
      idDocType,
      passportPath,
      idDocPath,
    } = body;

    // 3️⃣ Validate required fields
    if (!fullName || !phone || !idDocType || !passportPath || !idDocPath) {
      return NextResponse.json(
        { error: "Missing required application fields." },
        { status: 400 }
      );
    }

    // 4️⃣ Check if affiliate already exists
    const { data: existingAffiliate } = await supabase
      .from("affiliates")
      .select("id, status")
      .eq("id", user.id)
      .maybeSingle();

    // 5️⃣ If exists → UPDATE instead of failing
    if (existingAffiliate) {
      const { error: updateErr } = await supabase
        .from("affiliates")
        .update({
          full_name: fullName,
          phone,
          id_doc_type: idDocType,
          passport_path: passportPath,
          id_doc_path: idDocPath,
          status:
            existingAffiliate.status === "approved"
              ? "approved"
              : "pending",
        })
        .eq("id", user.id);

      if (updateErr) {
        return NextResponse.json(
          { error: `Update failed: ${updateErr.message}` },
          { status: 400 }
        );
      }

      return NextResponse.json({ ok: true, updated: true });
    }

    // 6️⃣ New affiliate → create with referral code
    for (let i = 0; i < 5; i++) {
      const referralCode = generateReferralCode("DH", 8);

      const { error: insertErr } = await supabase
        .from("affiliates")
        .insert({
          id: user.id,
          full_name: fullName,
          email: user.email,
          phone,
          id_doc_type: idDocType,
          passport_path: passportPath,
          id_doc_path: idDocPath,
          referral_code: referralCode,
          status: "pending",
        });

      // Success
      if (!insertErr) {
        return NextResponse.json({ ok: true, created: true });
      }

      // Retry only if referral_code conflict
      const msg = (insertErr.message || "").toLowerCase();
      const isReferralConflict =
        msg.includes("referral_code") &&
        (msg.includes("duplicate") || msg.includes("unique"));

      if (!isReferralConflict) {
        return NextResponse.json(
          { error: `Insert failed: ${insertErr.message}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Could not generate unique referral code. Try again." },
      { status: 500 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
