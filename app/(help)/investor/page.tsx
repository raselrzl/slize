"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { DollarSign, ShieldCheck, FileText, Users } from "lucide-react";

export default function InvestorPlanPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Investor Plan Submission:", data);
    reset();
    alert("Thank you! Our Investor Relations team will contact you shortly.");
  };

  return (
    <div className="flex flex-col min-h-screen px-2 md:px-6 max-w-5xl mx-auto">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-black mb-4">Kronstil Investor Plan</h1>

      {/* Content */}
      <div className="space-y-6 text-black text-sm">
        <p>
          Kronstil is one of Sweden’s most trusted e-commerce companies. All products are designed
          and made in Bangladesh with strict quality and safety standards. The company is fully
          funded and managed by Kronstil itself.
        </p>

        <h2 className="font-bold text-black">Investment Rules</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Minimum investment: SEK 50,000</li>
          <li>Investment accepted only from individuals/entities compliant with Swedish law</li>
          <li>Investors must provide personal/company identification</li>
          <li>Investment terms documented in an official Investment Agreement</li>
        </ul>

        <h2 className="font-bold text-black">Profit Sharing</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Profit shared proportionally based on investment</li>
          <li>Quarterly profit calculations</li>
          <li>Profits transferred via Swedish bank accounts only</li>
          <li>Full transparency on calculations and statements</li>
        </ul>

        <h2 className="font-bold text-black">Return Policy</h2>
        <p>
          Partial or full withdrawal allowed per Investment Agreement. Withdrawals may have notice
          periods. Returns depend on company performance and market conditions.
        </p>

        <h2 className="font-bold text-black">Trust & Transparency</h2>
        <p>
          Kronstil maintains accountability with audited financial statements, quarterly reports,
          and updates shared with all investors.
        </p>

        <h2 className="font-bold text-black">Banking & Finance</h2>
        <p>
          Investor funds are held in dedicated accounts. Transactions are secured and comply with
          Swedish regulations. Accurate banking info is required for profit disbursement.
        </p>

        <h2 className="font-bold text-black">Shared Price & Market Conditions</h2>
        <p>
          Share price may increase over time depending on company performance. Returns fluctuate
          with company growth, costs, and market dynamics.
        </p>

        <h2 className="font-bold text-black">How to Invest</h2>
        <p>
          If you are interested in investing with Kronstil, fill out the form below. Our Investor
          Relations team will contact you to finalize agreements.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5 border border-gray-300 p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-black mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Full name is required" })}
            placeholder="Enter your full name"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message?.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message?.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Phone</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone is required" })}
            placeholder="Enter your phone number"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message?.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Investment Amount (SEK)</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            placeholder="Enter the amount you want to invest"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message?.toString()}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Notes / Purpose</label>
          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Write a brief message about your investment intentions"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 resize-none rounded-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-sm py-2 uppercase tracking-wide hover:bg-gray-900 transition-colors rounded-none"
        >
          Submit Investment Inquiry
        </button>
      </form>
    </div>
  );
}
