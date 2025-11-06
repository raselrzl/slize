"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HelpSidebarLinks, LinkItem } from "./HelpSidebarLinks";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HelpSidebarProps {
  className?: string;
}

export function HelpSidebar({ className }: HelpSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  return (
    <>
      {/* Mobile top fixed nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex justify-between items-center p-2 border-b border-gray-200 bg-gray-200 z-50">
        <span className="font-semibold text-lg">Help</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar / mobile menu */}
      <nav
        className={cn(
          "flex flex-col md:flex md:h-full gap-2 md:p-4 border-r border-gray-200 bg-gray-200",
          className,
          isOpen
            ? "absolute top-14 left-0 right-0 shadow-md md:shadow-none md:relative md:flex"
            : "hidden md:flex",
          "transition-all duration-200"
        )}
      >
        {HelpSidebarLinks.map((link: LinkItem) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "flex items-center h-[36px] px-4 py-2 text-sm font-medium hover:bg-gray-300 transition-colors duration-200",
                isActive
                  ? "bg-gray-400 text-black font-semibold"
                  : "text-gray-700"
              )}
              onClick={() => setIsOpen(false)} // close menu on mobile
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
