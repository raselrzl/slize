import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="rounded-lg shadow-xl pb-4 px-2">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[150px] md:h-[250px]">
              <Image
  src={item}
  alt="Product Image"
  layout="responsive"
  width={100}
  height={100}
  className="pt-10 md:mb-5 transform transition-transform duration-500 hover:scale-105"
/>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" /> */}
      </Carousel>

      <div className="flex justify-between items-center mt-1">
        <h1 className="font-semibold text-md">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-1 line-clamp-1">
        {item.description}
      </p>

      <Button variant="destructive" asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
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
