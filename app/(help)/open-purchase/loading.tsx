"use client";

import * as React from "react";
import { CreditCard, InfoIcon, Package, Truck, Users2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Optional: if you have shadcn/ui Skeleton

export default function FaqPageWithSkeleton({ loading = false }: { loading?: boolean }) {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our kids' clothing collection, add the desired items to your cart, and proceed to checkout. Follow the instructions for payment and delivery details.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "What are the shipping fees?",
      answer:
        "We offer free shipping on all orders, with no hidden charges. We use trusted delivery services like Budbee, PostNord, and Instabox.",
      icon: <Truck className="h-6 w-6 text-black" />,
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email. You can track your order through the courier's website or on our order tracking page.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "How can I return an item?",
      answer:
        "You can return or exchange items within 30 days of receiving your order. Please visit our Return & Exchange page for detailed instructions.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer gift cards that you can buy online. Perfect for a gift for someone who loves our kids' clothing!",
      icon: <CreditCard className="h-6 w-6 text-black" />,
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to our customer support team through email, live chat, or by phone. Our team is available to assist you within 24 hours.",
      icon: <Users2 className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6 space-y-6">
      {/* Page heading */}
      <h1 className="text-xl font-bold text-black mb-6">Help & FAQ</h1>

      <div className="w-full md:w-full mx-auto h-auto space-y-4">
        {loading
          ? // Skeleton loader for FAQ
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-gray-300 rounded-sm" />
                  <div className="h-4 w-3/4 bg-gray-300 rounded-sm" />
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-sm" />
                <div className="h-3 w-5/6 bg-gray-200 rounded-sm" />
              </div>
            ))
          : // Actual FAQ items
            faqItems.map((item, index) => (
              <div key={index} className="w-full py-4 flex flex-col gap-2">
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
