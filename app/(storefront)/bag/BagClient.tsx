"use client";

import { checkOut, delItem, orderWithInvoice, updateItemQuantity } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { Info, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import InvoiceCheckoutForm from "./InvoiceCheckoutForm";
import InvoiceCheckoutModalForm from "./InvoiceCheckoutForm";

interface BagClientProps {
  cart: Cart | null;
  totalPrice: number;
  deliveryFee: number;
  finalTotal: number;
}

export default function BagClient({
  cart,
  totalPrice,
  deliveryFee,
  finalTotal,
}: BagClientProps) {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex mx-auto h-[350px] w-[300px] flex-col items-center justify-center rounded-2xl border border-gray-300 bg-gradient-to-b from-gray-50 to-white shadow-sm p-10 text-center mt-20 transition-all hover:shadow-md mb-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 shadow-inner">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Your bag is feeling light!
        </h2>

        <p className="mt-3 mb-8 text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          It looks like you haven’t added anything yet. Discover our latest
          products and fill your bag with something you’ll love.
        </p>

        <Button
          asChild
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 shadow-md transition-all"
        >
          <Link href="/">🛍️ Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-2">
      <div className="grid grid-cols-1 gap-y-1">
        <p className="text-gray-900 text-2xl font-bold mb-4 ml-2">
          Your bag contains {cart.items.length}{" "}
          {cart.items.length === 1 ? "type of item" : "types of items"}
        </p>

        {cart.items.map((item) => (
          <div key={item.id} className="flex border border-gray-950/10 p-4">
            <div className="w-20 h-24 relative">
              <Image
                className="rounded-md object-contain"
                fill
                src={item.imageString}
                alt="Product image"
              />
            </div>
            <div className="ml-5 flex justify-between w-full font-medium text-gray-800">
              <div className="flex flex-col">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-xs">
                  Unit Price: <span className="font-bold">{item.price}.00</span>{" "}
                  kr
                </p>
                <span className="text-xs">
                  ({item.quantity} item{item.quantity > 1 ? "s" : ""})
                </span>
                <div className="flex items-center gap-x-2">
                  <QuantitySelector item={item} />
                </div>
              </div>

              <div className="flex flex-col h-full justify-between">
                <p className="text-xs items-center justify-center">
                  <span className="text-lg font-bold px-2">
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  kr
                </p>

                <form action={delItem} className="text-end mt-2">
                  <input type="hidden" name="productId" value={item.id} />
                  <DeleteItem />
                </form>
              </div>
            </div>
          </div>
        ))}
        <p className="text-sm flex justify-center items-center py-4">
          <Info className="pr-2" />
          Items placed in this bag are not reserved.
        </p>
      </div>

      <div className="md:sticky md:top-24 flex justify-center mt-14">
        <div className="bg-gray-200 rounded-none w-[300px] h-[340px] shadow-md mb-4">
          <div className="flex items-center text-gray-800 justify-between bg-gray-200 p-3">
            <p>Subtotal:</p>
            <p>{new Intl.NumberFormat("en-US").format(totalPrice)}.00 kr</p>
          </div>

          <div className="flex items-center text-gray-800 justify-between border-b border-gray-950/10 bg-gray-200 p-3">
            <p>Delivery cost:</p>
            <p className="text-xs">
              {deliveryFee === 0
                ? "Free delivery over 8 SEK"
                : `${deliveryFee}.00 kr`}
            </p>
          </div>

          <div className="flex items-center text-md font-bold text-gray-800 justify-between bg-gray-200 p-3">
            <p>Total:</p>
            <p>{new Intl.NumberFormat("en-US").format(finalTotal)}.00 kr</p>
          </div>

          <div className="p-3 flex flex-col gap-3 text-xs">
            <form action={checkOut}>
              <input type="hidden" name="deliveryFee" value={deliveryFee} />
              <ChceckoutButton />
            </form>

            {/* New Pay with Invoice Button */}
<InvoiceCheckoutModalForm deliveryFee={deliveryFee} />

            <p className="text-center mt-6">We accept</p>
            <div className="flex flex-wrap gap-2 justify-center px-2">
              {["ax.png", "mastercard.png", "visa.png"].map((src, i) => (
                <img
                  key={i}
                  src={`/payments/${src}`}
                  alt={src}
                  className="h-8 w-20 shadow-md object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
