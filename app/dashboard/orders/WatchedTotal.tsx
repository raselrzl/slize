"use client";

import { useEffect, useState } from "react";

interface Props {
  total: number;
  id?: string; // optional unique key for localStorage
}

export default function PersistentNewOrdersCounter({ total, id = "orders" }: Props) {
  const storageKey = `lastSeenTotal_${id}`;
  const [lastSeen, setLastSeen] = useState<number>(0);
  const [newOrders, setNewOrders] = useState<number>(0);
  const [showRed, setShowRed] = useState(false);

  // load last seen total from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? parseInt(saved, 10) : total;
    setLastSeen(parsed);
  }, [total, storageKey]);

  // detect new orders
  useEffect(() => {
    if (total > lastSeen) {
      setNewOrders(total - lastSeen);
      setShowRed(true);
    } else {
      setNewOrders(0);
      setShowRed(false);
    }
  }, [total, lastSeen]);

  const handleClick = () => {
    setLastSeen(total);
    localStorage.setItem(storageKey, total.toString());
    setNewOrders(0);
    setShowRed(false);
  };

  return (
    <div
      className="text-sm bg-primary text-gray-800 px-3 py-1 rounded-md cursor-pointer select-none"
      style={{ color: showRed ? "red" : "black" }}
      onClick={handleClick}
      title="Click to mark orders as seen"
    >
      {newOrders > 0 ? `${newOrders} New Orders` : `Total: ${total}`}
    </div>
  );
}
