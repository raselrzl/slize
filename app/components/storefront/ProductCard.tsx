"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    discount: number | null;
    inputPrice: number | null;
  };
}

export function ProductCard({ item }: iAppProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = item.images.length;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div
      className="pb-2 px-0 group relative flex flex-col items-center justify-between 
        bg-white border border-gray-200 overflow-hidden shadow-sm 
        transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
    >
      <div className="relative w-full">
        <Carousel className="w-full mx-auto p-0" setApi={setApi}>
          <CarouselContent className="p-0">
            {item.images.map((img, index) => (
              <CarouselItem key={index} className="p-0">
                <div className="relative w-full h-[250px] md:h-[320px] overflow-hidden">
                  <Image
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    placeholder="blur"
                    blurDataURL="/placeholder.webp"
                    quality={75}
                    priority={index === 0}
                    unoptimized={false}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Dots inside image bottom */}
        {totalSlides > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1 bg-black/40 px-1 py-0.5 rounded-full backdrop-blur-sm">
            {item.images.map((_, index) => (
              <button
                key={index}
                onClick={() => api && api.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-white scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Link
        href={`/product/${item.id}`}
        className="inline text-left p-2 rounded-md hover:bg-gray-50 transition w-full"
      >
        <div className="flex justify-between items-center mt-1">
          <h1 className="font-semibold md:text-md text-sm line-clamp-1 text-gray-950">
            {item.name}
          </h1>
        </div>

        <p className="mt-1 text-sm">
          {item.discount && item.discount > 0 ? (
            <>
              <span className="font-semibold text-green-600">
                {item.price} kr
              </span>
              <span className="ml-1 line-through text-gray-400">
                {item.inputPrice} kr
              </span>
              {item.inputPrice && item.discount ? (
                <span className="ml-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  -{Math.round((item.discount / item.inputPrice) * 100)}%
                </span>
              ) : null}
            </>
          ) : (
            <span className="font-semibold text-green-700">
              {item.price} kr
            </span>
          )}
        </p>

        <div className="flex flex-row items-center mt-1">
          <p className="text-gray-600 text-xs line-clamp-1">
            {item.description}
          </p>
          <div className="ml-auto pl-2 font-medium text-gray-900">
            <ChevronRight size={16} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
