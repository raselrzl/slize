import { ReactNode } from "react";
import { HelpSidebar } from "./HelpSidebar";
import { Footer } from "../components/storefront/Footer";
import Link from "next/link";
import Image from "next/image";

interface HelpLayoutProps {
  children: ReactNode;
}

export default function HelpLayout({ children }: HelpLayoutProps) {
  return (
    <div className="bg-gray-200 min-h-screen max-w-5xl mx-auto">
              <div className="flex justify-center items-center bg-black">
          <Link href="/">
            <Image
              src="/logo/kw.png"
              alt="Kron Word Logo"
              width={200}
              height={160}
              className="h-[35px] w-[140px]"
            />
          </Link>
        </div>
      {/* Wrapper for sidebar + content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Sidebar / mobile menu */}
        <aside className="md:w-64 w-full z-20">
          <HelpSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
          {/* On mobile, add top margin equal to fixed mobile nav height */}
          {children}
         
        </main>
        
      </div>
       <Footer />
    </div>
  );
}
