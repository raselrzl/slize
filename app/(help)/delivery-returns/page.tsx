"use client";

import * as React from "react";
import {
  Package,
  Undo2,
  AlertTriangle,
  CheckCircle,
  InfoIcon,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function DeliveryReturnsFaqPage() {
  const faqItems = [
    {
      question: "Can I return an item I purchased from Kronstoll?",
      answer:
        "Yes, you can return items purchased from Kronstoll within 30 days of receiving your order. To start a return, please contact our support team and provide your order number and reason for return.",
      icon: <Undo2 className="h-6 w-6 text-black" />,
    },
    {
      question: "Is there any cost for returning an item?",
      answer:
        "Returns are accepted at Kronstoll, but you will need to cover the return delivery cost. The original shipping fee is non-refundable. We always recommend using a trackable shipping method for your return.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "Do I need to explain why I’m returning the product?",
      answer:
        "Yes. When you request a return or refund, please provide a valid reason. This helps our team understand the issue and improve our quality control. Returns without a clear explanation may take longer to process.",
      icon: <ClipboardList className="h-6 w-6 text-black" />,
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Once we receive and inspect the returned item, refunds are usually processed within 5–10 business days. You will receive an email confirmation once the refund has been issued.",
      icon: <CheckCircle className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes, if you prefer, you can request an exchange for a different size, color, or product. Exchanges are processed after we receive the original item back in unused condition.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "What if I received a damaged or incorrect item?",
      answer:
        "If your order arrives damaged or incorrect, please contact Kronstoll immediately with photos of the item and packaging. We will arrange a replacement or full refund, including the shipping cost.",
      icon: <AlertTriangle className="h-6 w-6 text-black" />,
    },
    {
      question: "Do you check product quality before shipping?",
      answer:
        "Absolutely. Every product at Kronstoll goes through a careful quality control check before being shipped. We make sure each item matches the product description and customer’s selected options exactly.",
      icon: <CheckCircle className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I return used or washed items?",
      answer:
        "No. For hygiene and quality reasons, returned items must be in unused, unwashed, and original condition with all tags attached. Used or damaged items cannot be refunded or exchanged.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6">
      {/* Page heading */}
      <h1 className="text-xl font-bold text-black mb-2">Delivery & Returns – Kronstoll</h1>

      {/* Intro */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstoll</strong>, we always ensure your products are delivered on time and in
        perfect condition. Every item is carefully checked before shipping to guarantee it matches
        the description and your order exactly.  
        <br />
        <br />
        If you wish to return an item, you may do so within <strong>30 days</strong> of receiving
        it. Please note that customers are responsible only for the <strong>return delivery
        cost</strong>. Refunds require a <strong>valid reason</strong> for the return, as this helps
        us maintain the high product standards we promise.
      </p>

      {/* FAQ list */}
      <div className="w-full md:w-full mx-auto h-auto">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="w-full py-4 border-b border-gray-700 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-sm font-bold text-black">{item.question}</h3>
            </div>
            <p className="text-xs text-black">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
