"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Mail, Briefcase, Users } from "lucide-react";

export default function CareerPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("CV submission:", data);
    reset();
    alert("Thank you! Your CV has been logged. Please send your CV via email to hr@kronstil.se.");
  };

  return (
    <div className="flex flex-col min-h-screen mt-10 mb-24 px-2 md:px-6 max-w-4xl mx-auto">
      {/* Page heading */}
      <h1 className="text-2xl font-bold text-black mb-4">Join the Kronstil Team</h1>

      {/* Intro text */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstil</strong>, we are always looking for passionate, talented individuals who
        want to contribute to one of Sweden’s most trusted and popular brands. We design and produce
        all our products with high quality standards and care, and we value every member of our
        team.  
        <br />
        <br />
        If you are interested in joining us, please fill out the form below and **send your CV via email** to{" "}
        <strong>hr@kronstil.se</strong>.
      </p>

      {/* Career form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-gray-300 p-6 shadow-sm">
        {/* Name */}
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message?.toString()}</p>}
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Position Applying For</label>
          <input
            type="text"
            {...register("position", { required: "Please specify the position" })}
            placeholder="e.g., Designer, Logistics, Marketing"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 rounded-none"
          />
          {errors.position && <p className="text-red-600 text-xs mt-1">{errors.position.message?.toString()}</p>}
        </div>

        {/* Message / Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Message / Cover Letter</label>
          <textarea
            {...register("message", { required: "Please write a short message" })}
            rows={5}
            placeholder="Write a brief message or cover letter"
            className="w-full border border-gray-400 px-3 py-2 text-sm focus:outline-none focus:border-gray-600 resize-none rounded-none"
          />
          {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message?.toString()}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white text-sm py-2 uppercase tracking-wide hover:bg-gray-900 transition-colors rounded-none"
        >
          Submit
        </button>
      </form>

      {/* Footer note */}
      <p className="text-xs text-gray-700 mt-4">
        After submitting this form, please send your CV directly via email to{" "}
        <strong>hr@kronstil.se</strong> as attachments (PDF or Word). We look forward to hearing
        from you!
      </p>
    </div>
  );
}
