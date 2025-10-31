"use client";

import * as React from "react";
import FaqCard from "@/app/components/storefront/faqCard";
import { CreditCard, InfoIcon, Package, Truck, Users } from "lucide-react";

export default function FaqPage() {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our kids' clothing collection, add the desired items to your cart, and proceed to checkout. Follow the instructions for payment and delivery details.",
      icon: <Package className="h-6 w-6 text-white" />,
    },
    {
      question: "What are the shipping fees?",
      answer: "We offer free shipping on all orders, with no hidden charges. We use trusted delivery services like Budbee, PostNord, and Instabox.",
      icon: <Truck className="h-6 w-6 text-white" />,
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can track your order through the courier's website or on our order tracking page.",
      icon: <InfoIcon className="h-6 w-6 text-white" />,
    },
    {
      question: "How can I return an item?",
      answer: "You can return or exchange items within 30 days of receiving your order. Please visit our Return & Exchange page for detailed instructions.",
      icon: <Package className="h-6 w-6 text-white" />,
    },
    {
      question: "Do you offer gift cards?",
      answer: "Yes, we offer gift cards that you can buy online. Perfect for a gift for someone who loves our kids' clothing!",
      icon: <CreditCard className="h-6 w-6 text-white" />,
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach out to our customer support team through email, live chat, or by phone. Our team is available to assist you within 24 hours.",
      icon: <Users className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-8 mb-24 px-6">
      <div className="md:w-[60%] mx-auto h-auto mt-[100px]">

        {/* FAQ section */}
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <FaqCard key={index} heading={item.question} details={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
