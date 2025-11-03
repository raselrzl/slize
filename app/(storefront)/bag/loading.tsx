import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBag() {
  return (
    <div className="max-w-7xl mx-auto mt-10 min-h-[55vh] px-4">
      <p className="text-gray-900 text-2xl font-bold mb-4 ml-2">Your bag</p>

      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-2">
        {/* Left Side (Items) */}
        <div className="grid grid-cols-1 gap-y-2">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex border border-gray-950/10 p-4 bg-gray-50"
            >
              <div className="w-20 h-24 relative">
                <Skeleton className="w-20 h-24 rounded-xs" />
              </div>

              <div className="ml-5 flex justify-between w-full font-medium text-gray-800">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32 rounded-xs" />
                  <Skeleton className="h-3 w-24 rounded-xs" />
                </div>
                <div className="flex flex-col justify-between items-end gap-2">
                  <Skeleton className="h-4 w-16 rounded-xs" />
                  <Skeleton className="h-8 w-20 rounded-xs" />
                </div>
              </div>
            </div>
          ))}

          <div className="text-sm flex justify-center items-center py-4 text-gray-500">
            <Skeleton className="h-4 w-60 rounded-xs" />
          </div>
        </div>

        {/* Right Side (Summary Box) */}
        <div className="md:sticky md:top-24 flex justify-center mt-14">
          <div className="bg-gray-100 w-[300px] h-[340px] shadow-md mb-4 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20 rounded-xs" />
                <Skeleton className="h-4 w-24 rounded-xs" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20 rounded-xs" />
                <Skeleton className="h-4 w-24 rounded-xs" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-5 w-20 rounded-xs" />
                <Skeleton className="h-5 w-24 rounded-xs" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Skeleton className="h-10 w-full rounded-xs" />
              <div className="flex gap-2 justify-center mt-2">
                <Skeleton className="h-8 w-20 rounded-xs" />
                <Skeleton className="h-8 w-20 rounded-xs" />
                <Skeleton className="h-8 w-20 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
