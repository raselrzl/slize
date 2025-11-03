import { checkOut, delItem } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Info, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { redirect } from "next/navigation";

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

  return (
    <div className="max-w-7xl mx-auto mt-10 min-h-[55vh]">
      <p className="text-gray-900 text-2xl font-bold mb-4 ml-2">Your bag</p>
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-gray-800" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any products in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>

          <Button asChild variant="destructive">
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-2">
          <div className="grid grid-cols-1 gap-y-1">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex border border-gray-950/10 p-4">
                <div className="w-20 h-24 relative">
                  <Image
                    className="rounded-md object-contain"
                    fill
                    src={item.imageString}
                    alt="Product image"
                  />
                </div>
                <div className="ml-5 flex justify-between w-full font-medium text-gray-800">
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs items-center justify-center">
                      Item Price:
                      <span className="text-lg font-bold px-2">
                        {item.price}.00
                      </span>
                      kr
                    </p>
                  </div>
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-x-2">
                      <p>
                        {item.quantity} <span className="font-bold">x</span>
                      </p>
                      <p>{item.price}.00 kr</p>
                    </div>

                    <form action={delItem} className="text-end">
                      <input type="hidden" name="productId" value={item.id} />
                      <DeleteItem />
                    </form>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-sm flex justify-center items-center py-4">
              {" "}
              <Info />
              Items placed in this bag are not reserved.
            </p>
          </div>
          <div className="md:sticky md:top-24 flex justify-center ">
            <div className="bg-gray-200 rounded-none w-[300px] h-[300px] shadow-md mb-4">
              <div className="flex items-center text-gray-800 justify-between bg-gray-200 p-3">
                <p>Subtotal:</p>
                <p>{new Intl.NumberFormat("en-US").format(totalPrice)}.00 kr</p>
              </div>

              <div className="flex items-center text-gray-800 justify-between border-b border-gray-950/10 bg-gray-200 p-3">
                <p>Delivery:</p>
                <p>0.00 kr</p>
              </div>

              <div className="flex items-center text-md font-bold text-gray-800 justify-between bg-gray-200 p-3">
                <p className="">Total:</p>
                <p>{new Intl.NumberFormat("en-US").format(totalPrice)}.00 kr</p>
              </div>

              <div className="p-3 flex flex-col gap-3">
                <form action={checkOut}>
                  <ChceckoutButton />
                </form>

                <div className="flex flex-wrap gap-2 justify-center p-2">
                  {["ax.png", "mastercard.png", "visa.png"].map((src, i) => (
                    <img
                      key={i}
                      src={`/payments/${src}`}
                      alt={src}
                      className="h-8 w-20 shadow-md object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
