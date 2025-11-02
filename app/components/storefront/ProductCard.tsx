import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, MoveRight, SquareChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div
      className="pb-2 px-1 group relative flex flex-col items-center justify-between 
        bg-white border border-gray-200
        overflow-hidden shadow-sm transition-all duration-300 
        hover:shadow-xl hover:-translate-y-2"
    >
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[250px] md:h-[320px] flex items-center justify-center">
                <Image
                  src={item}
                  alt="Product Image"
                  width={320}
                  height={320}
                  className="object-contain max-h-full w-auto"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Link href={`/product/${item.id}`} className="">
        <div className="flex justify-between items-center mt-1">
          <h1 className="font-semibold text-md line-clamp-1">{item.name}</h1>
          <h3 className="inline-flex items-center px-2 py-1 text-xs font-medium">
            {item.price}kr
          </h3>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-gray-600 text-sm mt-1 line-clamp-1">
            {item.description}
          </p>

          <div className="ml-auto pl-2 font-medium">
            <ChevronRight />
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
