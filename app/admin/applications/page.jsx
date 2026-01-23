"use client";

import { useEffect, useState } from "react";

export default function AdminApplicationsPage() {
  const [status, setStatus] = useState("pending");
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // For quick testing only:
  // Replace with real admin auth later.
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/admin/applications?status=${status}`, {
      headers: {
        "x-admin-email": ADMIN_EMAIL,
      },
    });

    const json = await res.json();
    setApps(json.applications || []);
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-email": ADMIN_EMAIL,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const json = await res.json();
    if (json.error) {
      alert(json.error);
      return;
    }
    // reload list
    load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="p-6 max-w-6xl mx-auto py-22">
      <h1 className="text-2xl font-semibold mb-4">Applications</h1>

      <div className="flex gap-3 items-center mb-5">
        <label className="text-sm">Filter:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={load}
          className="border rounded px-3 py-2"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : apps.length === 0 ? (
        <p>No {status} applications.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Applied</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.full_name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.phone || "-"}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 flex gap-2">
                    {a.status === "pending" && (
                      <>
                        <button
                          className="px-3 py-2 rounded border"
                          onClick={() => updateStatus(a.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-2 rounded border"
                          onClick={() => updateStatus(a.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(a.passport_url || a.valid_id_url) && (
                      <button
                        className="px-3 py-2 rounded border"
                        onClick={() => {
                          alert(
                            `Passport: ${a.passport_url || "none"}\nValid ID: ${
                              a.valid_id_url || "none"
                            }`
                          );
                        }}
                      >
                        View Docs
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
