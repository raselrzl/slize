"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative flex items-center justify-center overflow-hidden">
        <Image
          width={300}
          height={300}
          src={images[mainImageIndex]}
          alt="Product image"
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviousClick} variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6 hover:bg-red-200" />
          </Button>
          <Button onClick={handleNextClick} variant="ghost" size="icon">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex mx-auto gap-2 mt-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={cn(
              "flex items-center justify-center cursor-pointer",
              index === mainImageIndex
                ? "border-2 border-gray-700 p-1"
                : "border border-gray-200 p-1"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={50}
              height={50}
              className="object-cover w-[50px] h-[50px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
