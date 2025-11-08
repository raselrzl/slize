"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { orderWithInvoice } from "@/app/actions";

interface InvoiceCheckoutModalProps {
  deliveryFee: number;
}

export default function InvoiceCheckoutModalForm({
  deliveryFee,
}: InvoiceCheckoutModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
  };

  return (
    <>
      {/* Trigger button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full mt-1 bg-gray-300 text-black hover:bg-gray-400 rounded-none"
      >
        Pay with Invoice
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md p-6 rounded-none shadow-lg relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4"> Please Enter Shipping Details</h2>

            <form
              action={orderWithInvoice}
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <input type="hidden" name="deliveryFee" value={deliveryFee} />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingName"
                placeholder="Recipient Name"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingLine1"
                placeholder="Address Line 1"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingLine2"
                placeholder="Address Line 2"
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingCity"
                placeholder="City"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingPostal"
                placeholder="Postal Code"
                required
                className="p-2 w-full rounded-none outline-none border"
              />
              <input
                type="text"
                name="shippingCountry"
                placeholder="Country"
                required
                className="p-2 w-full rounded-none outline-none border"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gray-800 text-white hover:bg-gray-700 rounded-none"
              >
                {loading ? "Order Processing..." : "Confirm Order"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
