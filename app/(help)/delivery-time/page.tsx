"use client";

import * as React from "react";
import {
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  HelpCircle,
  Clock,
  Undo2,
  Globe,
  Boxes,
} from "lucide-react";

export default function DeliveryFaqPage() {
  const faqItems = [
    {
      question: "Where is my parcel?",
      answer:
        "You can track the delivery status of your parcel using the tracking link provided in your shipment confirmation email. Once your parcel has been dispatched from Kronstoll, the link will show real-time delivery updates.",
      icon: <Truck className="h-6 w-6 text-black" />,
    },
    {
      question: "What delivery options are available?",
      answer:
        "Kronstoll currently offers standard home delivery and delivery to selected pickup points. All orders are shipped with trusted couriers such as PostNord, Budbee, or Instabox, depending on your location.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "What does standard delivery include?",
      answer:
        "Standard delivery covers all orders shipped within Sweden. Most parcels are delivered within 3–7 business days after dispatch. You will receive a confirmation email with tracking details once your order is on the way.",
      icon: <Clock className="h-6 w-6 text-black" />,
    },
    {
      question: "What does long-distance delivery include?",
      answer:
        "For locations that are farther from our main warehouse or outside major cities, long-distance delivery may take a few extra days. However, even in such cases, Kronstoll ensures your order is delivered within a maximum of 7 days.",
      icon: <Boxes className="h-6 w-6 text-black" />,
    },
    {
      question: "What happens if my order is delayed?",
      answer:
        "At Kronstoll, we take delivery time seriously. If your order is delayed beyond the expected time, we will refund a part of your payment as compensation for the delay inconvenience.",
      icon: <AlertTriangle className="h-6 w-6 text-black" />,
    },
    {
      question: "Why is my order split into several parcels?",
      answer:
        "To ensure you receive your items as quickly as possible, some products may be shipped separately if they are available in different warehouses or ready sooner than others.",
      icon: <Boxes className="h-6 w-6 text-black" />,
    },
    {
      question: "Why did I receive different orders in one parcel?",
      answer:
        "Sometimes, to make delivery faster and more eco-friendly, Kronstoll may combine multiple orders into one shipment if they are going to the same address.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "What should I do if my parcel arrives in damaged packaging?",
      answer:
        "If your parcel arrives damaged, please check the contents immediately. If any item is missing or damaged, contact Kronstoll support with photos of the packaging and items so we can help you right away.",
      icon: <AlertTriangle className="h-6 w-6 text-black" />,
    },
    {
      question: "Why was my parcel returned to the sender?",
      answer:
        "If your parcel couldn’t be delivered (for example, if the address was incorrect or the courier couldn’t reach you), it may be returned to Kronstoll. Please contact us, and we’ll arrange a reshipment or refund.",
      icon: <Undo2 className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I have my parcel delivered to a pickup point?",
      answer:
        "Yes. Kronstoll offers delivery to selected pickup points at checkout. You’ll receive an SMS or email notification once your parcel is ready for pickup.",
      icon: <MapPin className="h-6 w-6 text-black" />,
    },
    {
      question: "How are Kronstoll partner items delivered?",
      answer:
        "Items from Kronstoll’s verified partners are shipped directly by the partner to ensure faster delivery. Tracking details will still be provided by Kronstoll in your order confirmation.",
      icon: <Package className="h-6 w-6 text-black" />,
    },
    {
      question: "Which countries does Kronstoll deliver to?",
      answer:
        "Orders placed on Kronstoll.se are currently delivered within Sweden. We plan to expand our delivery options to other Nordic countries in the near future.",
      icon: <Globe className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6">
      {/* Page heading */}
      <h1 className="text-xl font-bold text-black mb-2">Delivery – Kronstoll</h1>

      {/* Intro */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstoll</strong>, we aim to deliver your order quickly and safely. Most orders
        arrive within <strong>3–7 days</strong>. If your delivery ever takes longer than expected,
        we’ll refund a part of your payment as compensation for the delay. Below, you’ll find
        answers to the most common questions about our delivery process.
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
