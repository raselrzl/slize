import { NewBornFeaturedProducts } from "../components/newborn/NewBornFeaturedProducts";
import { ExclusiveProductBannerHome } from "../components/storefront/ExclusiveProductBannerHome";
import { FeaturedProducts } from "../components/girlsfeatured/FeaturedProducts";
import { HeroOne } from "../components/storefront/heroOne";
import BabyFeaturedHomePageBanner from "../components/storefront/BabyFeaturedHomePageBanner";
import { BoysFeaturedProducts } from "../components/boysfeatured/BoysFeaturedProducts";
import { ExclusiveProductBoysHomeBanner } from "../components/storefront/ExclusiveProductBoysBannerHome";

export default function IndexPage() {
  return (
    <div className="">
      <div className="bg-white">
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

      <div className="">
        <ExclusiveProductBoysHomeBanner />
      </div>

      <div>
        <BoysFeaturedProducts />
      </div>
      <div className="bg-teal-900 py-4 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <BabyFeaturedHomePageBanner />
        </div>
      </div>

      <div className="bg-teal-50 py-4 flex justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <NewBornFeaturedProducts />
        </div>
      </div>
    </div>
  );
}
