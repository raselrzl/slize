import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });



  return data;
}

export async function Hero() {
  const data = await getData();

  return (
    <Carousel className="bg-[#F9C6D3] w-full max-w-7xl mx-auto mb-4">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[40vh] md:h-[40vh]">
              <Image
                alt="Banner Image"
                src={item.imageString}
                fill
                className="object-contain w-full h-full rounded-md"
              />
              <div className="absolute top-2 left-0 bg-opacity-75 px-6 py-2 shadow-lg rounded-tr-2xl rounded-br-2xl transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-4xl font-bold ">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
