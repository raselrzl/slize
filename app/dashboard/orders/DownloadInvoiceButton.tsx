"use client";

import { Download, PenBoxIcon } from "lucide-react";

interface Props {
  orderId: string;
}

export function DownloadInvoiceButton({ orderId }: Props) {
  const handleDownloadInvoice = async () => {
    try {
      const res = await fetch(`/api/invoice/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch invoice");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${orderId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download invoice.");
    }
  };

  return (
    <button
      onClick={handleDownloadInvoice}
      className="flex items-center gap-2 w-full text-left text-sm pl-2 pt-1"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Invoice
    </button>
  );
}
