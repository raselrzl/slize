"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateDeliveryStatus } from "@/app/actions"; // <-- create this server action

export default function UpdateDeliveryStatusClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<
    | "pending"
    | "processing"
    | "ready_to_ship"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "failed_delivery"
    | "returned"
    | "cancelled"
  >("pending");
  const [isPending, startTransition] = useTransition();

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await updateDeliveryStatus(orderId, status);
        router.refresh();
        alert("✅ Delivery status updated!");
         router.push("/dashboard/orders");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to update delivery status.");
      }
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Update Delivery Status</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Order ID:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {orderId}
          </span>
        </p>

        <Card className="rounded-none border border-gray-300 dark:border-gray-600">
          <CardHeader>
            <CardTitle>Delivery Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 items-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <label className="font-medium w-32 text-left">Set Status:</label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "pending"
                      | "processing"
                      | "ready_to_ship"
                      | "shipped"
                      | "out_for_delivery"
                      | "delivered"
                      | "failed_delivery"
                      | "returned"
                      | "cancelled"
                  )
                }
                className="border rounded-none px-3 py-2 w-full sm:w-auto"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="ready_to_ship">Ready to Ship</option>
                <option value="shipped">Shipped</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="failed_delivery">Failed Delivery</option>
                <option value="returned">Returned</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <Button
              onClick={handleUpdate}
              disabled={isPending}
              className="flex items-center gap-2 border h-8 w-full sm:w-auto rounded-none"
            >
              {isPending ? "Updating..." : "Update Status"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="border h-8 w-full sm:w-auto mt-2 rounded-none"
            >
              ⬅ Return to Order Page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
