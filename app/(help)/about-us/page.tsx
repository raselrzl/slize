"use client";

import * as React from "react";
import { Globe, ShieldCheck, Star, Package, Heart } from "lucide-react";

export default function AboutKronstil() {
  return (
    <div className="flex flex-col min-h-screen mt-10 mb-24 px-2 md:px-6 max-w-4xl mx-auto">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-black mb-6">About Kronstil</h1>

      {/* Intro paragraph */}
      <p className="text-sm text-black mb-6">
        At <strong>Kronstil</strong>, we take pride in crafting beautiful, high-quality products that
        bring comfort, style, and reliability to your everyday life. All of our products are
        <strong> designed and made in Bangladesh</strong>, where our expert team carefully selects
        premium materials and ensures every piece meets <strong>Swedish quality standards</strong>.
      </p>

      {/* Highlights */}
      <div className="flex flex-col gap-6">
        {/* Quality & Safety */}
        <div className="flex gap-4">
          <ShieldCheck className="h-6 w-6 text-black flex-shrink-0" />
          <p className="text-sm text-black">
            We ensure every Kronstil product is made with care and tested for safety, so no one is
            harmed using our products.
          </p>
        </div>

        {/* Popularity & Trust */}
        <div className="flex gap-4">
          <Star className="h-6 w-6 text-black flex-shrink-0" />
          <p className="text-sm text-black">
            Kronstil has become one of Sweden’s most trusted and popular companies, admired for
            combining international design inspiration with the craftsmanship of Bangladeshi
            production.
          </p>
        </div>

        {/* Fund & Profit */}
        <div className="flex gap-4">
          <Heart className="h-6 w-6 text-black flex-shrink-0" />
          <p className="text-sm text-black">
            Every product supports the Kronstil company’s own fund and profit structure, allowing us
            to invest in ethical production, sustainable materials, and excellent customer service.
          </p>
        </div>

        {/* Design & Quality */}
        <div className="flex gap-4">
          <Package className="h-6 w-6 text-black flex-shrink-0" />
          <p className="text-sm text-black">
            We design all our products ourselves, maintain high-quality standards, and ensure each
            product matches exactly what we describe and what our customers want.
          </p>
        </div>

        {/* Vision */}
        <div className="flex gap-4">
          <Globe className="h-6 w-6 text-black flex-shrink-0" />
          <p className="text-sm text-black">
            At Kronstil, our promise is simple: <strong>Designed with care. Made with pride.
            Delivered with trust.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
