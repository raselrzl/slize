"use client";

import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  FileQuestion,
  MoveLeft,
  MoveRight,
} from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 md:px-0 mt-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center my-6 pb-8">
        <h1 className="font-bold text-2xl text-gray-800 mt-4 leading-tight">
          Don’t Miss Out <br />
          Boys, Girls and Babies
        </h1>
        <FileQuestion className="w-10 h-10 text-yellow-500" />
      </div>

      {/* Scrollable row */}
      <div className="relative">
        {/* Scrollable grid */}
        <div
          ref={scrollRef}
          className="
      grid grid-flow-col auto-cols-[180px] md:auto-cols-[300px]
      gap-4
      overflow-x-auto
      pb-4
      scroll-smooth
      snap-x snap-mandatory
      [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
    "
        >
          {data.map((item, i) => (
            <Link key={item.id} href={links[i] || "#"}>
              <div
                className="
            relative
            w-full h-[180px] md:h-[300px]
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
                <div
                  className={`absolute bottom-0 left-0 w-full h-[40px] md:h-[60px] flex items-center justify-center text-black text-sm font-semibold ${
                    footerColors[i % footerColors.length]
                  }`}
                >
                  {item.title || "Untitled"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white shadow p-2 rounded-full z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
