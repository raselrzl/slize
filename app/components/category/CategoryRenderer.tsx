"use client";

import { BabyProduct } from "./BabyProduct";
import { ExclusiveProduct } from "./ExclusiveProduct";


interface Props {
  category: string;
}

export function CategoryRenderer({ category }: Props) {
  switch (category.toLowerCase()) {
    case "exclusive":
      return <ExclusiveProduct />;

    case "baby":
      return <BabyProduct />;

    default:
      return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold">Category Not Found</h2>
          <p>No products available for this category.</p>
        </div>
      );
  }
}
