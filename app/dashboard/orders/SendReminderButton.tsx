"use client"; // ✅ This makes it a Client Component

import { Button } from "@/components/ui/button";

interface SendReminderButtonProps {
  orderId: string;
}

export function SendReminderButton({ orderId }: SendReminderButtonProps) {
  const sendReminder = async () => {
    try {
      const res = await fetch(`/api/email/${orderId}`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to send reminder");
      alert("Reminder email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send reminder email.");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={sendReminder}>
      Send Reminder
    </Button>
  );
}
