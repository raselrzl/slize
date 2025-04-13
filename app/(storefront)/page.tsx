import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Footer } from "../components/storefront/Footer";
import { Hero } from "../components/storefront/Hero";
import { Info } from "../components/storefront/Info";
import { Navbar } from "../components/storefront/Navbar";

export default function IndexPage() {
  return (
    <div>
      <Hero />

      
      <div className="bg-gray-100 p-4 flex justify-center items-center my-4">
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
      </div>

      <FeaturedProducts />
      <div className="flex flex-wrap gap-4 bg-red-800 text-white w-full max-w-screen-xl mx-auto px-4 py-8">
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
    <CategoriesSelection />
    <Info />
    </div>
  );
}
