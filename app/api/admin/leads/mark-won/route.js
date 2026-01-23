import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { supabaseAdmin } from "../../../../lib/supabase/admin";

export async function POST(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).single();
  if (!adminRow) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { leadId, saleAmountKobo } = await req.json();
  if (!leadId || !saleAmountKobo || saleAmountKobo <= 0) {
    return NextResponse.json({ error: "leadId and saleAmountKobo required" }, { status: 400 });
  }

  // Get lead to find affiliate_id
  const { data: lead, error: leadErr } = await supabaseAdmin
    .from("referral_leads")
    .select("id, affiliate_id, status")
    .eq("id", leadId)
    .single();

  if (leadErr) return NextResponse.json({ error: leadErr.message }, { status: 400 });
  if (lead.status === "won") return NextResponse.json({ error: "Lead already won" }, { status: 400 });

  const pct = Number(process.env.COMMISSION_PERCENT || 5);
  const commissionKobo = Math.floor((saleAmountKobo * pct) / 100);

  // 1) update lead status
  const up = await supabaseAdmin
    .from("referral_leads")
    .update({ status: "won", sale_amount_kobo: saleAmountKobo, won_at: new Date().toISOString() })
    .eq("id", leadId);

  if (up.error) return NextResponse.json({ error: up.error.message }, { status: 400 });

  // 2) create commission ledger row
  const ins = await supabaseAdmin.from("affiliate_commissions").insert({
    affiliate_id: lead.affiliate_id,
    lead_id: leadId,
    amount_kobo: commissionKobo,
    note: `Auto commission (${pct}%) on won lead`,
  });

  if (ins.error) return NextResponse.json({ error: ins.error.message }, { status: 400 });

  return NextResponse.json({ success: true, commissionKobo });
}
