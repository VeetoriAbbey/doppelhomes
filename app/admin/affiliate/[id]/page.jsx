"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminAffiliateDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [affiliate, setAffiliate] = useState(null);
  const [passportUrl, setPassportUrl] = useState("");
  const [idUrl, setIdUrl] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      setMsg("");
      const res = await fetch(`/api/admin/affiliates/get?affiliateId=${id}`);
      const json = await res.json();
      if (!res.ok) return setMsg(json.error || "Failed to load");

      setAffiliate(json.affiliate);

      // signed urls
      if (json.affiliate?.passport_path) {
        const p = await fetch("/api/admin/storage/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bucket: "affiliate-passports", path: json.affiliate.passport_path }),
        }).then(r => r.json());
        setPassportUrl(p.signedUrl || "");
      }

      if (json.affiliate?.id_doc_path) {
        const d = await fetch("/api/admin/storage/signed-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bucket: "affiliate-ids", path: json.affiliate.id_doc_path }),
        }).then(r => r.json());
        setIdUrl(d.signedUrl || "");
      }
    })();
  }, [id]);

  const act = async (action) => {
    setMsg("");
    const res = await fetch("/api/admin/affiliates/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliateId: id, action }),
    });
    const json = await res.json();
    if (!res.ok) return setMsg(json.error || "Action failed");
    setMsg("Updated!");
    router.refresh();
  };

  if (!affiliate) return <div className="p-6">Loading… {msg}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Affiliate Detail</h1>

      <div className="border rounded p-4">
        <div><b>Name:</b> {affiliate.full_name}</div>
        <div><b>Email:</b> {affiliate.email}</div>
        <div><b>Phone:</b> {affiliate.phone || "-"}</div>
        <div><b>ID Type:</b> {affiliate.id_doc_type || "-"}</div>
        <div><b>Status:</b> {affiliate.status}</div>
        <div><b>Referral Code:</b> {affiliate.referral_code}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <div className="font-semibold mb-2">Passport</div>
          {passportUrl ? <img src={passportUrl} alt="passport" className="w-full rounded" /> : <p>No passport</p>}
        </div>

        <div className="border rounded p-4">
          <div className="font-semibold mb-2">ID Document</div>
          {idUrl ? (
            affiliate.id_doc_path?.endsWith(".pdf")
              ? <a className="underline" href={idUrl} target="_blank">Open PDF</a>
              : <img src={idUrl} alt="id" className="w-full rounded" />
          ) : <p>No ID</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={()=>act("approve")} className="bg-green-600 text-white rounded px-4 py-2">Approve</button>
        <button onClick={()=>act("reject")} className="bg-red-600 text-white rounded px-4 py-2">Reject</button>
      </div>

      <button
  onClick={async () => {
    await fetch("/api/admin/affiliates/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliateId: id, approve: true }),
    });
    router.refresh();
  }}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Approve
</button>


      {msg && <p className="text-sm">{msg}</p>}
    </div>
    
  );
}
