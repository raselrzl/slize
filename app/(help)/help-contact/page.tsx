"use client";

import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen mt-2 mb-24 px-2 md:px-6">
      {/* Page Heading */}
      <h1 className="text-xl font-bold text-black mb-4">Contact Customer Support</h1>

      {/* Intro Text */}
      <p className="text-xs md:text-sm text-black mb-8 max-w-2xl">
        If you need help with your order, product issue, or refund request,
        please fill out the form below. Include your order number and a clear
        description of your concern. Our support team will get back to you
        within <span className="font-semibold">24–48 hours</span>.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-400 p-6 w-full max-w-3xl bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-black mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              className="w-full border border-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-600 rounded-none"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-[11px] mt-1">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-black mb-1">
              Contact Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-600 rounded-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-[11px] mt-1">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          {/* Order Number */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-black mb-1">
              Order Number
            </label>
            <input
              type="text"
              {...register("orderNumber")}
              className="w-full border border-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-600 rounded-none"
              placeholder="Enter your order number (if available)"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-black mb-1">Subject</label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full border border-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-600 rounded-none"
              placeholder="Write a short subject"
            />
            {errors.subject && (
              <p className="text-red-600 text-[11px] mt-1">
                {errors.subject.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col mt-5">
          <label className="text-xs font-bold text-black mb-1">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={5}
            className="w-full border border-gray-400 px-3 py-2 text-xs focus:outline-none focus:border-gray-600 resize-none rounded-none"
            placeholder="Describe your issue or request in detail"
          />
          {errors.message && (
            <p className="text-red-600 text-[11px] mt-1">
              {errors.message.message?.toString()}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white text-xs py-2 mt-6 uppercase tracking-wide hover:bg-gray-900 transition-colors rounded-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
