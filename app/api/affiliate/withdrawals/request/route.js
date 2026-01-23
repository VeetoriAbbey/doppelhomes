import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amountKobo, bankName, accountName, accountNumber } = await req.json();
  if (!amountKobo || amountKobo <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

  const { error } = await supabase.from("affiliate_withdrawals").insert({
    affiliate_id: user.id,
    amount_kobo: amountKobo,
    bank_name: bankName,
    account_name: accountName,
    account_number: accountNumber,
    status: "pending",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
