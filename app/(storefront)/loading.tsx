// app/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoading() {
  return (
    <div className="animate-pulse">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-0 mt-6">
        {/* Header */}
        <div className="flex justify-between items-center my-6 pb-8">
          <Skeleton className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-none" />
          <Skeleton className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-none" />
        </div>

        {/* Scrollable Row (HeroOne banners) */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[180px] h-[180px] md:w-[300px] md:h-[300px] border border-gray-300 overflow-hidden"
            >
              <Skeleton className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-none" />
              <Skeleton className="w-full h-[40px] md:h-[60px] bg-gray-400 dark:bg-gray-600 rounded-none" />
            </div>
          ))}
        </div>
      </div>

      {/* EXCLUSIVE PRODUCT BANNER */}
      <div className="bg-[#2A1F14] py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-6 px-4">
          {/* Left Text Section */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <Skeleton className="h-10 w-10 bg-gray-500 rounded-none" />
            <Skeleton className="h-8 w-3/4 bg-gray-400 rounded-none" />
            <Skeleton className="h-4 w-full bg-gray-400 rounded-none" />
            <Skeleton className="h-4 w-2/3 bg-gray-400 rounded-none" />
            <Skeleton className="h-10 w-40 bg-yellow-600 rounded-none" />
          </div>

          {/* Right Image */}
          <Skeleton className="w-full md:w-[600px] h-[300px] bg-gray-500 rounded-none" />
        </div>
      </div>

      {/* GIRLS FEATURED PRODUCTS */}
      <div className="bg-[#8e6b48] py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between bg-white border border-gray-200"
            >
              <Skeleton className="w-full h-[220px] md:h-[320px] bg-gray-300 dark:bg-gray-700 rounded-none" />
              <div className="w-full px-2 py-2 flex flex-col gap-2">
                <Skeleton className="h-4 w-full md:w-3/4 bg-gray-300 rounded-none" />
                <Skeleton className="h-3 w-5/6 md:w-1/2 bg-gray-300 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOYS EXCLUSIVE BANNER */}
      <div className="py-6">
        <Skeleton className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded-none" />
      </div>

      {/* BOYS FEATURED PRODUCTS */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between bg-white border border-gray-200"
            >
              <Skeleton className="w-full h-[220px] md:h-[320px] bg-gray-300 dark:bg-gray-700 rounded-none" />
              <div className="w-full px-2 py-2 flex flex-col gap-2">
                <Skeleton className="h-4 w-full md:w-3/4 bg-gray-300 rounded-none" />
                <Skeleton className="h-3 w-5/6 md:w-1/2 bg-gray-300 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BABY FEATURED BANNER */}
      <div className="bg-teal-900 py-6 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <Skeleton className="w-full h-[280px] bg-gray-400 dark:bg-gray-700 rounded-none" />
        </div>
      </div>

      {/* NEWBORN FEATURED PRODUCTS */}
      <div className="bg-teal-50 py-6 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between bg-white border border-gray-200"
              >
                <Skeleton className="w-full h-[220px] md:h-[300px] bg-gray-300 dark:bg-gray-700 rounded-none" />
                <div className="w-full px-2 py-2 flex flex-col gap-2">
                  <Skeleton className="h-4 w-full md:w-3/4 bg-gray-300 rounded-none" />
                  <Skeleton className="h-3 w-5/6 md:w-1/2 bg-gray-300 rounded-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
