"use client";

import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileQuestion,
  MoveLeft,
  MoveRight,
} from "lucide-react";

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
    "bg-pink-800",
    "bg-blue-800",
    "bg-green-800",
    "bg-yellow-800",
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
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center my-6">
        <h1 className="font-bold text-xl text-gray-700 leading-tight">
          Don’t Miss Out <br />
          Boys, Girls and Babies
        </h1>
        <FileQuestion className="w-6 h-6 text-gray-700" />
      </div>

      {/* Scrollable row */}
      <div className="relative">
        {/* Scrollable banners */}
        <div
          ref={scrollRef}
          className="
    flex md:grid md:grid-cols-4
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
            <div
              key={item.id}
              className="
                relative
                flex-shrink-0
                w-[180px] h-[180px]
                md:w-[300px] md:h-[300px]
                border border-gray-300
                overflow-hidden
                snap-start
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
                  text-white text-sm font-semibold
                  ${footerColors[i % footerColors.length]}
                `}
              >
                {item.title || "Untitled"}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll buttons (only visible on mobile) */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount("left")}
            className="absolute items-center left-2 top-1/3 -translate-y-1/2 pl-2 bg-black text-white shadow-md md:hidden h-8 w-10"
          >
            <MoveLeft />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount("right")}
            className="absolute items-center right-2 top-1/3 -translate-y-1/2 pl-2 bg-black text-white shadow-md md:hidden h-8 w-10"
          >
            <MoveRight />
          </button>
        )}
      </div>
    </div>
  );
}
