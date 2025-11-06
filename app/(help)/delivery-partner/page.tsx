"use client";

import * as React from "react";
import { Truck, Package, InfoIcon, Users2, ShieldCheck } from "lucide-react";

export default function DeliveryPartnerTwoColumnPage() {
  const faqItems = [
    {
      question: "How long does delivery take?",
      answer:
        "Kronstil delivers throughout Sweden and typically within a maximum of 7 days from order confirmation. If delivery is delayed beyond expectations, we compensate partially for the delay.",
      icon: <Truck className="h-6 w-6 text-black" />,
    },
    {
      question: "What delivery options are available?",
      answer:
        "We offer Standard Delivery (free, tracking via email) and Premium Delivery (express, high priority). Delivery is handled through our partners: Budbee, PostNord, Instabox, DHL, and Paket.se.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "How can I track my package?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can track your package via the courier's website or our order tracking page.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "What are the return costs?",
      answer:
        "Returns only cost the delivery fee. You must provide a valid reason for the return. Kronstil always checks quality to ensure the product is as described.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I have my package delivered to a pickup point?",
      answer: "Yes, you can choose to have your package delivered to one of our partner pickup points.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-6 mb-24 px-2 md:px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">Delivery & Partner System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - FAQ */}
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

        {/* Right Column - Partner Instructions */}
        <div className="border border-gray-300 p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-black mb-2">Instructions for Partners</h2>
          <ul className="list-disc ml-5 text-sm space-y-1 text-black">
            <li>Strictly follow Kronstil's delivery routines and standards.</li>
            <li>Log all deliveries in the system for accurate tracking.</li>
            <li>Immediately report any damaged or lost packages.</li>
            <li>Communicate any delays to Kronstil directly.</li>
            <li>Deliveries must be handled by our approved partners: <strong>Budbee, PostNord, Instabox, DHL, and Paket.se</strong>.</li>
          </ul>

          <h3 className="text-sm font-bold text-black mt-4">Partner Contact:</h3>
          <p className="text-xs text-black">partnersupport@kronstil.se</p>

          <h3 className="text-sm font-bold text-black mt-2">Customer Contact:</h3>
          <p className="text-xs text-black">support@kronstil.se</p>
        </div>
      </div>
    </div>
  );
}
