import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import Link from "next/link";
import { FeaturedProductsClient } from "./FeaturedProductsClient";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return data;
}

export async function FeaturedProducts() {
  const data = await getData();

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-0 ">
{/*       <div className="flex justify-between items-center px-2 md:px-0">
        <h2 className="text-xl md:text-2xl font-extrabold">Featured Items</h2>

        <Link
            href="/products/all"
            className="mt-2 inline-block bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors"
          >
            Explore Now
          </Link>
      </div> */}

      <Suspense fallback={<LoadingRows />}>
        <FeaturedProductsClient data={data} />
      </Suspense>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
