"use client";

import { useState } from "react";
import { updateItemQuantity } from "@/app/actions";


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageString: string;
}
interface QuantitySelectorProps {
  item: CartItem;
}

export function QuantitySelector({ item }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newQty = Number(e.target.value);
    setQuantity(newQty); // ✅ instantly update the UI

    // optionally update the server
    const formData = new FormData();
    formData.set("productId", item.id);
    formData.set("quantity", String(newQty));
    await updateItemQuantity(formData); // updates Redis
    // no need for router.refresh()
  }

  return (
    <div className="flex items-center gap-x-2">
      <select
        name="quantity"
        value={quantity} // controlled input
        onChange={handleChange}
        className="w-16 border border-gray-300 text-center text-sm"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <p className="text-sm">x {item.price}.00 kr</p>
    </div>
  );
}
