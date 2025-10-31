import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

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
    take: 6,
  });

  return data;
}

export function FeaturedProducts() {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-0">
      <div className="flex justify-between items-center px-2 md:px-0">
        <h2 className="text-xl md:text-2xl font-extrabold ">Featured Items</h2>

        <Link
          className="text-sm font-semibold text-white hover:text-white/80 bg-red-800 px-4 py-2 rounded-2xl"
          href="/products/all"
        >
          View all &rarr;
        </Link>
      </div>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedproducts />
      </Suspense>
    </div>
  );
}

async function LoadFeaturedproducts() {
  noStore();
  const data = await getData();

  return (
    <>
      

      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 px-0 sm:px-6 lg:px-0">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
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
