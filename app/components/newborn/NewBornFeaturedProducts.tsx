import prisma from "@/app/lib/db";
import { Suspense } from "react";
import { NewbornFeaturedProductsClient } from "./NewBornFeaturedProductsClient";
import { LoadingProductCard } from "../storefront/ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
      category:"baby",
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

export async function NewBornFeaturedProducts() {
  const data = await getData();

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-0 ">
      <Suspense fallback={<LoadingRows />}>
        <NewbornFeaturedProductsClient data={data} />
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
