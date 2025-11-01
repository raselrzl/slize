import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { HeroOne } from "../components/storefront/heroOne";
import ModelAlbum from "../components/storefront/modelAlbum";
import NewArrival from "../components/storefront/NewArrival";


export default function IndexPage() {
  return (
    <div>
     <div className=""> <HeroOne /></div>
      <ModelAlbum />
      <FeaturedProducts />
      <NewArrival />
      <CategoriesSelection />
    </div>
  );
}
