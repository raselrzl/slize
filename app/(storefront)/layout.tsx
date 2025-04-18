import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import { Info } from "../components/storefront/Info";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto">{children}</main>
      <Info />
      <Footer />
    </>
  );
}
