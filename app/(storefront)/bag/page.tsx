import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import BagClient from "./BagClient";
import { FeaturedProducts } from "@/app/components/girlsfeatured/FeaturedProducts";
import { FileQuestion } from "lucide-react";
import { BoysFeaturedProducts } from "@/app/components/boysfeatured/BoysFeaturedProducts";
import { NewBornFeaturedProducts } from "@/app/components/newborn/NewBornFeaturedProducts";

export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;
  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  const deliveryFee = totalPrice >= 8 ? 0 : 4;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto mt-10 min-h-[55vh]">
      <BagClient
        cart={cart}
        totalPrice={totalPrice}
        deliveryFee={deliveryFee}
        finalTotal={finalTotal}
      />
       <div className="flex justify-between items-center my-6 pb-8">
        <h1 className="font-bold text-2xl text-gray-800 mt-4 leading-tight">
          Don’t Miss Out <br />
          Boys, Girls and Babies
        </h1>
        <FileQuestion className="w-10 h-10 text-yellow-500" />
      </div>
      
      <BoysFeaturedProducts />
      <FeaturedProducts />
      <NewBornFeaturedProducts />
    </div>
  );
}
