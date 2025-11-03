// components/NewArrival.tsx
import {
  ArrowBigRightDash,
  FileQuestion,
  FileQuestionIcon,
  Info,
  InfoIcon,
  MessageCircleQuestion,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import InfoAlert from "./infoAlert";

const BabyFeaturedHomePageBanner = () => {
  return (
    <div className="flex flex-wrap gap-4 bg-red-800 text-white w-full max-w-screen-xl mx-auto px-4 py-8 mt-2">
      <Link href="/products/exclusivebaby" className="flex flex-col md:flex-row w-full max-w-6xl gap-4">
        <div className="flex-1 w-full h-[250px] my-2 flex items-center justify-center g">
          <div className="">
            <FileQuestion className="w-10 h-10 text-yellow-300 mb-8" />
            <p className="text-xl md:text-2xl font-extrabold text-white">
              Discover Our Newborn Exclusive Collection
            </p>
            <p className="text-sm">
              Gentle, cozy, and crafted with love – perfect for your little
              bundle of joy.
            </p>
            <div className="mt-8 inline-block bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors">
              <p className="flex items-center gap-2">
                Shop now <ArrowBigRightDash />
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-[250px] my-2 bg-red-800 overflow-hidden flex gap-1 px-1">
          <div className="w-1/3 h-full flex items-center justify-center">
            <img
              src="/newaraival/n1.png"
              alt="n1"
              className="w-full h-[90%] object-cover shadow opacity-2 border-8 border-gray-200"
            />
          </div>
          <div className="w-1/3 h-full flex items-end justify-center">
            <img
              src="/newaraival/n3.jpg"
              alt="n3"
              className="w-full h-[80%] object-cover shadow opacity-1 border-8 border-gray-200"
            />
          </div>
          <div className="w-1/3 h-full flex items-start justify-center">
            <img
              src="/newaraival/n2.png"
              alt="n2"
              className="w-full h-[85%] object-cover shadow border-8 border-gray-200"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BabyFeaturedHomePageBanner;
