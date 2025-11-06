"use client";

import * as React from "react";
import { CreditCard, ShieldCheck, InfoIcon, Users2 } from "lucide-react";

export default function PaymentOptionsPage() {
  return (
    <div className="flex flex-col min-h-screen mt-6 mb-24 px-4 md:px-12 max-w-5xl mx-auto space-y-10">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-black mb-4">Kronstil – Payment Options</h1>

      {/* Introduction */}
      <p className="text-sm text-gray-700 mb-6">
        At Kronstil, we offer secure, convenient, and flexible payment options to make your shopping experience smooth and safe. 
        Choose the method that suits you best.
      </p>

      {/* Payment Methods */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-black" /> Online Card Payments
        </h2>
        <p className="text-sm text-black">
          We accept all major credit and debit cards for online payments. This includes: <strong>Visa, MasterCard, American Express, and Maestro</strong>. 
          All transactions are processed securely using encrypted payment gateways to protect your personal and financial information.
        </p>
      </section>

      {/* Invoice Payment */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <InfoIcon className="h-6 w-6 text-black" /> Invoice Payment
        </h2>
        <p className="text-sm text-black">
          Kronstil offers invoice payment for registered customers. You must pay within <strong>30 days</strong> of receiving your order. No prior reminders are sent. 
          If the payment is not made on time and you have not informed us in advance, your invoice will be sent directly to <strong>Inkasso</strong> in Sweden, which may include additional fees.
        </p>
      </section>

      {/* Security & Trust */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-black" /> Security & Trust
        </h2>
        <ul className="list-disc ml-5 text-sm space-y-2 text-black">
          <li>All payments are processed through secure, encrypted payment gateways.</li>
          <li>We never store full card details on our servers.</li>
          <li>Transactions are monitored to prevent fraud.</li>
          <li>Kronstil maintains full transparency in billing and refunds.</li>
        </ul>
      </section>

      {/* Contact & Support */}
      <section className="space-y-4 border border-gray-300 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <Users2 className="h-6 w-6 text-black" /> Need Help with Payment?
        </h2>
        <p className="text-sm text-black">
          If you encounter any issues or have questions regarding payment, please contact our support team at <strong>support@kronstil.se</strong>. 
          We are happy to assist you with card payments, invoice queries, or any other payment concerns.
        </p>
      </section>

      {/* Additional Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2">Additional Notes</h2>
        <ul className="list-disc ml-5 text-sm space-y-2 text-black">
          <li>Kronstil only processes payments for orders placed through our official website.</li>
          <li>Ensure your billing information is correct to avoid delays.</li>
          <li>Refunds for returns are processed to the original payment method.</li>
          <li>Invoice payments must be made on time to avoid additional fees via Inkasso in Sweden.</li>
        </ul>
      </section>
    </div>
  );
}
