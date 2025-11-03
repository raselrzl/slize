"use client";

import { AlertCircle } from "lucide-react";
import { ExclusiveGirlsProduct} from "./ExclusiveGirlsProduct";
import { ExclusiveProductBoys } from "./ExclusiveProductBoys";
import { ExclusiveBabyProduct } from "./ExclusiveBabyProduct";
import AllProductsBanner from "./AllProductsBanner";
import { AllBabyProductBanner } from "./AllBabyProductBanner";

interface Props {
  category: string;
}

export function CategoryRenderer({ category }: Props) {
  switch (category.toLowerCase()) {
    case "exclusivegirls":
      return <ExclusiveGirlsProduct />;

    case "exclusivebaby":
      return <ExclusiveBabyProduct />;

    case "exclusiveboys":
      return <ExclusiveProductBoys />;

      case "all":
      return <AllProductsBanner />;

       case "baby":
      return <AllBabyProductBanner />;

    default:
      return (
        <div className="flex items-center gap-4 p-6 max-w-7xl mx-auto bg-red-50 border border-red-200 shadow-md">
          <AlertCircle className="text-red-600 w-8 h-8" />
          <div>
            <h2 className="text-xl font-semibold text-red-800">
              Category Not Found
            </h2>
            <p className="text-red-700 mt-1">
              Sorry, there are no products available for this category at the
              moment.
            </p>
          </div>
        </div>
      );
  }
}
