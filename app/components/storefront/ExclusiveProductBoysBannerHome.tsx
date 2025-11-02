import { FileQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ExclusiveProductBoysHomeBanner() {
  return (
    <Link href="/products/exclusiveboys" className="max-w-7xl mx-auto">
      <section className="bg-gray-800 text-white py-6 px-4 cursor-pointer transition">
        <div className="flex flex-col md:flex-row items-center justify-between md:items-stretch gap-6 max-w-7xl mx-auto">
          {/* Right side text section */}
          <div className="flex flex-col justify-center items-start gap-4 md:gap-6 md:w-1/2 text-left">
            <div className="flex justify-center md:justify-start">
              <FileQuestion className="w-10 h-10 text-yellow-300" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              Exclusive Boys Collection
            </h2>

            <p className="text-sm md:text-base text-gray-200 max-w-md">
              Discover our handpicked collection of boys’ apparel and accessories. Each piece is designed
              to be unique, stylish, and comfortable—perfect for your little champion. Limited stock available,
              so grab your favorites before they're gone!
            </p>

            {/* Button */}
            <div>
              <span className="inline-block mt-2 bg-yellow-300 text-gray-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-400 transition">
                Shop Now →
              </span>
            </div>
          </div>

          {/* Left side image */}
          <div className="relative w-full md:w-[600px] h-[300px] justify-end flex-shrink-0 overflow-hidden">
            <Image
              src="/featuredproductallboys.jpg"
              alt="Exclusive Boys Product"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </Link>
  );
}
