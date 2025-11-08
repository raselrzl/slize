"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateOrderStatus } from "@/app/actions";

export default function OrderStatusClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "accepted" | "cancelled" | "completed">("pending");
  const [isPending, startTransition] = useTransition();

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, status);
        router.refresh();
        alert("Order status updated!");
      } catch (err) {
        console.error(err);
        alert("Failed to update order status.");
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Update Order Status</h1>
        <Button onClick={() => router.back()}>⬅ Back</Button>
      </div>

      <Card className="rounded-none w-full max-w-md">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="font-medium">Set Status:</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "pending" | "accepted" | "cancelled" | "completed"
                )
              }
              className="border rounded px-2 py-1"
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
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
