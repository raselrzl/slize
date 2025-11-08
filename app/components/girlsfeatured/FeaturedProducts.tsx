import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "../storefront/ProductCard";
import { Suspense } from "react";
import { FeaturedProductsClient } from "../storefront/FeaturedProductsClient";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
        category: {
        in: ["kidgirlsfourtofive", "toddlergirls"],
      },
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
      inputPrice: true,
      discount: true,
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
