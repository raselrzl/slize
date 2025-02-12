import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
  return (
    <div>
      <Skeleton className="h-10 w-56 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
