"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  /*   {
    id: 1,
    name: "All",
    href: "/products/all",
  }, */
  {
    id: 2,
    name: "Boys",
    href: "/products/men",
  },
  {
    id: 3,
    name: "Girls",
    href: "/products/women",
  },
  {
    id: 4,
    name: "Newborn",
    href: "/products/kids",
  },
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="md:flex justify-center items-center">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-gray-300 text-black hover:bg-gray-200 border border-gray-300"
              : "hover:bg-muted hover:bg-opacity-75 text-gray-300 border-gray-300 hover:text-gray-400",
            "group px-2 rounded-xs w-20 border  mx-2 py-2 text-center text-sm font-semibold  shadow-xs"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
