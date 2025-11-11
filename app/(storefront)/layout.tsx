import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import { Info } from "../components/storefront/Info";
import ScrollToTopButton from "../components/storefront/ScrollToTopButton";
import { AllLinks } from "../components/links/links";
import { AlertTriangle } from "lucide-react";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
     <div className="border-b border-b-gray-950/10"> <Navbar /></div>
     <div className="mt-2"> <AllLinks /></div>

     <div className="flex max-w-7xl mx-auto items-start gap-3 p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-md">
      <div>
        <h1 className="font-bold text-lg">⚠️ Warning: Testing Mode Active</h1>
        <p className="mt-1 text-justify text-sm">
          Our application is currently in <strong>testing mode</strong>. Any orders or payments 
          will <strong>not be processed</strong> or responsible. You are welcome to explore, 
          but please do <strong>not pay anything</strong>.
        </p>
      </div>
    </div>
      <main className=" mx-auto">{children}</main>
      
      <div className="bg-gray-800"><Info /> </div>
      <div className="bg-gray-200"> <Footer /></div>
      <ScrollToTopButton />
    </>
  );
}
