import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import { Info } from "../components/storefront/Info";
import ScrollToTopButton from "../components/storefront/ScrollToTopButton";
import { AllLinks } from "../components/links/links";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
     <div className="border-b border-b-gray-950/10"> <Navbar /></div>
     <div className="mt-2"> <AllLinks /></div>

      <main className=" mx-auto">{children}</main>
      
      <div className="bg-gray-800"><Info /> </div>
      <div className="bg-gray-200"> <Footer /></div>
      <ScrollToTopButton />
    </>
  );
}
