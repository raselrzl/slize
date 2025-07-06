"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // Importing motion from framer-motion
import { ChevronsUpDown } from "lucide-react";

interface iAppPop {
  heading: string;
  details: string;
}

export default function FaqCard({ heading, details }: iAppPop) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-pink-900 p-4 rounded-md shadow-md mb-4">
      <div className="flex flex-col w-full">
        <h3
          className="flex justify-between items-center text-xl font-semibold text-white cursor-pointer"
          onClick={toggleExpansion}
        >
          <span>{heading}</span>
          <ChevronsUpDown className={`h-4 w-4 text-white ${isExpanded ? "rotate-180" : ""}`} />
        </h3>

        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{
            maxHeight: isExpanded ? "2000px" : "0px",  opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }} 
        >
          <p className="text-gray-300 mt-2">{details}</p>
        </motion.div>
      </div>
    </div>
  );
}
