import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default async function AdminAffiliatePage() {
  const supabase = await createClient();

  // 1️⃣ Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/affiliate/login");
  }

  // 2️⃣ Check admin role
  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!adminRow) {
    redirect("/"); // or /affiliate/dashboard
  }

  // 3️⃣ Fetch affiliates
  const { data: affiliates, error } = await supabase
    .from("affiliate")
    .select("id, full_name, email, phone, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 py-22">
        <p className="text-red-600">Failed to load affiliates</p>
      </div>
    );
  }

  return (
    <div className="p-6 py-22 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Admin — Affiliates</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {(affiliates || []).map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-3 font-medium">{a.full_name}</td>
                <td className="px-4 py-3">{a.email}</td>
                <td className="px-4 py-3">{a.phone || "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`/admin/affiliate/${a.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}

            {affiliates?.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No affiliates yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
