"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronLast, ChevronLeft, ChevronRight, FileQuestion, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

type Banner = {
  id: string;
  title: string;
  imageString: string;
  createdAt: Date;
};

export function HeroOneClient({ data }: { data: Banner[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const footerColors = [
    
    "bg-yellow-600",
    "bg-pink-400",
    "bg-gray-400",
    "bg-green-600",
    "bg-teal-600",
  ];

  const links = [
    "/products/baby",
    "/products/toddlergirls",
    "/products/toddlerboys",
    "/products/kidgirlsfourtofive",
    "/products/kidboysfourtofive",
  ];

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center my-6 pb-8">
        <h1 className="font-bold text-2xl text-gray-800 mt-4 leading-tight">
          Don’t Miss Out <br />
          Boys, Girls and Babies
        </h1>
        <FileQuestion className="w-6 h-6 text-gray-800" />
      </div>

      {/* Scrollable row */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="
            flex
            gap-4
            overflow-x-auto md:overflow-visible
            pb-4
            scroll-smooth
            snap-x snap-mandatory
            [scrollbar-width:none] 
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {data.map((item, i) => (
            <Link key={item.id} href={links[i] || "#"}>
              <div
                className="
                  relative
                  flex-shrink-0
                  w-[180px] h-[180px]
                  md:w-[300px] md:h-[300px]
                  border border-gray-300
                  overflow-hidden
                  snap-start
                  cursor-pointer
                  hover:scale-105
                  transition-transform duration-200
                "
              >
                <img
                  src={item.imageString}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Footer bar */}
                <div
                  className={`
                    absolute bottom-0 left-0
                    w-full h-[40px] md:h-[60px]
                    flex items-center justify-center
                    text-black text-sm font-semibold
                    ${footerColors[i % footerColors.length]}
                  `}
                >
                  {item.title || "Untitled"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll buttons (mobile only) */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount("left")}
         className="flex absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 
          transition-all duration-200"  >
           <ChevronLeft className="h-4 w-4"/>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount("right")}
         className="flex absolute right-0 top-1/3 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10 
          transition-all duration-200" >
            <ChevronRight className="h-4 w-4"/>
          </button>
        )}
      </div>
    </div>
  );
}
