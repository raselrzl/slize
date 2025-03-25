import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { MoveRight } from "lucide-react";
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
    <div className="pb-4 px-2 bg-[#f7f3f2]">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] md:h-[350px] w-full">
                <Image
                  src={item}
                  alt="Product Image"
                  width={100} // You can use a large value to allow the image to scale appropriately
                  height={100} // Same as above for scaling
                  className="object-contain w-full h-full py-10"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Link href={`/product/${item.id}`}>
        <div className="flex justify-between items-center mt-1">
          <h1 className="font-semibold text-md">{item.name}</h1>
          <h3 className="inline-flex items-center px-2 py-1 text-xs font-medium">
            ${item.price}
          </h3>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-gray-600 text-sm mt-1 line-clamp-1">
            {item.description}
          </p>

          <div className="ml-auto pl-2 font-bold">
            <MoveRight />
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
