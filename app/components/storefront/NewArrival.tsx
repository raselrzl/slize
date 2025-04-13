// components/NewArrival.tsx
import { ArrowBigRightDash, FileQuestionIcon, Info, InfoIcon, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import React from "react";
import InfoAlert from "./infoAlert";

const NewArrival = () => {
  return (
    <div className="flex flex-wrap gap-4 bg-red-800 text-white w-full max-w-screen-xl mx-auto px-4 py-8 mt-2">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4">
        <div className="flex-1 w-full h-[250px] my-2 flex items-center justify-center">
          <div>
            
            <InfoAlert />
            <p className="text-xl md:text-2xl font-extrabold text-white">
              Keep eyes on new arrival
            </p>
            <p className="text-sm">
              Let their style shine as bright as their imagination.
            </p>
            <div className="font-bold flex items-center mt-2">
              <Link href="/products/all" className="flex items-center gap-2">
                Shop now <ArrowBigRightDash />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-[250px] my-2 bg-white rounded-md shadow-md overflow-hidden">
          <img
            src="/homepage.png"
            alt="Homepage"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
