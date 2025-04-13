import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import ModelAlbum from "../components/storefront/modelAlbum";
import NewArrival from "../components/storefront/NewArrival";


export default function IndexPage() {
  return (
    <div>
      <Hero />
      {/* <div className="bg-teal-300 p-4 flex justify-center items-center mb-4">
        <div className="relative flex space-x-4 overflow-x-auto overflow-y-hidden px-4">
          <img
            src="/blackfriday.jpg"
            alt="Image 1"
            className="w-[150px] h-[150px] object-cover transform rotate-2 border-4 border-b-8 border-white m-4"
          />
          <img
            src="/summer.jpg"
            alt="Image 2"
            className="w-[150px] h-[150px] object-cover transform -rotate-6 border-4 border-t-8 border-white m-4"
          />
          <img
            src="/summer.jpg"
            alt="Image 2"
            className="w-[150px] h-[150px] object-cover transform rotate-6 border-4 border-t-8 border-white m-4"
          />
          <img
            src="/3.jpg"
            alt="Image 3"
            className="w-[150px] h-[150px] object-cover transform rotate-4 border-4 border-r-8 border-white m-4"
          />
          <img
            src="/summer.jpg"
            alt="Image 2"
            className="w-[150px] h-[150px] object-cover transform rotate-6 border-4 border-t-8 border-white m-4"
          />
        </div>
      </div> */}
      <ModelAlbum />

      <FeaturedProducts />
      <NewArrival />
      <CategoriesSelection />
    </div>
  );
}
