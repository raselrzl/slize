"use client";
import { ArrowDownRightFromSquare, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ModelAlbum() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkOverflow = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="bg-teal-300 p-4 flex justify-center items-center mb-4">
        <div className="relative">
          {/* Left Arrow */}
          {showLeft && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 shadow p-2 z-10 rounded-full"
              onClick={() => scroll("left")}
            >
              <ArrowLeft />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="relative flex space-x-4 overflow-x-auto overflow-y-hidden px-4 scrollbar-hide"
            onScroll={checkOverflow}
          >
            <img
              src="/blackfriday.jpg"
              alt="Image 1"
              className="w-[150px] h-[150px] object-cover transform rotate-2 border-4 border-b-8 border-white m-4"
            />
            <img
              src="/summer.jpg"
              alt="Image 2"
              className="w-[150px] h-[150px] object-cover transform -rotate-6 border-4 border-t-8 border-white m-4"
            />
            <img
              src="/summer.jpg"
              alt="Image 2"
              className="w-[150px] h-[150px] object-cover transform rotate-6 border-4 border-t-8 border-white m-4"
            />
            <img
              src="/3.jpg"
              alt="Image 3"
              className="w-[150px] h-[150px] object-cover transform rotate-4 border-4 border-r-8 border-white m-4"
            />
            <img
              src="/summer.jpg"
              alt="Image 2"
              className="w-[150px] h-[150px] object-cover transform rotate-6 border-4 border-t-8 border-white m-4"
            />
          </div>

          {/* Right Arrow */}
          {showRight && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 shadow p-2 z-10 rounded-full"
              onClick={() => scroll("right")}
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
