"use client";

import * as React from "react";
import { FileText, Clock, AlertTriangle, InfoIcon, ShieldCheck, CreditCard } from "lucide-react";

export default function InvoicePaymentFaqPage() {
  const faqItems = [
    {
      question: "Does Kronstoll offer invoice payment?",
      answer:
        "Yes. Kronstoll offers invoice payment for customers who prefer to pay after receiving their products. You will receive your invoice by email once your order has been shipped.",
      icon: <FileText className="h-6 w-6 text-black" />,
    },
    {
      question: "How long do I have to pay my invoice?",
      answer:
        "The payment must be made within 30 days from the invoice date. We do not send any reminders before the due date, so please make sure to pay on time.",
      icon: <Clock className="h-6 w-6 text-black" />,
    },
    {
      question: "What happens if I don’t pay my invoice on time?",
      answer:
        "If your payment is not received within the 30-day period and you have not contacted us, the case will be automatically transferred to Inkasso (Swedish debt collection agency). Additional fees and interest may apply according to Swedish law.",
      icon: <AlertTriangle className="h-6 w-6 text-black" />,
    },
    {
      question: "Can I contact Kronstoll if I can’t pay on time?",
      answer:
        "Yes, absolutely. If you experience any payment difficulties, contact Kronstoll before the due date. We can sometimes arrange an extended payment plan to help you avoid Inkasso fees.",
      icon: <InfoIcon className="h-6 w-6 text-black" />,
    },
    {
      question: "How will I receive my invoice?",
      answer:
        "Invoices are sent directly to the email address used when placing your order. If you do not receive it within 24 hours after shipping, please check your spam folder or contact us.",
      icon: <CreditCard className="h-6 w-6 text-black" />,
    },
    {
      question: "Is invoice payment safe?",
      answer:
        "Yes. Kronstoll handles all invoice payments securely through our verified payment partners. Your personal and payment details are always protected according to GDPR and Swedish financial standards.",
      icon: <ShieldCheck className="h-6 w-6 text-black" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6">
      {/* Page heading */}
      <h1 className="text-xl font-bold text-black mb-2">Invoice Payment – Kronstoll</h1>

      {/* Intro */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstoll</strong>, you can easily pay for your order through invoice. Payment must
        be made within <strong>one month (30 days)</strong> of the invoice date. If payment is not
        received and you do not contact us in time, the case will automatically be sent to{" "}
        <strong>Inkasso</strong> in Sweden, and additional fees may apply. Please ensure that your
        payment is made on time to avoid any extra costs.
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
