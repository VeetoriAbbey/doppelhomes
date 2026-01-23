"use client";

import { useState } from "react";

export default function ReferralCard({ referralCode }) {
  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}/?ref=${referralCode}`;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="font-semibold text-gray-800 mb-2">
        Your Referral Link
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          readOnly
          value={referralLink}
          className="flex-1 border rounded-lg px-4 py-3 text-sm"
        />
        <button
          onClick={copyLink}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Share this link to earn commission on every successful purchase.
      </p>
    </div>
  );
}
