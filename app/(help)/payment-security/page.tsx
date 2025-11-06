"use client";

import * as React from "react";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Wallet,
  Receipt,
  HelpCircle,
} from "lucide-react";

export default function PaymentSecurityFaqPage() {
  const faqItems = [
    {
      question: "Which payment methods do you accept?",
      answer:
        "At Kronstil, we offer secure online payment options. You can pay using Visa, MasterCard, American Express, Maestro, and most major debit and credit cards. We also accept selected digital payment options such as Apple Pay and Google Pay when available.",
      icon: <CreditCard className="h-6 w-6 text-black" />,
    },
    {
      question: "Is it safe to pay online at Kronstil?",
      answer:
        "Yes, absolutely. Kronstil uses encrypted SSL connections and trusted third-party payment gateways to ensure your card details and personal information remain private and secure at all times.",
      icon: <Lock className="h-6 w-6 text-black" />,
    },
    {
      question: "Do you store my card information?",
      answer:
        "No, Kronstil does not store or have access to your full payment card details. All transactions are processed securely by our verified payment partners according to PCI-DSS compliance standards.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I pay after delivery?",
      answer:
        "Currently, all orders must be paid online at checkout to confirm the purchase. However, we plan to add 'Pay Later' options through Klarna and other secure providers soon.",
      icon: <Wallet className="h-6 w-6 text-black" />,
    },
    {
      question: "What if my payment fails?",
      answer:
        "If your payment fails, please make sure your card details are entered correctly, and that you have sufficient funds or authorization for online transactions. You can also try another card or contact your bank for assistance.",
      icon: <AlertCircle className="h-6 w-6 text-black" />,
    },
    {
      question: "Will I get a receipt after payment?",
      answer:
        "Yes. As soon as your payment is successful, a confirmation email along with your order receipt will be sent to the email address you provided during checkout.",
      icon: <Receipt className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I get a refund if I cancel or return my order?",
      answer:
        "Yes, if you cancel or return your order according to Kronstil’s return policy, the refund will be issued back to your original payment method within 3–7 business days after approval.",
      icon: <RefreshCw className="h-6 w-6 text-black" />,
    },
    {
      question: "Is it safe to use my credit card on your site?",
      answer:
        "Yes. All payments are processed using 256-bit SSL encryption. Kronstil never shares or sells customer information, and all transactions are protected by fraud detection and verification systems.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
    {
      question: "What should I do if I’m charged twice or notice an incorrect charge?",
      answer:
        "If you believe you’ve been charged incorrectly, please contact Kronstil support immediately with your order number and payment reference. We will investigate and process a correction or refund right away.",
      icon: <HelpCircle className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6">
      {/* Page heading */}
      <h1 className="text-xl font-bold text-black mb-2">Payment & Security – Kronstil</h1>

      {/* Intro section */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstil</strong>, we make online shopping simple and safe. You can pay directly
        on our website using <strong>Visa, MasterCard, American Express, Maestro</strong> and other
        major cards. All payments are processed securely through encrypted connections and trusted
        gateways to protect your information at every step.
      </p>

      {/* FAQ Section */}
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
