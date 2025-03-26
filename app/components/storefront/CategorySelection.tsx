import Image from "next/image";
import Link from "next/link";
import kids from "@/public/2.png";
import men from "@/public/k1.png";
import women from "@/public/4.png";
import { ArrowRight, ArrowRightFromLine, ArrowRightIcon } from "lucide-react";

export function CategoriesSelection() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-extrabold ">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-white hover:text-white/80 bg-red-800 px-4 py-2 rounded-2xl"
          href="/products/all"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-y-2 sm:grid-cols-2 sm:grid-rows-2 gap-x-2">
         <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:aspect-w-1 sm:row-span-2 rounded-md">
          <Image
            src={kids}
            alt="All Products Image"
            className="object-contain object-center"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="p-6 flex items-end">
            <Link href="/products/kids">
              <h3 className="text-white font-semibold flex flex-row">For Newborn<ArrowRightFromLine /></h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:relative sm:aspect-none sm:h-full rounded-md">
          <Image
            src={men}
            alt="Products for men Image"
            className="object-bottom object-contain sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/men">
              <h3 className="text-white font-semibold flex flex-row">For Boys<ArrowRightFromLine /></h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 overflow-hidden sm:relative sm:aspect-none sm:h-full rounded-md">
          <Image
            src={women}
            alt="Women product image"
            className="object-bottom object-contain sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0" />
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/women">
              <h3 className="text-white font-semibold flex flex-row">For Girls<ArrowRightFromLine /></h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
