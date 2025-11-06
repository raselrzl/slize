"use client";

import * as React from "react";
import { Package, ShieldCheck, InfoIcon, Users2 } from "lucide-react";

export default function ReturnPolicyPage() {
  const faqItems = [
    {
      question: "What is the return cost?",
      answer:
        "Returns only cost the delivery fee. Kronstil does not charge any additional fees for valid returns. For example, if you paid SEK 50 for shipping, only that amount applies. All other costs, including product cost, are refunded if the return is approved.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "What reasons are valid for a return?",
      answer:
        "Valid reasons include:\n\n• Wrong size or item not matching your order\n• Product damaged during delivery\n• Product does not match the description on our website\n\nPlease provide a clear explanation when returning items. Kronstil reserves the right to reject returns without valid reasoning.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "How do I initiate a return?",
      answer:
        "To start a return, email us at support@kronstil.se with your **order number**, the **item(s) you want to return**, and a **detailed reason**. We will provide a prepaid return label or instructions for sending the product back.",
      icon: <Users2 className="h-6 w-6 text-black" />,
    },
    {
      question: "How does Kronstil check product quality?",
      answer:
        "We carefully inspect every returned product. We ensure:\n\n• The item is unused and in original condition\n• All tags, labels, and packaging are intact\n• The item matches the original order\n\nProducts failing the quality check may be rejected or partially refunded.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "How long does it take to process a return?",
      answer:
        "Once your returned item is received and inspected, refunds or exchanges are processed within 7–10 business days. Refunds are returned to the original payment method.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "What if the product is damaged during delivery?",
      answer:
        "If the product is damaged on arrival:\n\n1. Take clear photos of the damage.\n2. Contact support@kronstil.se immediately with the photos.\n3. We will provide instructions for returning the item and issuing a **full refund** or replacement.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I exchange an item instead of a refund?",
      answer:
        "Yes! Kronstil allows exchanges for the same product in a different size or color, subject to availability. Email us your request at support@kronstil.se and we will guide you through the process.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "What happens if I return a product late?",
      answer:
        "Returns must be initiated within **30 days of delivery**. Returns outside this period may not be accepted unless prior approval is given by Kronstil support.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "What if I received the wrong item?",
      answer:
        "If you received an incorrect item, contact us immediately with your **order number** and details. We will arrange for a **replacement** at no extra cost and provide instructions for returning the incorrect item.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-6 mb-24 px-2 md:px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">Kronstil Return Policy</h1>

      <p className="text-sm text-gray-700 mb-6">
        At Kronstil, your satisfaction is our top priority. We have designed our return policy to be clear, fair, and easy to follow. 
        Please read carefully to understand the rules, procedures, and your rights when returning products.
      </p>

      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="w-full py-6 border-b border-gray-700 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {item.icon}
              <h3 className="text-base font-bold text-black">{item.question}</h3>
            </div>
            <p className="text-sm text-black whitespace-pre-line">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-gray-300 p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2">How to Contact Us</h2>
        <p className="text-sm text-black">
          For any questions about returns, exchanges, or product issues, please contact our dedicated support team: <strong>support@kronstil.se</strong>
        </p>
        <p className="text-sm text-black">
          Provide your order number, product details, and reason for return to ensure a fast and smooth process.
        </p>
      </div>

      <div className="mt-10 border border-gray-300 p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2">Additional Notes</h2>
        <ul className="list-disc ml-5 text-sm space-y-2 text-black">
          <li>All returned products are carefully inspected before refund or exchange.</li>
          <li>Refunds are processed to the original payment method.</li>
          <li>Keep all packaging and tags intact to ensure smooth returns.</li>
          <li>Returns outside the 30-day window may not be accepted without prior approval.</li>
        </ul>
      </div>
    </div>
  );
}
