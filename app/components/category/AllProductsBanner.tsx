"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function AllProductsBanner() {
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
    <div className="bg-gray-900 relative ">
    {/*   <div className=" p-4 max-w-7xl mx-auto flex justify-center items-center rounded-lg relative overflow-hidden">
        <div className="relative w-full">
          {showLeft && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 shadow p-2 z-20 bg-white/80 hover:bg-white rounded-full md:hidden"
              onClick={() => scroll("left")}
            >
              <ArrowLeft />
            </button>
          )}

          <div
            ref={scrollRef}
            className="relative flex md:grid md:grid-cols-5 space-x-4 md:space-x-0 overflow-x-auto md:overflow-visible overflow-y-hidden px-4 scroll-smooth hide-scrollbar"
            onScroll={checkOverflow}
          >
            {[
              "/exclusive-product.png",
              "/exclusivebanner.png",
              "/featuredproductallboys.jpg",
              "/kids1.png",
              "/bottomPicture.png",
            ].map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 md:flex-shrink md:w-auto flex justify-center"
              >
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="w-[150px] h-[150px] md:w-full md:h-[180px] object-cover transform border-4 border-white shadow-md"
                  style={{
                    transform:
                      index % 2 === 0
                        ? "rotate(4deg)"
                        : index % 3 === 0
                        ? "-rotate-4deg"
                        : "rotate(-3deg)",
                  }}
                />
              </div>
            ))}
          </div>

              {showRight && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 shadow p-2 z-20 bg-white/80 hover:bg-white rounded-full md:hidden"
              onClick={() => scroll("right")}
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </div> */}

      <style jsx>{`
        /* Hide scrollbar for all browsers */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
