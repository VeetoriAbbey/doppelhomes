import { createClient } from "../../lib/supabase/server";

export default async function AffiliateDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/affiliate/login");

  const { data: affiliate } = await supabase
    .from("affiliates")
    .select("status, total_commission, referral_code")
    .eq("id", user.id)
    .single();

  const { data: referrals } = await supabase
    .from("referrals")
    .select("id")
    .eq("affiliate_id", user.id);

  return (
    <div className="p-6 py-22">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Affiliate Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Referrals" value={referrals?.length || 0} />
        <Stat label="Commission (₦)" value={affiliate.total_commission} />
        <Stat label="Status" value={affiliate.status} />
      </div>

      <p className="mt-6">
        Referral Link: <b>{`https://doppelhomes.com/?ref=${affiliate.referral_code}`}</b>
      </p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
