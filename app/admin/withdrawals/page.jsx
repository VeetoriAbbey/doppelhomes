"use client";

import { useEffect, useState } from "react";

export default function AdminWithdrawalsPage() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/withdrawals/list");
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "Failed");
    setRows(json.rows || []);
  };

  useEffect(() => { load(); }, []);

  const update = async (withdrawalId, status) => {
    setMsg("");
    const res = await fetch("/api/admin/withdrawals/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ withdrawalId, status }),
    });
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "Failed");
    load();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin: Withdrawals</h1>
      {msg && <p className="text-sm">{msg}</p>}

      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.id} className="border rounded p-3">
            <div className="font-semibold">
              ₦{(r.amount_kobo/100).toLocaleString()} — {r.status}
            </div>
            <div className="text-sm text-gray-600">
              {r.account_name} • {r.bank_name} • {r.account_number}
            </div>

            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 rounded bg-yellow-600 text-white" onClick={()=>update(r.id, "approved")}>Approve</button>
              <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={()=>update(r.id, "paid")}>Mark Paid</button>
              <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={()=>update(r.id, "rejected")}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
