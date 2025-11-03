"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
    {
    id: 1,
    name: "In-Kronstil",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Boys",
    href: "/products/boys",
  },
  {
    id: 3,
    name: "Girls",
    href: "/products/girls",
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
              ? "bg-black text-gray-300 hover:bg-gray-700 border border-black"
              : "hover:bg-muted hover:bg-opacity-75 text-gray-800 border-gray-800 hover:bg-gray-100",
            "group px-2 rounded-xs w-24 border  mx-1 py-1 text-center text-sm font-semibold  shadow-xs"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
