import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.webp";
import men from "@/public/men.jpg";
import women from "@/public/women.avif";

export function CategoriesSelection() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-extrabold ">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80 bg-[rgb(247,247,247)] px-4 py-2 rounded-2xl"
          href="/products/all"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-2 lg:gap-4">
         <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:aspect-w-1 sm:row-span-2 rounded-md">
          <Image
            src={all}
            alt="All Products Image"
            className="object-cover object-center "
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href="/products/all">
              <h3 className="text-white font-semibold">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:relative sm:aspect-none sm:h-full rounded-md">
          <Image
            src={men}
            alt="Products for men Image"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/men">
              <h3 className="text-white font-semibold">Products for Men</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:relative sm:aspect-none sm:h-full rounded-md">
          <Image
            src={women}
            alt="Women product image"
            className="object-bottom object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/women">
              <h3 className="text-white font-semibold">Products for Women</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
