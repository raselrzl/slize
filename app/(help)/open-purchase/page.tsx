"use client";

import * as React from "react";
import { Package, InfoIcon, ShieldCheck, Users2 } from "lucide-react";

export default function OpenPackagePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen mt-6 mb-24 px-4 md:px-12 max-w-5xl mx-auto space-y-10">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-black mb-4">Kronstil – 30-Day Open Package Policy</h1>

      {/* Introduction */}
      <p className="text-sm text-gray-700 mb-6">
        At Kronstil, we want you to shop with confidence. Our 30-Day Open Package Policy allows you to receive your products, inspect and try them safely, and return them within 30 days if they do not meet your expectations. 
        This ensures a flexible and risk-free shopping experience.
      </p>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <Package className="h-6 w-6 text-black" /> How the 30-Day Open Package Policy Works
        </h2>
        <p className="text-sm text-black">
          1. Receive your Kronstil package and open it carefully. You may try on clothing or inspect items for quality and correctness.  
          2. Ensure all original packaging, labels, and accessories are kept safe during the 30 days.  
          3. If you decide to return the item, please contact <strong>support@kronstil.se</strong> with your order number and reason for return.  
          4. You have up to 30 days from delivery to initiate the return process.  
          5. Returned items are inspected to ensure they are in good condition. Refunds are processed to your original payment method within 7–10 business days after receiving the return.
        </p>
      </section>

      {/* Valid Reasons for Return */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <InfoIcon className="h-6 w-6 text-black" /> Valid Reasons for Return
        </h2>
        <ul className="list-disc ml-5 text-sm text-black space-y-2">
          <li>Product does not fit or size is incorrect.</li>
          <li>Product is damaged or defective.</li>
          <li>Product differs from the description on our website.</li>
          <li>Incorrect item received.</li>
        </ul>
      </section>

      {/* Quality Check */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-black" /> Quality Check & Condition
        </h2>
        <p className="text-sm text-black">
          All returned items are checked for quality. Items must be unused, in original condition, with packaging, tags, and accessories intact. 
          Products failing the quality check may be partially refunded or rejected.
        </p>
      </section>

      {/* Contact for Returns */}
      <section className="space-y-4 border border-gray-300 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          <Users2 className="h-6 w-6 text-black" /> How to Return Items
        </h2>
        <p className="text-sm text-black">
          Email <strong>support@kronstil.se</strong> with:  
          • Your order number  
          • Items you wish to return  
          • Reason for return  
        </p>
        <p className="text-sm text-black">
          We will provide instructions for returning the items, including a prepaid label if applicable.
        </p>
      </section>

      {/* Additional Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-2">Additional Notes</h2>
        <ul className="list-disc ml-5 text-sm space-y-2 text-black">
          <li>All returns within 30 days are subject to Kronstil’s quality check.</li>
          <li>Refunds are processed within 7–10 business days after receiving returned items.</li>
          <li>Ensure all original packaging and labels are retained.</li>
          <li>If the delivery person asks for extra payment, do not pay and contact support immediately.</li>
          <li>This policy applies to all products purchased directly from Kronstil’s website.</li>
        </ul>
      </section>
    </div>
  );
}
