import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import { Info } from "../components/storefront/Info";
import ScrollToTopButton from "../components/storefront/ScrollToTopButton";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
     <div className="border-b border-gray-900/10"> <Navbar /></div>
      <main className=" mx-auto">{children}</main>
      <Info />
      
      <div className="bg-gray-100"> <Footer /></div>
      <ScrollToTopButton />
    </>
  );
}
