// app/(dashboard)/dashboard/loading.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Dashboard Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border border-gray-400 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="h-4 w-24 bg-gray-300"></CardTitle>
              <div className="h-4 w-4 bg-gray-300"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-20 bg-gray-300 mb-2"></div>
              <div className="h-3 w-32 bg-gray-300"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        {/* Transactions Card */}
        <Card className="xl:col-span-2 border border-gray-400 rounded-none">
          <CardHeader>
            <CardTitle className="h-4 w-32 bg-gray-300"></CardTitle>
            <div className="h-3 w-48 bg-gray-200 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gray-200"></div>
          </CardContent>
        </Card>

        {/* Recent Sales Skeleton */}
        <Card className="border border-gray-400 rounded-none">
          <CardHeader>
            <CardTitle className="h-4 w-28 bg-gray-300"></CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b pb-2 border-gray-400"
              >
                <div className="h-9 w-9 bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-gray-300"></div>
                  <div className="h-3 w-32 bg-gray-200"></div>
                </div>
                <div className="h-4 w-10 bg-gray-300"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
