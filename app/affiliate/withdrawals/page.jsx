"use client";

import { useEffect, useState } from "react";

export default function WithdrawalsPage() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");

  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const load = async () => {
    setMsg("");
    const res = await fetch("/api/affiliate/withdrawals/list");
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "Failed");
    setRows(json.rows || []);
  };

  useEffect(() => { load(); }, []);

  const request = async (e) => {
    e.preventDefault();
    setMsg("");

    const amountKobo = Math.floor(Number(amount) * 100);
    const res = await fetch("/api/affiliate/withdrawals/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountKobo, bankName, accountName, accountNumber }),
    });
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "Failed");

    setMsg("Withdrawal requested!");
    setAmount(""); setBankName(""); setAccountName(""); setAccountNumber("");
    load();
  };

  return (
    <div className="p-6 py-22 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Withdrawals</h1>

      <form onSubmit={request} className="border rounded p-4 space-y-3">
        <div>
          <label className="block text-sm font-medium">Amount (₦)</label>
          <input className="w-full border rounded p-2" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Bank name</label>
          <input className="w-full border rounded p-2" value={bankName} onChange={(e)=>setBankName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Account name</label>
          <input className="w-full border rounded p-2" value={accountName} onChange={(e)=>setAccountName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Account number</label>
          <input className="w-full border rounded p-2" value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} required />
        </div>

        <button className="bg-black text-white rounded px-4 py-2">Request Withdrawal</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>

      <div className="border rounded">
        <div className="p-3 font-semibold border-b">History</div>
        <div className="p-3 space-y-2">
          {rows.map(r => (
            <div key={r.id} className="border rounded p-3">
              <div><b>₦{(r.amount_kobo/100).toLocaleString()}</b> — {r.status}</div>
              <div className="text-sm text-gray-600">{new Date(r.created_at).toLocaleString()}</div>
              {r.note && <div className="text-sm">Note: {r.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
