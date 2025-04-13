// components/NewArrival.tsx
import React from 'react';

const NewArrival = () => {
  return (
    <div className="flex flex-wrap gap-4 bg-red-800 text-white w-full max-w-screen-xl mx-auto px-4 py-8 mt-2">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4">
        <div className="flex-1 w-full h-[250px] my-2 flex items-center justify-center">
          <p className="text-xl md:text-2xl font-extrabold border-2 p-4 text-center text-white">
            Keep eyes on new arrival
          </p>
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
