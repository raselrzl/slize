"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProductsClient({ data }: { data: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-5">
      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className=" md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 hover:bg-gray-100 hover:text-black hover:border border-black"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scroll area */}
      <div
        ref={scrollRef}
        className="
          flex gap-3 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[220px] md:w-[240px] snap-start h-[400px]"
          >
            <ProductCard item={item} />
          </div>
        ))}
      </div>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className="md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 hover:bg-gray-100 hover:text-black hover:border border-black"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
