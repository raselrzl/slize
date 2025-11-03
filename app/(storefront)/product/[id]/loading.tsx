// app/products/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoadingRoute() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-1">
      {/* Left: Image Slider */}
      <div className="animate-pulse flex flex-col gap-1">
        {/* Main Image */}
        <Skeleton className="w-full h-[400px] bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* Thumbnails */}
        <div className="flex gap-1 mt-1 overflow-x-auto">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="w-[60px] h-[60px] bg-gray-300 dark:bg-gray-700 flex-shrink-0 rounded-none"
              />
            ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="p-1 flex flex-col gap-1 animate-pulse">
        {/* Product Name */}
        <Skeleton className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* Description */}
        <Skeleton className="w-full h-20 mt-1 bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* Price */}
        <Skeleton className="w-32 h-6 mt-1 bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* VAT text */}
        <Skeleton className="w-24 h-4 mt-1 bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* Delivery info */}
        <Skeleton className="w-40 h-4 mt-1 bg-gray-300 dark:bg-gray-700 rounded-none" />

        {/* Add to cart / login button */}
        <Skeleton className="w-full h-10 mt-1 bg-gray-300 dark:bg-gray-700 rounded-none" />
      </div>

      {/* Featured Products */}
      <div className="md:col-span-2 mt-4 animate-pulse">
        <Skeleton className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-none" />
      </div>
    </div>
  );
}
