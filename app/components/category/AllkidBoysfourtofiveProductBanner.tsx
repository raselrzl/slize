import { FileQuestion } from "lucide-react";
import Image from "next/image";

export function AllkidBoysfourtofiveProductBanner() {
  return (
    <section className="bg-gray-900 text-white py-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between md:items-stretch gap-6 max-w-7xl mx-auto">
               {/* Right side text section */}
        <div className="flex flex-col justify-center items-start gap-4 md:gap-6 md:w-1/2 text-left">
          <div className="flex justify-center md:justify-start">
            <FileQuestion className="w-10 h-10 text-yellow-300"/>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Boys 4-5 years Old Product Collection
          </h2>

          <p className="text-sm md:text-base text-gray-200 max-w-md">
           Each of our items is available in only one piece—truly one of a kind.
            We’re currently showcasing our limited stock, but stay tuned as we plan to expand
            with more unique collections soon.
          </p>
        </div>
         {/* Left side image */}
        <div className="relative w-full md:w-[600px] h-[200px] md:h-[300px] justify-end flex-shrink-0 overflow-hidden">
          <Image
            src="/zaber1.png"
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
