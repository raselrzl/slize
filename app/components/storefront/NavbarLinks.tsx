"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [

  {
    id: 1,
    name: "All",
    href: "/products/all",
  },
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
              ? "bg-[#9b3e22] text-white "
              : "hover:bg-muted hover:bg-opacity-75",
            "group px-2 rounded-xs w-24 border border-gray-200 mx-1 py-1 text-center text-sm"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
