import { addItem, addToFavorite, deleteFromFavorite } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/girlsfeatured/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import {
  FileQuestion,
  Heart,
  RouterIcon,
  ShoppingBag,
  StarIcon,
  Undo2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { BoysFeaturedProducts } from "@/app/components/boysfeatured/BoysFeaturedProducts";
import { NewBornFeaturedProducts } from "@/app/components/newborn/NewBornFeaturedProducts";
import AuthAddToBag from "./AuthAddToBag";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      discount: true,
      inputPrice: true,
      images: true,
      available: true,
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

async function getFavorite(productId: string, userId: string) {
  return await prisma.favorite.findFirst({
    where: {
      productId,
      userId,
    },
  });
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

  const favorite = user ? await getFavorite(data.id, user.id) : null;

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6 border-b border-gray-900/10">
        <ImageSlider images={data.images} />
        <div className="px-4">
          <div className="flex">
            {user && (
              <form
                action={favorite ? deleteFromFavorite : addToFavorite}
                className="inline-block"
              >
                {favorite ? (
                  <input type="hidden" name="favoriteId" value={favorite.id} />
                ) : (
                  <>
                    <input type="hidden" name="productId" value={data.id} />
                    <input type="hidden" name="userId" value={user.id} />
                  </>
                )}
                <input
                  type="hidden"
                  name="pathName"
                  value={`/product/${data.id}`}
                />
                <button>
                  <Heart
                    className={`w-4 h-4 ${
                      favorite ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                </button>
              </form>
            )}

            <h1 className="text-2xl font-bold tracking-tight border-b border-gray-700 uppercase inline-block">
              {data.name}
            </h1>
          </div>
          <p className="text-sm text-gray-700 mt-6">{data.description}</p>
          <p className="text-xl mt-2 font-bold">
            {data.discount && data.discount > 0 ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  kr {data.inputPrice ?? data.price}.00
                </span>
                <span className="text-green-600">kr {data.price}.00</span>
              </>
            ) : (
              <>kr {data.price}.00</>
            )}
            <span className="text-xs ml-2 text-gray-500">(VAT included)</span>
            {data.inputPrice && data.discount ? (
              <span className="ml-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                -{Math.round((data.discount / data.inputPrice) * 100)}%
              </span>
            ) : null}
          </p>

          <p className="text-sm text-gray-500 mt-6">Free delivery over 8 kr</p>
          <p className="text-sm text-green-600 font-semibold mt-1">
            {data.available > 0 ? `${data.available} in stock` : "Out of stock"}
          </p>

          {user ? (
            <form action={addProducttoShoppingCart} className="w-full">
              <ShoppingBagButton />
            </form>
          ) : (
            <AuthAddToBag productId={data.id} />
          )}

          {user ? (
            <form action={addToFavorite}>
              <input type="hidden" name="productId" value={data.id} />
              <input type="hidden" name="userId" value={user.id} />
              <input
                type="hidden"
                name="pathName"
                value={`/product/${data.id}`}
              />
              <button>
                <Heart className="w-4 h-4" />
              </button>
            </form>
          ) : null}

          <p className="mt-8 text-center bg-gray-200 py-2 flex items-center justify-center gap-4 text-xs font-bold">
            {" "}
            <Undo2 />
            30s day return policy
          </p>

          {/* <form action={addProducttoShoppingCart}>
            <ShoppingBagButton />
          </form> */}
        </div>
      </div>

      <div className="mt-16 max-w-7xl mx-auto ">
        <div className="flex justify-between items-center my-6 pb-8 px-2 md:px-0">
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
    </>
  );
}
