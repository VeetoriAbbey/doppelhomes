import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminAffiliatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).single();
  if (!adminRow) redirect("/");

  const { data: affiliates } = await supabase
    .from("affiliates")
    .select("id, full_name, email, phone, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin: Affiliates</h1>

      <div className="mt-4 space-y-2">
        {(affiliates || []).map((a) => (
          <Link key={a.id} href={`/admin/affiliates/${a.id}`} className="block border rounded p-3 hover:bg-gray-50">
            <div className="font-semibold">{a.full_name}</div>
            <div className="text-sm text-gray-600">{a.email} • {a.phone || "-"}</div>
            <div className="text-sm">Status: <b>{a.status}</b></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
