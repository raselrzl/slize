import Link from "next/link";
import { ArrowRightFromLine, ArrowRightIcon } from "lucide-react";

export function CategoriesSelection() {
  return (
    <div className="mt-2 px-4 md:px-0 md:mt-0 max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-6 px-2">
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
      <div className="w-full h-[40vh] flex flex-col md:flex-row gap-4">
        {/* Left Div */}
        <div className="w-full md:w-1/2 h-full relative rounded-xl overflow-hidden shadow-lg shadow-black/10">
          <div
            className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-90 bg-teal-50"
            style={{ backgroundImage: "url('/2.png')" }}
          ></div>
          <div className="absolute inset-0 rounded-xl" />
          <div className="relative z-10 flex items-end h-full p-4">
            <Link href="/products/kids">
              <h3 className="font-semibold flex items-center gap-2">
                For Newborn
                <ArrowRightFromLine />
              </h3>
              <p className="mt-1 text-sm">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Right Div */}
        <div className="w-full md:w-1/2 h-full flex flex-col gap-4">
          {/* Top Right */}
          <div className="h-1/2 relative rounded-xl overflow-hidden shadow-lg shadow-black/10">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-90 bg-teal-50"
              style={{ backgroundImage: "url('/k1.png')" }}
            ></div>
            <div className="absolute inset-0 rounded-xl" />
            <div className="relative z-10 flex items-end h-full p-4">
              <Link href="/products/men">
                <h3 className="font-semibold flex items-center gap-2">
                  For Boys
                  <ArrowRightFromLine />
                </h3>
                <p className="mt-1 text-sm">Shop Now</p>
              </Link>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="h-1/2 relative rounded-xl overflow-hidden shadow-lg shadow-black/10">
            <div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-90 bg-teal-50"
              style={{ backgroundImage: "url('/4.png')" }}
            ></div>
            <div className="absolute inset-0 rounded-xl" />
            <div className="relative z-10 flex items-end h-full p-4">
              <Link href="/products/women">
                <h3 className="font-semibold flex items-center gap-2">
                  For Girls
                  <ArrowRightFromLine />
                </h3>
                <p className="mt-1 text-sm">Shop Now</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
