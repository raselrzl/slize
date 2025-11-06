import { ReactNode } from "react";
import { HelpSidebar } from "./HelpSidebar";
import { Footer } from "../components/storefront/Footer";

interface HelpLayoutProps {
  children: ReactNode;
}

export default function HelpLayout({ children }: HelpLayoutProps) {
  return (
    <div className="bg-gray-200 min-h-screen max-w-5xl mx-auto">
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
