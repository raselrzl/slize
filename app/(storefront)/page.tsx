import { NewBornFeaturedProducts } from "../components/newborn/NewBornFeaturedProducts";
import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { ExclusiveProductBannerHome } from "../components/storefront/ExclusiveProductBannerHome";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { HeroOne } from "../components/storefront/heroOne";
import ModelAlbum from "../components/storefront/modelAlbum";
import BabyFeaturedHomePageBanner from "../components/storefront/BabyFeaturedHomePageBanner";
import { ExclusiveProductBoys } from "../components/category/ExclusiveProductBoys";
import { BoysFeaturedProducts } from "../components/boysfeatured/BoysFeaturedProducts";

export default function IndexPage() {
  return (
    <div className="">
      <div className="">
        {" "}
        <HeroOne />
      </div>
      <div className="bg-[#2A1F14]">
        {" "}
        <ExclusiveProductBannerHome />
      </div>

      <div className="bg-[#8e6b48] py-4">
        {" "}
        <FeaturedProducts />
      </div>

      <div className="max-w-7xl mx-auto"><ExclusiveProductBoys /></div>

      <div><BoysFeaturedProducts /></div>

      <ModelAlbum />
      <div className="bg-red-800 py-4 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <BabyFeaturedHomePageBanner />
        </div>
      </div>

      <div className="bg-red-100 py-4 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <NewBornFeaturedProducts />
        </div>
      </div>
    </div>
  );
}
