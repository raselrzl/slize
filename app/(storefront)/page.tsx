import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { ExclusiveProduct } from "../components/storefront/ExclusiveProduct";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { HeroOne } from "../components/storefront/heroOne";
import ModelAlbum from "../components/storefront/modelAlbum";
import NewArrival from "../components/storefront/NewArrival";


export default function IndexPage() {
  return (
    <div className="">
     <div className=""> <HeroOne /></div>
<div className="bg-[#2A1F14]"> <ExclusiveProduct /></div>

<div className="bg-[#8e6b48] py-4"> <FeaturedProducts /></div>
      
      <ModelAlbum />
     
      <NewArrival />
      <CategoriesSelection />
    </div>
  );
}
