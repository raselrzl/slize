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

import { ShoppingBag, StarIcon } from "lucide-react";
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
  const buttonClass =
  "w-full mt-5 bg-black text-white rounded-none hover:bg-gray-800";

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight border-b border-gray-700 uppercase inline-block">
            {data.name}
          </h1>
          <p className="text-sm text-gray-700 mt-6">{data.description}</p>
          <p className="text-xl mt-2 font-bold">
            kr {data.price}.00
            <span className="text-xs ml-2 text-gray-500">(VAT included)</span>
          </p>
          <p className="text-sm text-gray-500 mt-6">Free delivery over 8 kr</p>
          {user ? (
  // Logged in
  <form action={addProducttoShoppingCart} className="w-full">
    <ShoppingBagButton />
  </form>
) : (
  // Not logged in
  <div className="w-full">
    <Button
      asChild
      size="lg"
      className={buttonClass}
    >
      <LoginLink postLoginRedirectURL={`/product/${data.id}`}>
        <ShoppingBag className="mr-4 h-5 w-5" /> Add to Bag
      </LoginLink>
    </Button>
  </div>
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
