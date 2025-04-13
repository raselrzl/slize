import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import { Info } from "../components/storefront/Info";
import { Hero } from "../components/storefront/Hero";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="block md:hidden">
  <Hero />
</div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Info />
      <Footer />
    </>
  );
}
