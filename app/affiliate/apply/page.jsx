"use client";

import { useState } from "react";

const REQUIRED_W = 600;
const REQUIRED_H = 600;

async function checkImageDimensions(file) {
  if (!file.type.startsWith("image/")) return { ok: false, error: "Not an image" };

  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = url;
    });

    if (img.width !== REQUIRED_W || img.height !== REQUIRED_H) {
      return { ok: false, error: `Passport must be ${REQUIRED_W}x${REQUIRED_H}px (current: ${img.width}x${img.height})` };
    }

    return { ok: true };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [idDocType, setIdDocType] = useState("NIN Slip");
  const [passport, setPassport] = useState(null);
  const [idDoc, setIdDoc] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      if (!passport || !idDoc) throw new Error("Passport and ID are required");

      // Passport dimension check (client-side)
      const dim = await checkImageDimensions(passport);
      if (!dim.ok) throw new Error(dim.error);

      // 1) Upload files
      const fd = new FormData();
      fd.append("passport", passport);
      fd.append("idDoc", idDoc);

      const upRes = await fetch("/api/affiliate/upload", { method: "POST", body: fd });
      const upJson = await upRes.json();
      if (!upRes.ok) throw new Error(upJson.error || "Upload failed");

      // 2) Save application
      const appRes = await fetch("/api/affiliate/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          idDocType,
          passportPath: upJson.passportPath,
          idDocPath: upJson.idDocPath,
        }),
      });

      const appJson = await appRes.json();
      if (!appRes.ok) throw new Error(appJson.error || "Application failed");

      setMsg("Application submitted! Await admin approval.");
    } catch (err) {
      setMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-30 p-6">
      <h1 className="text-2xl font-bold">Affiliate Application</h1>
      <p className="text-sm text-gray-600 mt-1">
        Passport must be {REQUIRED_W}x{REQUIRED_H}px, and files must meet size limits.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input className="w-full border rounded p-2" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input className="w-full border rounded p-2" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">ID type</label>
          <select className="w-full border rounded p-2" value={idDocType} onChange={(e)=>setIdDocType(e.target.value)}>
            <option>NIN Slip</option>
            <option>Driver's License</option>
            <option>Voter's Card</option>
            <option>International Passport</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Passport (JPG/PNG/WEBP)</label>
          <input type="file" accept="image/*" onChange={(e)=>setPassport(e.target.files?.[0] || null)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">ID Document (Image/PDF)</label>
          <input type="file" accept="image/*,application/pdf" onChange={(e)=>setIdDoc(e.target.files?.[0] || null)} required />
        </div>

        <button disabled={loading} className="bg-blue-800 text-white rounded px-4 py-2">
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
}
