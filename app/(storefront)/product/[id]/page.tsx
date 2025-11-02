import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/girlsfeatured/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  noStore();
  const params = await paramsPromise;
  const data = await getData(params.id);
  const addProducttoShoppingCart = addItem.bind(null, data.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 max-w-7xl">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-red-800">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-red-800">{data.price} kr</p>
          {/* <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div> */}
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          {user ? (
            <>
              {/* If user is logged in, show the form with the button */}
              <form action={addProducttoShoppingCart}>
                <ShoppingBagButton />
              </form>
            </>
          ) : (
            <>
              {/* If no user, show the LoginLink*/}
              <div className="w-full mt-5">
                <Button variant="destructive" size="lg" className="w-full">
                  <LoginLink>Login to Add items to Cart</LoginLink>
                </Button>
              </div>
            </>
          )}

          {/* <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form> */}
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
