// app/categories/[name]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPageLoading() {
  return (
    <section className="w-full">
      {/* Top Banner (CategoryRenderer Placeholder) */}
      <div className="w-full bg-gray-200 dark:bg-gray-800 animate-pulse">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6">
          <div className="flex flex-col gap-3 md:w-1/2 w-full">
            <Skeleton className="h-10 w-10 bg-gray-400 dark:bg-gray-700 rounded-none" />
            <Skeleton className="h-6 w-3/4 md:w-2/3 bg-gray-400 dark:bg-gray-700 rounded-none" />
            <Skeleton className="h-4 w-full bg-gray-400 dark:bg-gray-700 rounded-none" />
            <Skeleton className="h-4 w-5/6 bg-gray-400 dark:bg-gray-700 rounded-none" />
          </div>

          <div className="relative w-full md:w-[600px] h-[200px] md:h-[300px]">
            <Skeleton className="w-full h-full bg-gray-400 dark:bg-gray-700 rounded-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-2 md:px-0 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="pb-2 flex flex-col items-center justify-between bg-white border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Image Placeholder */}
              <Skeleton className="w-full h-[200px] md:h-[300px] bg-gray-300 dark:bg-gray-700 rounded-none" />

              {/* Name + Price */}
              <div className="w-full px-2 py-2 flex flex-col gap-2">
                <Skeleton className="h-4 w-[90%] md:w-3/4 bg-gray-300 dark:bg-gray-700 rounded-none" />
                <Skeleton className="h-3 w-[70%] md:w-1/2 bg-gray-300 dark:bg-gray-700 rounded-none" />
              </div>

              {/* Description Line */}
              <Skeleton className="h-3 w-[85%] md:w-2/3 mb-2 bg-gray-300 dark:bg-gray-700 rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
