"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateInvoiceStatus } from "@/app/actions";

export default function InvoiceStatusClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"sent" | "remindered" | "pending" | "cancelled" | "paid">("pending");
  const [isPending, startTransition] = useTransition();

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await updateInvoiceStatus(orderId, status);
        router.refresh();
        alert("Invoice status updated!");
      } catch (err) {
        console.error(err);
        alert("Failed to update invoice status.");
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Update Invoice Status</h1>
        <Button onClick={() => router.back()}>⬅ Return to Order Page</Button>
      </div>

      <Card className="rounded-none w-full max-w-md">
        <CardHeader>
          <CardTitle>Invoice Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="font-medium">Set Status:</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "sent" | "remindered" | "pending" | "cancelled" | "paid"
                )
              }
              className="border rounded px-2 py-1"
            >
              <option value="sent">Sent</option>
              <option value="remindered">Remindered</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <Button onClick={handleUpdate} disabled={isPending}>
            {isPending ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
