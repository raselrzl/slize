import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ExclusiveProductBannerHome() {
  return (
    <section className=" mt-16 text-white py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <Link
        href="/products/exclusivegirls" 
        className="flex flex-col md:flex-row items-center md:items-stretch gap-6"
      >
        {/* Right side text section */}
        <div className="flex flex-col justify-center items-start gap-4 md:gap-6 md:w-1/2 text-left">
          <div className="flex justify-center md:justify-start">
            <FileQuestion className="w-10 h-10 text-yellow-300" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Our Exclusive Product Collection
          </h2>

          <p className="text-sm md:text-base text-gray-200 max-w-md">
            Discover our most premium and limited edition products, crafted with
            care and quality. Don’t miss out on what’s trending right now.
          </p>

          <p className="mt-2 inline-block bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors">
            Explore Now
          </p>
        </div>
        {/* Left side image */}
        <div className="relative w-full md:w-[600px] h-[200px] md:h-[300px] flex-shrink-0 overflow-hidden">
          <Image
            src="/exclusive-product.png"
            alt="Exclusive Product"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Link>
    </section>
  );
}
