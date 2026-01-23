import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const { customerName, customerPhone, amount } = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const commission = amount * 0.05;

  const { error } = await supabase.from("referrals").insert({
    affiliate_id: user.id,
    customer_name: customerName,
    customer_phone: customerPhone,
    amount,
    commission,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // update affiliate total
  await supabase.rpc("increment_commission", {
    aff_id: user.id,
    amt: commission,
  });

  return NextResponse.json({ ok: true });
}
