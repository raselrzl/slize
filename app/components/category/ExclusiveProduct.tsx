import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ExclusiveProduct() {
  return (
    <section className="bg-[#2A1F14] text-white pt-8 px-4 md:px-8 max-w-7xl mx-auto mb-4">
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
       

        {/* Right side text section */}
        <div className="flex flex-col justify-center items-start gap-4 md:gap-6 md:w-1/2 text-left">
          <div className="flex justify-center md:justify-start">
            <FileQuestion className="w-10 h-10 text-yellow-300"/>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Our Exclusive Product Collection
          </h2>

          <p className="text-sm md:text-base text-gray-200 max-w-md">
            Discover our most premium and limited edition products, crafted with
            care and quality. Don’t miss out on what’s trending right now.
          </p>
        </div>
         {/* Left side image */}
        <div className="relative w-full md:w-[600px] h-[300px] flex-shrink-0 overflow-hidden">
          <Image
            src="/exclusivebanner.png"
            alt="Exclusive Product"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
