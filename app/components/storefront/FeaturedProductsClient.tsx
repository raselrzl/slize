"use client";

import { useRef, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProductsClient({ data }: { data: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to handle scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // Check scroll position on mount and whenever resized
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

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
      {/* Left button — only show if scrollable left */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="flex absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 
          transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

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

      {/* Right button — only show if scrollable right */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="flex absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 
          transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
