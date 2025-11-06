"use client";

import { useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteOrderAction } from "@/app/actions";

export default function DeleteOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    startTransition(async () => {
      try {
        const res = await deleteOrderAction(orderId);
        if (res.success) {
          alert("✅ Order deleted successfully!");
          router.push("/dashboard/orders");
        } else {
          setError(res.message || "Failed to delete order");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while deleting order.");
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-20 border border-red-400 bg-red-50 dark:bg-gray-800 dark:border-gray-600 p-8 rounded-lg text-center">
      <div className="flex flex-col items-center gap-3">
        <AlertTriangle className="w-12 h-12 text-red-600" />
        <h1 className="text-xl font-bold text-red-700">
          Delete Order Confirmation
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          You are about to permanently delete order ID:
          <span className="font-semibold text-red-600"> {orderId}</span>
        </p>
        <p className="text-sm text-gray-500">
          This action cannot be undone.
        </p>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleDelete}
          className="flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
            </>
          ) : (
            "Yes, Delete"
          )}
        </Button>
        <Link href="/dashboard/orders">
          <Button variant="secondary">Cancel</Button>
        </Link>
      </div>
    </div>
  );
}
