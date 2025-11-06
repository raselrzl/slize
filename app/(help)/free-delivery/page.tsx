"use client";

import * as React from "react";
import { Truck, InfoIcon, ShieldCheck } from "lucide-react";

export default function FreeDeliveryPage() {
  const faqItems = [
    {
      question: "Do I qualify for free delivery?",
      answer:
        "Orders over SEK 500 qualify for free standard delivery anywhere in Sweden. No additional charges apply for eligible orders.",
      icon: <Truck className="h-6 w-6 text-black" />,
    },
    {
      question: "What if the delivery person asks for money?",
      answer:
        "Do not pay the delivery person. If they ask for cash or extra fees, refuse politely and contact support@kronstil.se immediately. All delivery charges for eligible orders are prepaid by Kronstil.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "How can I track my free delivery?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can check the tracking status on the courier's website or on our order tracking page.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "Does free delivery apply to all types of delivery?",
      answer:
        "Free delivery applies only to standard deliveries within Sweden. Premium or express deliveries may have additional charges.",
      icon: <Truck className="h-6 w-6 text-black" />,
    },
    {
      question: "Can the free delivery policy change?",
      answer:
        "Yes, Kronstil reserves the right to update the free delivery threshold or eligibility based on company policies or special promotions.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-6 mb-24 px-2 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Free Delivery Policy</h1>

      <p className="text-sm text-gray-700 mb-6">
        At Kronstil, we value our customers. Orders over SEK 500 qualify for free standard delivery anywhere in Sweden. 
        Please follow the instructions below to ensure a smooth delivery experience.
      </p>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="w-full py-4 border-b border-gray-700 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-sm font-bold text-black">{item.question}</h3>
            </div>
            <p className="text-xs text-black">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-gray-300 p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-black mb-2">Contact for Issues</h2>
        <p className="text-xs text-black">
          If you experience any problems with your free delivery, or if the delivery person asks for extra payment, contact us immediately: <strong>support@kronstil.se</strong>
        </p>
      </div>
    </div>
  );
}
